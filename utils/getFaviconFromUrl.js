const getFaviconFromUrl = (url) => {
  const { URL } = require("url");

  function extractDomain(urlString) {
    try {
      // Check if urlString starts with 'http' or 'https'. If not, prepend 'http://'.
      if (!urlString.startsWith("http")) {
        urlString = "http://" + urlString;
      }

      const url = new URL(urlString);
      const hostname = url.hostname;

      // Match www.whatever.TLD where TLD can be 2 to 10 characters long
      const match = hostname.match(/(?:www\.)?[\w-]+\.[a-z]{2,10}$/i);
      return match ? match[0] : null;
    } catch (e) {
      console.error("Invalid URL:", urlString);
      return null;
    }
  }

  const urlDomain = extractDomain(url);
  const iconUrl = `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${urlDomain}&size=64`;
  return iconUrl;
};

module.exports = getFaviconFromUrl;
