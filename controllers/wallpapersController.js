const User = require("../models/userModel");
const axios = require("axios");
const xml2js = require("xml2js");

const BUCKET_NAME = "mytab-wallpapers";

// Helper function to get a random element from an array
const getRandomElement = array => {
  if (array.length === 0) return null;
  return array[Math.floor(Math.random() * array.length)];
};

const getWallpapers = (req, res) => {
  const id = req.params.id; // Get the id from the route parameters

  let processPrefix = (prefix) => {
    const listObjectsUrl = `https://${BUCKET_NAME}.s3.amazonaws.com?list-type=2&prefix=${prefix}`;
    
    axios.get(listObjectsUrl)
      .then(response => {
        xml2js.parseStringPromise(response.data).then(result => {
          const objects = result.ListBucketResult.Contents || [];
          const randomFileKey = getRandomElement(objects).Key[0];
          if (!randomFileKey) {
            return res.status(404).json({ error: "No files found" });
          }
          const randomFileUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${randomFileKey}`;
          res.status(200).json({ url: randomFileUrl });
        });
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: error.message });
      });
  };

  if (id === 'all') {
    const listPrefixesUrl = `https://${BUCKET_NAME}.s3.amazonaws.com?list-type=2&delimiter=/`;
    
    axios.get(listPrefixesUrl)
      .then(response => {
        xml2js.parseStringPromise(response.data).then(result => {
          const prefixes = result.ListBucketResult.CommonPrefixes || [];
          const randomPrefix = getRandomElement(prefixes);
          if (!randomPrefix || !randomPrefix.Prefix) {
            return res.status(404).json({ error: "No prefixes found" });
          }
          processPrefix(randomPrefix.Prefix[0]);
        });
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: error.message });
      });
  } else {
    processPrefix(`${id}/`);
  }
};


const changeWallpaperCollection = async (req, res) => {
  const { collectionName } = req.body;
  if(!collectionName) {
    res.status(400).json({message: "collection key is required in body"})
  }
  try {
    const user = await User.findById(req.user._id);
    if(!user) {
      res.status(404).json({message: "User not found"})
    }
    if (collectionName) user.preferences.wallpaperCollection = collectionName;
    await user.save();
    res.status(200).json({ message: "Wallpapers updated" });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getWallpapers, changeWallpaperCollection };
