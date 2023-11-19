const { default: axios } = require("axios");

const fetchSpecialPlaylist = async (token, playlistName) => {
  const query = encodeURIComponent(playlistName);
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${query}&type=playlist&limit=1`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const specialPlaylist = response.data.playlists.items.find(
      (playlist) =>
        playlist.name === playlistName &&
        playlist.owner.display_name === "Spotify"
    );
    return specialPlaylist;
  } catch (error) {
    console.error(`Error searching for ${playlistName} playlist:`, error);
    return null;
  }
};

module.exports = { fetchSpecialPlaylist };
