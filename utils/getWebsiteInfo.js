const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const getTitle = (document) => {
  // 1. Try getting the title from Open Graph meta tags
  const ogTitle = document.querySelector("meta[property='og:title']");
  if (ogTitle && ogTitle.content) {
    return ogTitle.content;
  }

  // 2. Try getting the title from Twitter meta tags
  const twitterTitle = document.querySelector("meta[name='twitter:title']");
  if (twitterTitle && twitterTitle.content) {
    return twitterTitle.content;
  }

  // 3. Try getting the site name from Open Graph meta tags
  const ogSiteName = document.querySelector("meta[property='og:site_name']");
  if (ogSiteName && ogSiteName.content) {
    return ogSiteName.content;
  }

  // 4. Get the title from the HTML <title> tag
  const titleTag = document.title;
  if (titleTag) {
    return titleTag;
  }

  // 4. As a last resort, return a default title
  return null;
};

const getDescription = (document) => {
  const metaDescription = document.querySelector("meta[name='description']");
  if (metaDescription && metaDescription.content) {
    return metaDescription.content;
  }

  // 2. Try getting the description from Open Graph meta tags
  const ogDescription = document.querySelector(
    "meta[property='og:description']"
  );
  if (ogDescription && ogDescription.content) {
    return ogDescription.content;
  }

  // 3. Try getting the description from Twitter meta tags
  const twitterDescription = document.querySelector(
    "meta[name='twitter:description']"
  );
  if (twitterDescription && twitterDescription.content) {
    return twitterDescription.content;
  }

  return null;
};

const getWebsiteInfo = async (url) => {
  if (!url.startsWith("https://")) {
    url = "https://" + url;
  }

  return axios
    .get(url)
    .then(function (response) {
      const dom = new JSDOM(response.data);

      const title = getTitle(dom.window.document);
      const description = getDescription(dom.window.document);

      return {
        title: title,
        description: description,
      };
    })
    .catch(function (error) {
      return {
        title: "Error",
        description: "Could not fetch website info",
        error: error,
      };
    });
};

module.exports = getWebsiteInfo;
