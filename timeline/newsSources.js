const newsSources = {
  world: [
    {
      rssUrl:
        "https://www.nytimes.com/svc/collections/v1/publish/https://www.nytimes.com/section/world/rss.xml",
      name: "New York Times",
      url: "https://nytimes.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://nytimes.com&size=64",
    },
    {
      rssUrl: "https://www.aljazeera.com/xml/rss/all.xml",
      name: "Al Jazeera",
      url: "https://aljazeera.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://aljazeera.com&size=64",
    },
    {
      rssUrl:
        "https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=100727362",
      name: "CNBC",
      url: "https://cnbc.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://cnbc.com&size=64",
    },
  ],
  finance: [
    {
      rssUrl: "https://www.forbes.com/money/feed/",
      name: "Forbes - Money",
      url: "https://www.forbes.com/",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.forbes.com/&size=64",
    },
    {
      rssUrl: "https://www.forbes.com/business/feed/",
      name: "Forbes - Business",
      url: "https://www.forbes.com/",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.forbes.com/&size=64",
    },
    {
      rssUrl: "https://www.forbes.com/worlds-billionaires/feed/",
      name: "Forbes - Billionaires",
      url: "https://www.forbes.com/",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.forbes.com/&size=64",
    },
    {
      rssUrl: "https://www.forbes.com/innovation/feed2",
      name: "Forbes - Innovation",
      url: "https://www.forbes.com/",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.forbes.com/&size=64",
    },
    {
      rssUrl: "https://www.forbes.com/real-estate/feed/",
      name: "Forbes - Real Estate",
      url: "https://www.forbes.com/",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.forbes.com/&size=64",
    },
    {
      rssUrl: "http://feeds.marketwatch.com/marketwatch/topstories/",
      name: "Marketwatch",
      url: "https://www.marketwatch.com/",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.marketwatch.com/&size=64",
    },
    {
      rssUrl: "https://finance.yahoo.com/news/rssindex",
      name: "Yahoo Finance",
      url: "https://www..yahoo.com/",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.yahoo.com/&size=64",
    },
  ],
  sports: [
    {
      rssUrl: "https://www.motorsport-total.com/rss/rss.xml",
      name: "Motorsport Total",
      url: "https://www.motorsport-total.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://motorsport-total.com&size=64",
    },
    {
      rssUrl: "https://www.eyefootball.com/rss_news_main.xml",
      name: "Eye Football",
      url: "https://www.eyefootball.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://eyefootball.com&size=64",
    },
    {
      rssUrl: "https://www.motorsport-magazin.com/rss/formel1.xml",
      name: "Motorsport Magazin",
      url: "https://www.motorsport-magazin.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://motorsport-magazin.com&size=64",
    },
    {
      rssUrl: "https://www.slamonline.com/feed/",
      name: "Slam Online",
      url: "https://www.slamonline.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://slamonline.com&size=64",
    },
  ],
  ai: [
    {
      rssUrl: "https://openai.com/blog/rss.xml",
      name: "OpenAI",
      url: "https://openai.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://openai.com&size=64",
    },
    {
      rssUrl: "https://wgmimedia.com/feed/",
      name: "Wgmimedia",
      url: "https://wgmimedia.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://wgmimedia.com&size=64",
    },
    {
      rssUrl: "https://deepmind.google/blog/rss.xml",
      name: "Deepmind.Google",
      url: "https://deepmind.google/",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://deepmind.google/&size=64",
    },
    {
      rssUrl: "https://becominghuman.ai/feed",
      name: "Becoming Human",
      url: "https://becominghuman.ai",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://becominghuman.ai/&size=64",
    },
    {
      rssUrl: "https://blogs.nvidia.com/feed/",
      name: "Nvidia",
      url: "https://blogs.nvidia.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://blogs.nvidia.com/&size=64",
    },
    {
      rssUrl: "https://www.wired.com/feed/tag/ai/latest/rss",
      name: "Wired",
      url: "https://www.wired.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://wired.com/&size=64",
    },
    {
      rssUrl: "https://www.marktechpost.com/feed/",
      name: "Marktechpost",
      url: "https://www.marktechpost.com/",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.marktechpost.com/&size=64",
    },
    {
      rssUrl: "https://www.aiacceleratorinstitute.com/rss/",
      name: "AI Accelerator Institute",
      url: "https://www.aiacceleratorinstitute.com/",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.aiacceleratorinstitute.com/&size=64",
    },
    {
      rssUrl: "https://ai-techpark.com/category/ai/feed/",
      name: "AI Tech Park",
      url: "https://www.ai-techpark.com/",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.ai-techpark.com/&size=64",
    },
    {
      rssUrl: "https://knowtechie.com/category/ai/feed/",
      name: "Knowtechie",
      url: "https://www.knowtechie.com/",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.knowtechie.com/&size=64",
    },
  ],
  crypto: [
    {
      rssUrl: "https://blockchain.news/rss",
      name: "Blockchain.News",
      url: "https://blockchain.news/",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.blockchain.news/&size=64",
    },
    {
      rssUrl: "https://cointelegraph.com/rss",
      name: "Cointelegraph",
      url: "https://cointelegraph.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://cointelegraph.com&size=64",
    },
    {
      rssUrl: "https://bitcoinmagazine.com/.rss/full/",
      name: "Bitcoin Magazine",
      url: "https://bitcoinmagazine.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://bitcoinmagazine.com&size=64",
    },
    {
      rssUrl: "https://www.coindesk.com/arc/outboundfeeds/rss/",
      name: "Coindesk",
      url: "https://coindesk.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://coindesk.com&size=64",
    },
  ],
  gaming: [
    {
      rssUrl: "https://feeds.feedburner.com/ign/all",
      name: "IGN",
      url: "https://www.ign.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.ign.com&size=64",
    },
    {
      rssUrl: "https://kotaku.com/rss",
      name: "Kotaku",
      url: "https://kotaku.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://kotaku.com&size=64",
    },
    {
      rssUrl: "https://www.vg247.com/feed/news",
      name: "VG247",
      url: "https://www.vg247.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://vg247.com&size=64",
    },
    {
      rssUrl: "https://www.gamespot.com/feeds/news",
      name: "Gamespot",
      url: "https://www.gamespot.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://gamespot.com&size=64",
    },
  ],
};

module.exports = {
  newsSources,
};
