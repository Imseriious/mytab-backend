const axios = require("axios");

const getFaviconFromUrl = async (url) => {
  const { URL } = require("url");

  function extractDomain(urlString) {
    try {
      // Check if urlString starts with 'http' or 'https'. If not, prepend 'https://'.
      if (!urlString.startsWith("http")) {
        urlString = "https://" + urlString;
      }

      const url = new URL(urlString);
      let hostname = url.hostname;

      // Remove 'www.' if it exists
      hostname = hostname.replace(/^www\./, "");

      return hostname;
    } catch (e) {
      console.error("Invalid URL:", urlString);
      return null;
    }
  }

  const urlDomain = extractDomain(url);
  if (!urlDomain) {
    return null;
  }

  const iconUrl = `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${urlDomain}&size=64`;

  try {
    const response = await axios.get(iconUrl, { responseType: "blob" });
    if (response.status === 200) {
      return iconUrl;
    }
  } catch (error) {
    console.error("Failed to fetch favicon:", error.message);
    return null;
  }
};

module.exports = getFaviconFromUrl;
