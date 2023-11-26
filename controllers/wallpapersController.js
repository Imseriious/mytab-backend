const User = require("../models/userModel");
const WallpapersPack = require("../models/wallpapersModel");

// Helper function to get a random element from an array
const getRandomElement = (array) => {
  if (array.length === 0) return null;
  return array[Math.floor(Math.random() * array.length)];
};

const getAllWallpapersPacks = async (req, res) => {
  try {
    const availableWallpaperPacks = await WallpapersPack.find();

    if (!availableWallpaperPacks || availableWallpaperPacks.length < 1) {
      res.status(200).json({ availableWallpaperPacks: [] });
      return;
    }

    const user = await User.findById(req.user._id);
    const userWallpapers = user.installedWallpapers || [];

    const returnData = availableWallpaperPacks.map((pack) => ({
      wallpapersCount: pack.mediaLinks.length,
      thumbnail: pack.mediaLinks[0],
      name: pack.name,
      creator: pack.creator,
      live: pack.live,
      cost: pack.cost,
      ownedByUser: userWallpapers.includes(pack._id),
      description: pack.description,
      id: pack._id,
    }));

    res.status(200).json({ availableWallpaperPacks: returnData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addToLibrary = async (req, res) => {
  try {
    const { wallpaperId } = req.body;
    if (!wallpaperId) {
      res.status(404).json({ message: "wallpaper id is required" });
    }

    const wallpaperPack = await WallpapersPack.findById(wallpaperId);

    if (!wallpaperPack) {
      res.status(404).json({ message: "wallpaper pack not found" });
    }

    const user = await User.findById(req.user._id);

    const currentInstalledWallpapersList = user.installedWallpapers;
    let newInstalledWallpapersList;
    if (currentInstalledWallpapersList) {
      newInstalledWallpapersList = currentInstalledWallpapersList;
      newInstalledWallpapersList.push(wallpaperId);
    } else {
      newInstalledWallpapersList = [wallpaperId];
    }

    user.installedWallpapers = newInstalledWallpapersList;

    user.save();


    res.status(200).json({ message: "Wallpaper list installed" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Could not install wallpaper" });
  }
};

const deleteFromLibrary = async (req, res) => {
  try {
    const { wallpaperId } = req.body;
    if (!wallpaperId) {
      res.status(404).json({ message: "wallpaper id is required" });
    }

    const wallpaperPack = await WallpapersPack.findById(wallpaperId);

    if (!wallpaperPack) {
      res.status(404).json({ message: "wallpaper pack not found" });
    }

    const user = await User.findById(req.user._id);

    const currentInstalledWallpapersList = user.installedWallpapers;
    let newInstalledWallpapersList = currentInstalledWallpapersList.filter(
      (id) => id !== wallpaperId
    );

    user.installedWallpapers = newInstalledWallpapersList;

    user.save();


    res.status(200).json({ message: "Wallpaper deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Could not delete wallpaper" });
  }
};

const getWallpaper = async (req, res) => {
  try {
    const allWallpapers = await WallpapersPack.find();
    let selectedWallpaper;
    if (req.params.id && req.params.id !== "default") {
      selectedWallpaper = await WallpapersPack.findById(req.params.id);
      if (!selectedWallpaper) {
        selectedWallpaper = getRandomElement(allWallpapers);
      }
    } else {
      selectedWallpaper = getRandomElement(allWallpapers);
    }
    if (!selectedWallpaper) {
      res.status(404).json({ error: "wallpaperpack not found" });
      return;
    }

    const randomFileUrl = getRandomElement(selectedWallpaper.mediaLinks);

    res
      .status(200)
      .json({ url: randomFileUrl, isLive: selectedWallpaper.live });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserWallpapersPacks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const userPacksIds = user.installedWallpapers;
    const availableWallpaperPacks = await WallpapersPack.find({
      _id: { $in: userPacksIds },
    });

    if (!availableWallpaperPacks || availableWallpaperPacks.length < 1) {
      res.status(200).json({ wallpaperPacks: [] });
      return;
    }

    const returnData = availableWallpaperPacks.map((pack) => ({
      wallpapersCount: pack.mediaLinks.length,
      thumbnail: pack.mediaLinks[0],
      name: pack.name,
      creator: pack.creator,
      live: pack.live,
      cost: pack.cost,
      description: pack.description,
      id: pack._id,
    }));

    res.status(200).json({ wallpaperPacks: returnData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const changeWallpaperCollection = async (req, res) => {
  const { packId } = req.body;
  if (!packId) {
    res.status(400).json({ message: "pack id is required in body" });
  }
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    if (packId) user.preferences.wallpaperCollection = packId;
    await user.save();
    res.status(200).json({ preferences: user.preferences });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createWallpaperPack = async (req, res) => {
  const user = await User.findById(req.user._id);

  const allowedUsers = ["sam@millerio.com", "test@test.com"];

  // try {
  //   const { localPackName, isLive } = req.body;

  //   if (!allowedUsers.includes(user.email)) {
  //     res.status(500).json("Not allowed...");
  //     return;
  //   }

  //   const { uploadWallpaperPack } = require("../utils/wallpaperHelpers");
  //   const dataObject = await uploadWallpaperPack(localPackName, isLive);

  //   const { packName, storageId, mediaLinks, description } = dataObject;

  //   const newWallpaperPack = new WallpapersPack({
  //     userId: "65579fce51c3546703ad1bc9", //Production
  //     creator: "SleekTab Team",
  //     name: packName,
  //     storageId: storageId,
  //     mediaLinks: mediaLinks,
  //     description: description,
  //     marketApproved: true,
  //     live: isLive ? true : false,
  //   });

  //   await newWallpaperPack.save();

  //   res.status(200).json({ newWallpaperPack });
  // } catch (error) {
  //   res.status(500).json({ message: "Couldn't create pack", error });
  //   console.error(error);
  // }
};

module.exports = {
  getWallpaper,
  changeWallpaperCollection,
  createWallpaperPack,
  getUserWallpapersPacks,
  addToLibrary,
  deleteFromLibrary,
  getAllWallpapersPacks,
};
