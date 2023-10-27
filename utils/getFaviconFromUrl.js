const getFaviconFromUrl = (url) => {
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
  const iconUrl = `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${urlDomain}&size=64`;
  return iconUrl;
};

module.exports = getFaviconFromUrl;
