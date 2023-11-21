var crypto = require("crypto"); // For generating secure random strings
var querystring = require("querystring"); // For stringifying query parameters
const { default: axios } = require("axios");
const { fetchSpecialPlaylist } = require("../../utils/spotifyUtils");

require("dotenv").config(); // Loads environment variables from a .env file into process.env

// Correct naming and ensure all necessary modules and variables are defined
var client_id = "1fc9ae1fad4342abaee6c3fd6db759c9"; // Ensure this is your registered Spotify client ID
var client_secret = process.env.SPOTIFY_CLIENT_SECRET; // Load client secret securely from environment variables
var redirect_uri =
  process.env.NODE_ENV === "production"
    ? "https://www.api.sleektab.app/spotify/callback"
    : "http://localhost:4000/spotify/callback"; // Ensure this matches the redirect URI registered on Spotify

const scope = [
  "streaming",
  "playlist-read-private",
  "user-read-email",
  "user-read-private",
  "user-library-modify",
  "user-library-read",
  "user-modify-playback-state",
].join(" "); // Convert scope array to a space-separated string

const generateRandomString = (length) => {
  return crypto.randomBytes(60).toString("hex").slice(0, length);
};

var stateKey = "spotify_auth_state";

const loginSpotify = async (req, res) => {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // Redirecting to Spotify's authorization URL
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
};

const spotifyCallback = async (req, res) => {
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  // State validation
  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    // Clear state cookie
    res.clearCookie(stateKey);

    const params = new URLSearchParams();
    params.append("code", code);
    params.append("redirect_uri", redirect_uri);
    params.append("grant_type", "authorization_code");

    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        params.toString(),
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(
              `${client_id}:${client_secret}`
            ).toString("base64")}`,
          },
        }
      );

      var access_token = response.data.access_token,
        refresh_token = response.data.refresh_token,
        expires_in = response.data.expires_in;

      const redirectUri =
        process.env.NODE_ENV === "production"
          ? "https://www.sleektab.app"
          : "http://localhost:3000";
      res.redirect(
        `${redirectUri}/spotify_auth_user/#` +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token,
            expires_in: expires_in
          })
      );
    } catch (error) {
      console.log("error", error);

      // Handle request error
      res.redirect(
        "/#" +
          querystring.stringify({
            error: "invalid_token",
          })
      );
    }
  }
};

const spotifyRefreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  const params = new URLSearchParams();
  params.append("refresh_token", refreshToken);
  params.append("grant_type", "refresh_token");

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      params.toString(),
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${client_id}:${client_secret}`
          ).toString("base64")}`,
        },
      }
    );

    const { access_token, expires_in } = response.data;

    res.json({ access_token, expires_in });
  } catch (error) {
    console.log("error on trying to refresh spotify token, error", error);
    res.status(400).json({ error: error.response.data });
  }
};

const toggleShuffle = async (req, res) => {
  const { shuffleState, token } = req.body;
  try {
    await axios.put(
      `https://api.spotify.com/v1/me/player/shuffle?state=${shuffleState}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error toggling shuffle:", error.response.data);
  }
};

const loadPlaylist = async (req, res) => {
  const { token, playlistUri, deviceId } = req.body;
  try {
    await axios.put(
      `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
      { context_uri: playlistUri },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.send("Playlist playback started");
  } catch (error) {
    console.error("Error in starting playlist playback:", error.response.data);
    res.status(error.response.status).json({ error: error.response.data });
  }
};

// Backend - spotifyController.js
const fetchUserPlaylists = async (req, res) => {
  const { token } = req.body;

  try {
    const userPlaylistsResponse = await axios.get(
      "https://api.spotify.com/v1/me/playlists",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    let playlists = userPlaylistsResponse.data.items;

    const releaseRadarPlaylist = await fetchSpecialPlaylist(
      token,
      "Release Radar"
    );
    if (releaseRadarPlaylist) {
      playlists = [releaseRadarPlaylist, ...playlists];
    }

    // Fetch Discover Weekly Playlist
    const discoverWeeklyPlaylist = await fetchSpecialPlaylist(
      token,
      "Discover Weekly"
    );
    if (discoverWeeklyPlaylist) {
      playlists = [discoverWeeklyPlaylist, ...playlists];
    }

    res.json(playlists);
  } catch (error) {
    console.error("Error fetching user playlists:", error.response.data);
    res.status(error.response.status).json({ error: error.response.data });
  }
};

const controlPlayback = async (req, res) => {
  const { action, token } = req.body;
  let method = "POST";

  if (action === "pause" || action === "play") {
    method = "PUT";
  }

  try {
    await axios({
      url: `https://api.spotify.com/v1/me/player/${action}`,
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    res.send(`Playback ${action} successful`);
  } catch (error) {
    console.error(
      `Error controlling playback: ${action}, error: `,
      error.response.data
    );
    res.status(error.response.status).json({ error: error.response.data });
  }
};

const checkIfSongLiked = async (req, res) => {
  const { token, trackId } = req.body;

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/me/tracks/contains?ids=${trackId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    res.json({ isLiked: response.data[0] });
  } catch (error) {
    console.error("Error checking if song is liked:", error.response.data);
    res.status(error.response.status).json({ error: error.response.data });
  }
};

const likeOrDislikeSong = async (req, res) => {
  const { trackId, token, like } = req.body;
  const method = like ? "PUT" : "DELETE";

  try {
    await axios({
      url: `https://api.spotify.com/v1/me/tracks?ids=${trackId}`,
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    res.send(`Song ${like ? "liked" : "disliked"} successfully`);
  } catch (error) {
    console.error(
      `Error ${like ? "liking" : "disliking"} song:`,
      error.response.data
    );
    res.status(error.response.status).json({ error: error.response.data });
  }
};

module.exports = {
  spotifyCallback,
  loginSpotify,
  spotifyRefreshToken,
  loadPlaylist,
  fetchUserPlaylists,
  controlPlayback,
  checkIfSongLiked,
  likeOrDislikeSong,
  toggleShuffle,
};
