const User = require("../models/userModel");
const WallpapersPack = require("../models/wallpapersModel");

// Helper function to get a random element from an array
const getRandomElement = (array) => {
  if (array.length === 0) return null;
  return array[Math.floor(Math.random() * array.length)];
};

const getWallpapers = async (req, res) => {
  try {
    let selectedWallpaper;
    if (req.params.id) {
      selectedWallpaper = await WallpapersPack.findById(req.params.id);
    } else {
      const allWallpapers = await WallpapersPack.find(); //TODO only the ones the user has
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
  //Should only getUserWallpapersPacks from the user.
  try {
    // const user = await User.findById(req.user._id);
    // const userPacksIds = user.wallpapersPacks;
    const availableWallpaperPacks = await WallpapersPack.find();

    if (!availableWallpaperPacks) {
      res.status(404).json({ error: "WallpaperPacks not found" });
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
  //     console.log("no email");
  //     return;
  //   }

  //   // const { uploadWallpaperPack } = require("../utils/wallpaperHelpers");
  //   // const dataObject = await uploadWallpaperPack(localPackName, isLive); removed in production

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

  //   console.log("yee", newWallpaperPack);

  //   await newWallpaperPack.save();

  //   res.status(200).json({ newWallpaperPack });
  // } catch (error) {
  //   res.status(500).json({ message: "Couldn't create pack", error });
  //   console.error(error);
  // }
};

module.exports = {
  getWallpapers,
  changeWallpaperCollection,
  createWallpaperPack,
  getUserWallpapersPacks,
};
