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
    {
      rssUrl: "https://feeds.bbci.co.uk/news/world/rss.xml#",
      name: "BBC World",
      url: "https://bbc.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://bbc.com&size=64",
    },
    {
      rssUrl: "https://www.globalissues.org/whatsnew/whatsnew.xml",
      name: "Global Issues",
      url: "https://globalissues.org",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://globalissues.org&size=64",
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
      url: "https://www.yahoo.com/",
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
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.eyefootball.com&size=64",
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
    {
      rssUrl: "https://www.motorsport.com/rss/all/news/",
      name: "Motorsport",
      url: "https://www.motorsport.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://motorsport.com&size=64",
    },
    {
      rssUrl: "https://www.sportingnews.com/us/rss",
      name: "Sporting News",
      url: "https://www.sportingnews.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://sportingnews.com&size=64",
    },
    {
      rssUrl: "https://www.skysports.com/rss/12040",
      name: "Skysports",
      url: "https://www.skysports.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://skysports.com&size=64",
    },
    {
      rssUrl: "https://www.motorcycledaily.com/feed/",
      name: "Motorcycledaily",
      url: "https://www.motorcycledaily.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://motorcycledaily.com&size=64",
    },
    {
      rssUrl: "https://www.mmafighting.com/rss/current",
      name: "MMA Fighting",
      url: "https://www.mmafighting.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://mmafighting.com&size=64",
    },
    {
      rssUrl: "https://www.lowkickmma.com/feed/",
      name: "Lowkick MMA",
      url: "https://www.lowkickmma.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://lowkickmma.com&size=64",
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
      name: "Wired AI",
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
    {
      rssUrl: "https://bitcoinist.com/feed/",
      name: "Bitcoinist",
      url: "https://bitcoinist.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://bitcoinist.com&size=64",
    },
    {
      rssUrl: "https://www.newsbtc.com/feed/",
      name: "Newsbtc",
      url: "https://newsbtc.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://newsbtc.com&size=64",
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
    {
      rssUrl: "https://toucharcade.com/feed/",
      name: "Toucharcade",
      url: "https://www.toucharcade.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://toucharcade.com&size=64",
    },
    {
      rssUrl: "https://www.gameinformer.com/rss.xml",
      name: "Game Informer",
      url: "https://www.gameinformer.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://gameinformer.com&size=64",
    },
    {
      rssUrl: "https://www.polygon.com/rss/index.xml",
      name: "Polygon",
      url: "https://www.polygon.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://polygon.com&size=64",
    },
    {
      rssUrl: "https://blogs.nvidia.com/blog/category/gaming/feed/",
      name: "Nvidia Gaming",
      url: "https://www.nvidia.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://nvidia.com&size=64",
    },
  ],
  tech: [
    {
      rssUrl: "https://techcrunch.com/feed/",
      name: "TechCrunch",
      url: "https://techcrunch.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://techcrunch.com&size=64",
    },
    {
      rssUrl: "https://www.theverge.com/rss/frontpage",
      name: "The Verge",
      url: "https://theverge.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://theverge.com&size=64",
    },
    {
      rssUrl: "https://mashable.com/feeds/rss/all",
      name: "Mashable",
      url: "https://mashable.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://mashable.com&size=64",
    },
    {
      rssUrl: "https://www.wired.com/feed/rss",
      name: "Wired",
      url: "https://www.wired.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.wired.com&size=64",
    },
    {
      rssUrl: "https://gizmodo.com/rss",
      name: "Gizmodo",
      url: "https://www.gizmodo.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.gizmodo.com&size=64",
    },
    {
      rssUrl: "https://www.engadget.com/rss.xml",
      name: "Engadget",
      url: "https://www.engadget.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.engadget.com&size=64",
    },
    {
      rssUrl: "https://techtoday.co/feed/",
      name: "Techtoday",
      url: "https://techtoday.co",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://techtoday.co&size=64",
    },
  ],
  entertainment: [
    {
      rssUrl: "https://www.tmz.com/rss.xml",
      name: "TMZ",
      url: "https://tmz.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://tmz.com&size=64",
    },
    {
      rssUrl: "https://www.etonline.com/news/rss",
      name: "Etonline",
      url: "https://etonline.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://etonline.com&size=64",
    },
    {
      rssUrl: "https://www.thehollywoodgossip.com/feed/",
      name: "The Hollywood Gossip",
      url: "https://thehollywoodgossip.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://thehollywoodgossip.com&size=64",
    },
    {
      rssUrl: "https://www.dailymail.co.uk/tvshowbiz/index.rss",
      name: "Dailymail Showbiz",
      url: "https://dailymail.co.uk",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://dailymail.co.uk&size=64",
    },
    {
      rssUrl: "https://feeds.skynews.com/feeds/rss/entertainment.xml",
      name: "Skynews Entertainment",
      url: "https://skynews.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://skynews.com&size=64",
    },
    {
      rssUrl: "https://www.yahoo.com/entertainment/rss",
      name: "Yahoo Entertainment",
      url: "https://yahoo.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://yahoo.com&size=64",
    },
  ],
  travel: [
    {
      rssUrl: "https://www.dailymail.co.uk/travel/index.rss",
      name: "Dailymail Travel ",
      url: "https://dailymail.co.uk",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://dailymail.co.uk&size=64",
    },
    {
      rssUrl: "https://rss.nytimes.com/services/xml/rss/nyt/Travel.xml",
      name: "New York Times Travel",
      url: "https://nytimes.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://nytimes.com&size=64",
    },
    {
      rssUrl: "https://feeds.feedburner.com/breakingtravelnews",
      name: "Breaking Travel News",
      url: "https://breakingtravelnews.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://breakingtravelnews.com&size=64",
    },
    {
      rssUrl:
        "https://admin.travelpulse.com/Content/rss/default.ashx?ptgpk=58561577&requrl=%2frss%2fnews.rss&preview=1",
      name: "Travel Pulse",
      url: "https://travelpulse.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://travelpulse.com&size=64",
    },
    {
      rssUrl: "https://www.traveldailymedia.com/feed/",
      name: "TravelDailyMedia",
      url: "https://traveldailymedia.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://traveldailymedia.com&size=64",
    },
  ],
  health: [
    {
      rssUrl: "https://rssfeeds.webmd.com/rss/rss.aspx?RSSSource=RSS_PUBLIC",
      name: "Webmd",
      url: "https://webmd.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://webmd.com&size=64",
    },
    {
      rssUrl: "https://news.harvard.edu/gazette/section/health-medicine/feed/",
      name: "Harvard Health and Medicine",
      url: "https://news.harvard.edu",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://news.harvard.edu&size=64",
    },
    {
      rssUrl: "https://wellnessmama.com/feed/",
      name: "Wellness Mama",
      url: "https://wellnessmama.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://wellnessmama.com&size=64",
    },
    {
      rssUrl: "https://mayhealthylifestyle.com/feed/",
      name: "May Healthy Lifestyle",
      url: "https://mayhealthylifestyle.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://mayhealthylifestyle.com&size=64",
    },
    {
      rssUrl: "https://www.healthywomen.org/feeds/feed.rss?x=1",
      name: "Healthy Women",
      url: "https://healthywomen.org",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://healthywomen.org&size=64",
    },
    {
      rssUrl: "https://thehealthcareblog.com/feed/",
      name: "The Healthcare Blog",
      url: "https://thehealthcareblog.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://thehealthcareblog.com&size=64",
    },
  ],
  cooking: [
    {
      rssUrl: "https://therecipecritic.com/feed/",
      name: "The Recipe Critic",
      url: "https://therecipecritic.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://therecipecritic.com&size=64",
    },
    {
      rssUrl: "https://minimalistbaker.com/feed/",
      name: "Minimalist Baker",
      url: "https://minimalistbaker.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://minimalistbaker.com&size=64",
    },
    {
      rssUrl: "https://feeds.feedburner.com/CookieAndKate",
      name: "Cookie And Kate",
      url: "https://cookieandkate.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://cookieandkate.com&size=64",
    },
    {
      rssUrl: "https://food52.com/blog.rss",
      name: "Food52",
      url: "https://food52.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://food52.com&size=64",
    },
    {
      rssUrl: "https://feeds.feedburner.com/smittenkitchen",
      name: "Smitten Kitchen",
      url: "https://smittenkitchen.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://smittenkitchen.com&size=64",
    },
    {
      rssUrl: "https://www.loveandlemons.com/feed",
      name: "Love And Lemons",
      url: "https://loveandlemons.com",
      favicon:
        "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://loveandlemons.com&size=64",
    },
  ],
};

module.exports = {
  newsSources,
};
