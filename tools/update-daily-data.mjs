import fs from "node:fs/promises";
import path from "node:path";

const rootDir = path.resolve(new URL("..", import.meta.url).pathname);
const outputPath = path.join(rootDir, "data", "generated-data.js");
const backupPath = path.join(rootDir, "data", "generated-data.backup.js");
const tempOutputPath = path.join(rootDir, "data", "generated-data.tmp.js");

await loadEnvFile(path.join(rootDir, ".env"));

const env = {
  newsApiKey: process.env.NEWSAPI_KEY || "",
  youtubeApiKey: process.env.YOUTUBE_API_KEY || "",
  includeSourceQueryItems: process.env.INCLUDE_SOURCE_QUERY_ITEMS === "1"
};

async function loadEnvFile(filePath) {
  try {
    const text = await fs.readFile(filePath, "utf8");
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
      if (!match) continue;
      const key = match[1];
      const value = match[2].replace(/^["']|["']$/g, "");
      if (!process.env[key]) process.env[key] = value;
    }
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

const channels = {
  major_news: "全球重大事件",
  hot_rankings: "热度榜",
  digital_tech: "数码科技",
  film_awards: "影视圈",
  gaming: "游戏圈",
  podcast_speech: "人物访谈/演讲",
  china_entertainment: "娱乐圈",
  meme: "网络热梗",
  sports: "体育突破",
  obituary: "名人讣闻"
};

const preferenceSignalRules = [
  { tag: "重大伤亡/灾难", score: 28, pattern: /死亡|遇难|身亡|枪杀|杀害|虐亡|爆炸|火灾|坠毁|坍塌|地震|洪水|暴雨|灾难|事故|失联|致死|dead|killed|dies|death|crash|explosion|earthquake|flood/i },
  { tag: "国际冲突/政治", score: 24, pattern: /战争|冲突|打击|制裁|军方|袭击|导弹|空袭|停火|总统|总理|政府|大选|特朗普|普京|马杜罗|Israel|Iran|Russia|Ukraine|Trump|president|election|sanction|strike/i },
  { tag: "政策/制度节点", score: 22, pattern: /正式实施|正式施行|新规|制度|条例|法律|修订|封存|禁令|获批|监管|调查|通报|判决|起诉|policy|law|ban|court|regulator/i },
  { tag: "网络爆点/争议", score: 22, pattern: /爆火|走红|刷屏|热搜|出圈|争议|回应|道歉|塌房|辟谣|暴涨|抢购|天价|翻车|viral|controversy|backlash|responds|apology/i },
  { tag: "科技突破/产品节点", score: 20, pattern: /AI|人工智能|芯片|机器人|航天|火箭|卫星|量子|脑机|发布|首飞|问世|突破|华为|小米|苹果|英伟达|OpenAI|robot|chip|launch|space|breakthrough/i },
  { tag: "冠军/纪录/奖项", score: 22, pattern: /冠军|夺冠|卫冕|决赛|总决赛|纪录|金牌|银牌|铜牌|MVP|获奖|影帝|影后|最佳|奖|champion|final|record|winner|award|Oscar|Emmy|BAFTA|Cannes/i },
  { tag: "影视/游戏发布", score: 16, pattern: /电影|剧集|短剧|动画|预告|定档|上映|票房|游戏|新作|发售|停服|封禁|trailer|teaser|movie|series|game|release/i },
  { tag: "名人讣闻", score: 28, pattern: /逝世|去世|离世|病逝|讣告|讣闻|obituary|dies|dead|death/i }
];

const weakHeadlinePatterns = [
  /^(首页|新闻|娱乐|体育|科技|游戏|视频|图片|全部|更多|投稿|搜索)$/i,
  /频道|入口|来源池|排行榜|热搜榜|全部投稿|客户端|用户协议|隐私政策|举报专区|小程序|素材网盘/i,
  /网上有害信息举报|网络文化经营许可证|许可证[:：]|ICP备|公网安备/i,
  /0氪打金|传奇.*打金|页游|开服|礼包|福利码/i,
  /在 Apple 播客上收听|Apple Podcasts/i,
  /^FIFA Men$/i,
  /Book of Rules|Official Documents|Read the latest|TechCrunch$/i,
  /^Tech Policy & Government/i,
  /^\d{2}:\d{2}\s/,
  /消费观察|合作空间广阔|前景令人振奋/i,
  /^(Latest|News|Videos|Search|Subscribe|Newsletter|Home)$/i
];

const notablePodcastPeoplePattern = /(?:Elon Musk|Sam Altman|Bill Gates|Mark Zuckerberg|Jeff Bezos|Tim Cook|Jensen Huang|Satya Nadella|Sundar Pichai|Dario Amodei|Demis Hassabis|Lex Fridman|Joe Rogan|Andrew Huberman|Yuval Noah Harari|Christopher Nolan|Quentin Tarantino|James Cameron|Taylor Swift|Beyonce|Ronaldo|Messi|LeBron James|Kobe Bryant|特朗普|拜登|奥巴马|马斯克|奥特曼|比尔盖茨|扎克伯格|贝索斯|库克|黄仁勋|纳德拉|皮查伊|诺兰|卡梅隆|周杰伦|成龙|王家卫|贾樟柯|陈凯歌|张艺谋|刘德华|梁朝伟|谷爱凌|姚明|郎平|苏炳添|郑钦文)/i;

const notablePodcastProgramPattern = /(?:Joe Rogan Experience|Lex Fridman Podcast|TED|TED Talks|TEDx|Huberman Lab|Diary Of A CEO|Call Her Daddy|SmartLess|Armchair Expert|Conan O'Brien Needs a Friend|The Daily|Hard Fork|Acquired|All-In Podcast|This American Life|Radiolab|Freakonomics Radio|圆桌派|十三邀|锵锵|一席|看理想|随机波动|忽左忽右|声东击西|不明白播客|硅谷101|商业就是这样|知行小酒馆|梁文道|许知远)/i;

const millionViewPattern = /(?:100万|百万|破百万|百万播放|播放量破|million views|1M views|[2-9]M views|viral)/i;

const sourceQueries = [
  {
    channel: "major_news",
    section: "国内",
    query: "成都 OR 北京 OR 上海 OR 广州 OR 中国 重大 新闻",
    sources: [
      ["央视新闻", "https://news.cctv.com/"],
      ["新华网四川", "http://www.sc.xinhuanet.com/index.htm"],
      ["中国新闻网", "https://www.chinanews.com.cn/"],
      ["新浪新闻", "https://news.sina.com.cn/"],
      ["百度新闻", "https://news.baidu.com/"],
      ["人民号", "https://www.peopleapp.com/home?a="],
      ["腾讯新闻", "https://news.qq.com/"],
      ["百度热搜", "https://top.baidu.com/board?tab=realtime&sa=fyb_realtime_31065"],
      ["微博", "https://weibo.com/"],
      ["小红书", "https://www.xiaohongshu.com/"],
      ["抖音精选", "https://www.douyin.com/jingxuan"],
      ["抖音新闻源 1", "https://www.douyin.com/user/MS4wLjABAAAAxA44mxJVod_Aq5wc0cZrbZHJ2S_DnoJctGpb_mOvsxs"],
      ["抖音新闻源 2", "https://www.douyin.com/user/MS4wLjABAAAA8U_l6rBzmy7bcy6xOJel4v0RzoR_wfAubGPeJimN__4"],
      ["抖音新闻源 3", "https://www.douyin.com/user/MS4wLjABAAAAGWFEyl_NuLBGlV43HPIjpq__gw2xt7FzeoxJk_P5kVc"],
      ["B站新闻源 1", "https://space.bilibili.com/456664753/video"],
      ["B站新闻源 2", "https://space.bilibili.com/1131457022/video"],
      ["B站新闻源 3", "https://space.bilibili.com/433587902/video"],
      ["B站新闻源 4", "https://space.bilibili.com/20165629/video"],
      ["B站新闻源 5", "https://space.bilibili.com/423264599/video"],
      ["B站新闻源 6", "https://space.bilibili.com/1442396399/video"],
      ["B站新闻源 7", "https://space.bilibili.com/423429083/video"],
      ["B站新闻源 8", "https://space.bilibili.com/473837611/video"],
      ["B站新闻源 9", "https://space.bilibili.com/569956690/video"],
      ["B站新闻源 10", "https://space.bilibili.com/104092224/video"]
    ]
  },
  {
    channel: "major_news",
    section: "国外",
    query: "breaking news global politics economy disaster conflict",
    sources: [
      ["Associated Press", "https://www.youtube.com/@AssociatedPress/videos"],
      ["AFP", "https://www.youtube.com/@AFP/videos"],
      ["Guardian News", "https://www.youtube.com/@guardiannews/videos"],
      ["Channel 4 News", "https://www.youtube.com/@Channel4News/videos"],
      ["CNN-News18", "https://www.youtube.com/@cnnnews18/videos"],
      ["FOX 9", "https://www.youtube.com/fox9/videos"]
    ]
  },
  {
    channel: "digital_tech",
    query: "AI smartphone chip cybersecurity product launch technology",
    sources: [
      ["The Verge", "https://www.theverge.com/search?q=AI%20chip%20smartphone"],
      ["TechCrunch", "https://techcrunch.com/search/AI%20chip%20smartphone/"],
      ["36Kr", "https://36kr.com/search/articles/AI%20芯片%20手机"]
    ]
  },
  {
    channel: "film_awards",
    section: "预告片",
    query: "movie trailer official Netflix Warner Disney A24 Apple TV",
    sources: [
      ["B站预告源 1", "https://space.bilibili.com/32708626/video"],
      ["B站预告源 2", "https://space.bilibili.com/8465957/video"],
      ["B站预告源 3", "https://space.bilibili.com/14235376/video"],
      ["B站预告源 4", "https://space.bilibili.com/652239032/video"],
      ["6huo", "https://www.6huo.com/"],
      ["Warner Bros. Pictures", "https://www.youtube.com/channel/UCF9imwPMSGz4Vq1NiTWCC7g/videos"],
      ["Paramount Pictures", "https://www.youtube.com/channel/UCiifkYAs_bq1pt_zbNAzYGg/videos"],
      ["Sony Pictures", "https://www.youtube.com/channel/UCjmJDM5pRKbUlVIzDYYWb6g/videos"],
      ["Marvel Entertainment", "https://www.youtube.com/channel/UCvC4D8onUfXzvjTOM-dBfEA/videos"],
      ["Disney Plus", "https://www.youtube.com/channel/UCz97F7dMxBNOfGYu3rx8aCw/videos"],
      ["Universal Pictures", "https://www.youtube.com/@UniversalPictures/videos"],
      ["Netflix", "https://www.youtube.com/@Netflix/videos"],
      ["Disney", "https://www.youtube.com/@Disney/videos"],
      ["A24", "https://www.youtube.com/@A24/videos"],
      ["Apple TV", "https://www.youtube.com/@AppleTV/videos"]
    ]
  },
  {
    channel: "film_awards",
    section: "消息类",
    query: "film award winner speech Oscars Cannes Emmy BAFTA Golden Globe",
    sources: [
      ["Variety", "https://variety.com/search/award%20winner%20speech/"],
      ["Deadline", "https://deadline.com/?s=award%20winner%20speech"],
      ["AFP", "https://www.youtube.com/@AFP/search?query=award%20speech"]
    ]
  },
  {
    channel: "gaming",
    query: "gaming esports final award release record",
    sources: [
      ["游侠网", "https://www.ali213.net/"],
      ["游民星空", "https://www.gamersky.com/"],
      ["B站游戏预告源", "https://space.bilibili.com/652239032/video"],
      ["IGN", "https://www.ign.com/search?q=gaming%20esports%20final"],
      ["Esports Charts", "https://escharts.com/"],
      ["GameSpot", "https://www.gamespot.com/search/?q=gaming%20release"]
    ]
  },
  {
    channel: "podcast_speech",
    query: "\"Lex Fridman\" OR \"Joe Rogan\" OR \"TED\" OR \"Diary Of A CEO\" interview CEO founder scientist actor athlete",
    sources: [
      ["YouTube", "https://www.youtube.com/results?search_query=Lex+Fridman+Joe+Rogan+TED+CEO+interview"],
      ["TED", "https://www.ted.com/search?q=technology%20speech"]
    ]
  },
  {
    channel: "china_entertainment",
    section: "国内娱乐圈",
    query: "微博 娱乐圈 明星 剧集 综艺 出圈",
    sources: [
      ["微博", "https://s.weibo.com/top/summary"],
      ["新浪娱乐", "https://ent.sina.com.cn/"],
      ["抖音精选", "https://www.douyin.com/jingxuan"]
    ]
  },
  {
    channel: "meme",
    query: "微博 热梗 抖音 小红书 B站 出圈",
    sources: [
      ["微博", "https://s.weibo.com/top/summary"],
      ["抖音精选", "https://www.douyin.com/jingxuan"],
      ["小红书", "https://www.xiaohongshu.com/"]
    ]
  },
  {
    channel: "sports",
    query: "sports final record champion award breakthrough",
    sources: [
      ["ESPN", "https://www.espn.com/search/_/q/sports%20record%20champion"],
      ["Olympics", "https://olympics.com/en/search?q=record%20champion"],
      ["World Athletics", "https://worldathletics.org/"]
    ]
  },
  {
    channel: "obituary",
    query: "obituary death famous actor musician leader scientist",
    sources: [
      ["The Guardian Obituaries", "https://www.theguardian.com/tone/obituaries"],
      ["AP", "https://apnews.com/search?q=obituary"]
    ]
  }
];

function localDate() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function absoluteUrl(url) {
  return url.startsWith("http") ? url : `https://${url}`;
}

function googleNewsRssUrl(query) {
  const params = new URLSearchParams({
    q: `${query} when:1d`,
    hl: "zh-CN",
    gl: "CN",
    ceid: "CN:zh-Hans"
  });
  return `https://news.google.com/rss/search?${params.toString()}`;
}

async function fetchText(url, timeoutMs = 4000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { "user-agent": "hot-intelligence-daily-updater/1.0" }
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return await response.text();
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchJson(url, options = {}, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "user-agent": "hot-intelligence-daily-updater/1.0",
        ...(options.headers || {})
      }
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchJsonpLike(url, timeoutMs = 5000) {
  const text = await fetchText(url, timeoutMs);
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/^[^(]*\(([\s\S]*)\)\s*;?$/);
    if (match) return JSON.parse(match[1]);
    throw new Error("Response is not JSON");
  }
}

function decodeHtml(value = "") {
  return value
    .replaceAll("<![CDATA[", "")
    .replaceAll("]]>", "")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", "\"")
    .replaceAll("&#39;", "'")
    .replaceAll("&nbsp;", " ")
    .replace(/<[^>]*>/g, "")
    .trim();
}

function extractNextData(html) {
  const match = html.match(/<script[^>]+id=["']__NEXT_DATA__["'][^>]*>([\s\S]*?)<\/script>/i);
  if (!match) return null;
  try {
    return JSON.parse(decodeHtml(match[1]));
  } catch {
    return null;
  }
}

function extractBaiduData(html) {
  const commentMatch = html.match(/<!--s-data:([\s\S]*?)-->/);
  if (commentMatch?.[1]) {
    try {
      return JSON.parse(commentMatch[1]);
    } catch {
      return null;
    }
  }
  return extractNextData(html);
}

function stripHtml(value = "") {
  return decodeHtml(value).replace(/\s+/g, " ").trim();
}

function safeDomain(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "来源";
  }
}

function extractMetaContent(html, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patterns = [
    new RegExp(`<meta\\b[^>]*(?:property|name)=["']${escaped}["'][^>]*content=["']([^"']+)["'][^>]*>`, "i"),
    new RegExp(`<meta\\b[^>]*content=["']([^"']+)["'][^>]*(?:property|name)=["']${escaped}["'][^>]*>`, "i")
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return stripHtml(match[1]);
  }
  return "";
}

function extractImageUrl(html, baseUrl) {
  const image =
    extractMetaContent(html, "og:image") ||
    extractMetaContent(html, "twitter:image") ||
    html.match(/<img\b[^>]*src=["']([^"']+)["'][^>]*>/i)?.[1] ||
    "";
  return image ? resolveUrl(image, baseUrl) : "";
}

function extractArticleParagraphs(html) {
  const cleaned = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "");
  const paragraphs = [];
  for (const match of cleaned.matchAll(/<(?:p|div|section)\b[^>]*>([\s\S]*?)<\/(?:p|div|section)>/gi)) {
    const text = stripHtml(match[1]);
    if (!looksLikeParagraph(text)) continue;
    if (paragraphs.includes(text)) continue;
    paragraphs.push(text);
    if (paragraphs.length >= 5) break;
  }
  return paragraphs;
}

function looksLikeParagraph(text) {
  if (!text || text.length < 36 || text.length > 420) return false;
  const bad = [
    "Copyright",
    "Privacy",
    "Terms",
    "ICP备",
    "公网安备",
    "登录",
    "注册",
    "下载客户端",
    "广告",
    "分享到",
    "更多精彩",
    "点击查看",
    "相关资讯",
    "热门推荐",
    "违法和不良信息举报",
    "资讯 下载 补丁 游戏库",
    "攻略 论坛 商城 网游",
    "新浪首页 新闻 体育",
    "World Athletics Partner",
    "各地网信部门举报",
    "网络文化经营许可证",
    "医疗器械网络交易服务",
    "首页 全部电影",
    "热搜榜 电影热搜榜",
    "影院经理群",
    "开通会员",
    "预告片世界小程序",
    "5.1声道高清预告",
    "高清预告视频"
  ];
  if (bad.some((word) => text.includes(word))) return false;
  if ((text.match(/\s/g) || []).length > 24 && text.length < 120) return false;
  return /[\u4e00-\u9fffA-Za-z]/.test(text);
}

function compactText(text = "", max = 180) {
  const value = stripHtml(text).replace(/\s+/g, " ").trim();
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}

function resolveUrl(href, baseUrl) {
  try {
    return new URL(href, baseUrl).toString();
  } catch {
    return "";
  }
}

function getYouTubeChannelId(url) {
  try {
    const parsed = new URL(url);
    const match = parsed.pathname.match(/\/channel\/([^/]+)/);
    return match?.[1] || "";
  } catch {
    return "";
  }
}

async function fetchYouTubeRssArticles(publisher, url, date, config) {
  const channelId = getYouTubeChannelId(url);
  if (!channelId) return [];
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  const xml = await fetchText(rssUrl, 5000);
  const articles = [];
  for (const entry of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/gi)) {
    const block = entry[1];
    const title = decodeHtml(block.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "");
    if (!looksLikeHeadline(title)) continue;
    if (!matchesChannelIntent(title, config)) continue;
    const videoId = decodeHtml(block.match(/<yt:videoId>([\s\S]*?)<\/yt:videoId>/i)?.[1] || "");
    const publishedRaw = decodeHtml(block.match(/<published>([\s\S]*?)<\/published>/i)?.[1] || "");
    const description = decodeHtml(block.match(/<media:description>([\s\S]*?)<\/media:description>/i)?.[1] || "");
    const imageUrl = block.match(/<media:thumbnail\b[^>]*url=["']([^"']+)["']/i)?.[1] || "";
    articles.push({
      title,
      url: videoId ? `https://www.youtube.com/watch?v=${videoId}` : url,
      publishedRaw,
      domain: publisher,
      imageUrl,
      description,
      bodyParagraphs: description ? [description] : [],
      sourceSnapshot: {
        publisher,
        title,
        url: videoId ? `https://www.youtube.com/watch?v=${videoId}` : url,
        description,
        paragraphs: description ? [description] : [],
        imageUrl,
        capturedAt: formatPublishedDate(publishedRaw, date)
      }
    });
    if (articles.length >= 2) break;
  }
  return articles;
}

function looksLikeHeadline(text) {
  if (!text) return false;
  if (text.length < 8 || text.length > 96) return false;
  if (!/[\u4e00-\u9fff]/.test(text) && text.split(/\s+/).filter(Boolean).length < 3) return false;
  const bad = [
    "登录",
    "注册",
    "首页",
    "客户端",
    "下载",
    "广告",
    "更多",
    "Copyright",
    "Privacy",
    "Terms",
    "Subscribe",
    "Newsletter"
  ];
  const badPhrases = [
    "Skip to main content",
    "The homepage",
    "logo",
    "Plus Icon",
    "Sina Visitor System",
    "沪ICP备",
    "京ICP备",
    "粤ICP备",
    "公网安备",
    "增值电信",
    "隐私政策",
    "用户协议",
    "Entertainment",
    "Facebook",
    "Markets & Festivals",
    "Awards Circuit",
    "Notable Deaths"
    ,
    "See all",
    "Where to Watch",
    "Smart Home Reviews",
    "Product Updates",
    "Rate and Review",
    "医疗器械网络交易服务",
    "互联网药品信息服务",
    "第三方平台备案",
    "违法不良信息举报",
    "互联网举报中心",
    "terms of use",
    "投稿视频",
    "视频分享-哔哩哔哩视频",
    "点击观看",
    "全部投稿视频",
    "Search |",
    "预告片世界",
    "5.1声道高清预告",
    "高清预告视频",
    "全部电影",
    "即将上映",
    "剪辑素材",
    "求资源",
    "电影素材网盘"
  ];
  if (badPhrases.some((phrase) => text.toLowerCase().includes(phrase.toLowerCase()))) return false;
  return !bad.some((word) => text.includes(word));
}

function matchesChannelIntent(text, config) {
  if (config.channel === "obituary") {
    return /obituary|dies|dead|death|去世|逝世|病逝|讣告|讣闻/i.test(text);
  }
  if (config.channel === "film_awards" && config.section === "预告片") {
    const genericTrailerPage = /预告片世界|5\.1声道高清预告|高清预告视频|全部电影|即将上映|剪辑素材|求资源|电影素材网盘|投稿视频|视频分享|小程序/i;
    if (genericTrailerPage.test(text)) return false;
    return /预告|trailer|teaser|先导|中字|定档|official/i.test(text);
  }
  if (config.channel === "film_awards" && config.section === "消息类") {
    return /award|winner|speech|festival|oscar|emmy|bafta|golden|cannes|获奖|颁奖|电影节|金像|金鸡|百花|白玉兰|金棕榈|奥斯卡|艾美/i.test(text);
  }
  return true;
}

function getArticleText(article = {}) {
  return [
    article.title,
    article.description,
    ...(article.bodyParagraphs || [])
  ]
    .filter(Boolean)
    .join(" ");
}

function getPreferenceSignals(article, config) {
  const text = getArticleText(article);
  const tags = [];
  let score = 0;
  for (const rule of preferenceSignalRules) {
    if (!rule.pattern.test(text)) continue;
    tags.push(rule.tag);
    score += rule.score;
  }

  if (config.channel === "major_news" && /重大|突发|breaking|live|urgent/i.test(text)) {
    tags.push("突发/重大");
    score += 10;
  }
  if (config.channel === "meme" && /梗|名场面|表情包|二创|meme/i.test(text)) {
    tags.push("热梗/二创");
    score += 16;
  }
  if (config.channel === "podcast_speech") {
    const hotEnough = (article.viewCount || 0) >= 1000000 || millionViewPattern.test(text);
    const notableEnough = notablePodcastPeoplePattern.test(text) || notablePodcastProgramPattern.test(text);
    if (hotEnough) {
      tags.push("百万级播放");
      score += 24;
    }
    if (notableEnough) {
      tags.push("知名人物/节目");
      score += 24;
    }
    if (/interview|podcast|speech|访谈|播客|演讲|发言|talk/i.test(text)) {
      tags.push("访谈/演讲");
      score += 8;
    }
  }

  return { tags: [...new Set(tags)], score };
}

function channelSignalThreshold(config) {
  if (config.channel === "major_news") return 18;
  if (config.channel === "obituary") return 24;
  if (config.channel === "sports") return 18;
  if (config.channel === "digital_tech") return 16;
  if (config.channel === "film_awards" && config.section === "预告片") return 12;
  if (config.channel === "film_awards") return 18;
  if (config.channel === "gaming") return 14;
  if (config.channel === "podcast_speech") return 54;
  if (config.channel === "china_entertainment" || config.channel === "meme") return 16;
  return 14;
}

function isWeakArticle(article, config) {
  const title = stripHtml(article.title || "");
  const text = stripHtml(getArticleText(article));
  if (!looksLikeHeadline(title)) return true;
  if (weakHeadlinePatterns.some((pattern) => pattern.test(`${title} ${text}`))) return true;
  if (!matchesChannelIntent(title, config)) return true;
  if (config.channel === "podcast_speech") {
    const hotEnough = (article.viewCount || 0) >= 1000000 || millionViewPattern.test(text);
    const notableEnough = notablePodcastPeoplePattern.test(text) || notablePodcastProgramPattern.test(text);
    if (!hotEnough || !notableEnough) return true;
  }
  return false;
}

function selectWorthwhileArticles(articles, config) {
  return articles
    .map((article) => ({ article, signals: getPreferenceSignals(article, config) }))
    .filter(({ article, signals }) => !isWeakArticle(article, config) && signals.score >= channelSignalThreshold(config))
    .sort((a, b) => b.signals.score - a.signals.score)
    .slice(0, 2)
    .map(({ article, signals }) => ({
      ...article,
      preferenceTags: signals.tags,
      preferenceScore: signals.score
    }));
}

function inferRegions(article, config) {
  const text = getArticleText(article);
  const regions = new Set();
  if (config.section === "国内" || /中国|北京|上海|广州|深圳|成都|杭州|微博|抖音|小红书/.test(text)) regions.add("中国");
  if (/美国|特朗普|拜登|纽约|华盛顿|Los Angeles|New York|Washington|Trump|U\.S\.|US\b|USA/i.test(text)) regions.add("美国");
  if (/欧洲|欧盟|英国|法国|德国|意大利|Cannes|BAFTA|London|Paris|EU\b/i.test(text)) regions.add("欧洲");
  if (/日本|韩国|印度|东南亚|Tokyo|Seoul|India/i.test(text)) regions.add("亚洲");
  if (!regions.size) regions.add(config.section === "国内" ? "中国" : "全球");
  return [...regions].slice(0, 3);
}

function extractPeople(article) {
  const title = stripHtml(article.title || "");
  const people = new Set();
  for (const match of title.matchAll(/(?:特朗普|拜登|普京|马杜罗|马斯克|黄仁勋|雷军|余承东|周杰伦|成龙|王一博|肖战|谷爱凌|苏炳添|郑钦文)/g)) {
    people.add(match[0]);
  }
  for (const match of title.matchAll(/\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2})\b/g)) {
    const value = match[1];
    if (!/^(Associated Press|Guardian News|Channel News|Fox News|New York|Los Angeles|Golden Globe|World Athletics)$/.test(value)) {
      people.add(value);
    }
  }
  return [...people].slice(0, 5);
}

function extractArticlesFromHtml(html, source, date, config) {
  const results = [];
  const seen = new Set();
  for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    const href = match[1];
    const text = decodeHtml(match[2]).replace(/\s+/g, " ");
    if (!looksLikeHeadline(text)) continue;
    if (!matchesChannelIntent(text, config)) continue;
    const url = resolveUrl(href, source.url);
    if (!url || seen.has(`${text}|${url}`)) continue;
    seen.add(`${text}|${url}`);
    results.push({
      title: text,
      url,
      publishedRaw: "",
      domain: source.publisher,
      publishedAt: `${date} 08:00`
    });
    if (results.length >= 5) break;
  }

  if (!results.length) {
    const titleMatch =
      html.match(/<meta\b[^>]*(?:property|name)=["']og:title["'][^>]*content=["']([^"']+)["'][^>]*>/i) ||
      html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = decodeHtml(titleMatch?.[1] || source.title);
    if (looksLikeHeadline(title) && matchesChannelIntent(title, config)) {
      results.push({
        title,
        url: source.url,
        publishedRaw: "",
        domain: source.publisher,
        publishedAt: `${date} 08:00`
      });
    }
  }

  return results;
}

async function fetchSourceArticles(config, date) {
  const articles = [];
  const errors = [];
  for (const [publisher, url] of config.sources.slice(0, sourceCheckLimit(config))) {
    try {
      const rssArticles = await fetchYouTubeRssArticles(publisher, url, date, config);
      if (rssArticles.length) {
        articles.push(...rssArticles);
      } else {
        const html = await fetchText(url);
        const extracted = extractArticlesFromHtml(html, { publisher, title: `${publisher} 来源`, url }, date, config);
        articles.push(...extracted);
      }
    } catch (error) {
      errors.push(`${publisher}: ${error.message || error}`);
    }
    if (articles.length >= 2) break;
  }
  return { articles: await enrichArticles(articles.slice(0, 2), date), errors };
}

function sourceCheckLimit(config) {
  if (config.channel === "major_news" && config.section === "国内") return 8;
  if (config.channel === "gaming") return 3;
  if (config.channel === "film_awards" && config.section === "预告片") return 10;
  return 3;
}

async function enrichArticles(articles, date) {
  return Promise.all(
    articles.map(async (article) => {
      if (!article.url || !article.url.startsWith("http")) return article;
      try {
        const html = await fetchText(article.url, 2500);
        const description = extractMetaContent(html, "description") || extractMetaContent(html, "og:description");
        const title = extractMetaContent(html, "og:title") || article.title;
        const imageUrl = article.imageUrl || extractImageUrl(html, article.url);
        const bodyParagraphs = extractArticleParagraphs(html);
        return {
          ...article,
          title: stripHtml(title) || article.title,
          description: description || bodyParagraphs[0] || "",
          bodyParagraphs,
          imageUrl,
          sourceSnapshot: {
            publisher: article.domain || safeDomain(article.url),
            title: stripHtml(title) || article.title,
            url: article.url,
            description: description || "",
            paragraphs: bodyParagraphs,
            imageUrl,
            capturedAt: `${date} 08:00`
          }
        };
      } catch {
        return article;
      }
    })
  );
}

function formatPublishedDate(raw, date) {
  const parsed = raw ? new Date(raw) : null;
  if (!parsed || Number.isNaN(parsed.getTime())) return `${date} 08:00`;
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  })
    .format(parsed)
    .replaceAll("/", "-");
}

function newsApiUrl(config) {
  const params = new URLSearchParams({
    q: config.query,
    language: config.section === "国内" || config.section === "国内娱乐圈" ? "zh" : "en",
    sortBy: "publishedAt",
    pageSize: "5",
    apiKey: env.newsApiKey
  });
  return `https://newsapi.org/v2/everything?${params.toString()}`;
}

async function fetchNewsApiArticles(config) {
  if (!env.newsApiKey) return [];
  if (config.section === "预告片" || config.channel === "podcast_speech") return [];
  const data = await fetchJson(newsApiUrl(config));
  return (data.articles || [])
    .filter((article) => article.title && article.url)
    .slice(0, 2)
    .map((article) => ({
      title: article.title,
      url: article.url,
      publishedRaw: article.publishedAt,
      domain: article.source?.name || safeDomain(article.url),
      imageUrl: article.urlToImage || ""
      ,
      description: article.description || article.content || "",
      bodyParagraphs: [article.description, article.content].filter(Boolean),
      sourceSnapshot: {
        publisher: article.source?.name || safeDomain(article.url),
        title: article.title,
        url: article.url,
        description: article.description || article.content || "",
        paragraphs: [article.description, article.content].filter(Boolean),
        imageUrl: article.urlToImage || "",
        capturedAt: formatPublishedDate(article.publishedAt, localDate())
      }
    }));
}

function youtubeSearchUrl(config) {
  const params = new URLSearchParams({
    key: env.youtubeApiKey,
    part: "snippet",
    type: "video",
    maxResults: config.channel === "podcast_speech" ? "10" : "5",
    order: config.channel === "podcast_speech" ? "viewCount" : "date",
    q: config.query
  });
  if (config.channel !== "podcast_speech") {
    params.set("publishedAfter", new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString());
  }
  return `https://www.googleapis.com/youtube/v3/search?${params.toString()}`;
}

async function fetchYouTubeVideoStats(videoIds) {
  if (!videoIds.length) return new Map();
  const params = new URLSearchParams({
    key: env.youtubeApiKey,
    part: "statistics,contentDetails",
    id: videoIds.join(",")
  });
  const data = await fetchJson(`https://www.googleapis.com/youtube/v3/videos?${params.toString()}`);
  return new Map((data.items || []).map((item) => [item.id, item.statistics || {}]));
}

async function fetchYouTubeArticles(config) {
  if (!env.youtubeApiKey) return [];
  const videoChannels = new Set(["film_awards", "podcast_speech", "major_news"]);
  if (!videoChannels.has(config.channel)) return [];
  const data = await fetchJson(youtubeSearchUrl(config));
  const items = (data.items || []).filter((item) => item.id?.videoId && item.snippet?.title);
  const statsById = config.channel === "podcast_speech"
    ? await fetchYouTubeVideoStats(items.map((item) => item.id.videoId))
    : new Map();
  return items
    .map((item) => {
      const stats = statsById.get(item.id.videoId) || {};
      const viewCount = Number(stats.viewCount || 0);
      const statsLine = viewCount ? `播放 ${formatHeatValue(viewCount)}` : "";
      const description = [item.snippet.description || "", statsLine].filter(Boolean).join(" ");
      return {
        title: item.snippet.title,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        publishedRaw: item.snippet.publishedAt,
        domain: item.snippet.channelTitle || "YouTube",
        imageUrl: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url || "",
        description,
        viewCount,
        bodyParagraphs: description ? [description] : [],
        sourceSnapshot: {
          publisher: item.snippet.channelTitle || "YouTube",
          title: item.snippet.title,
          url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          description,
          paragraphs: description ? [description] : [],
          imageUrl: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url || "",
          capturedAt: formatPublishedDate(item.snippet.publishedAt, localDate())
        }
      };
    });
}

async function fetchAuthorizedArticles(config) {
  if (config.channel === "gaming") return [];
  const youtubeFirst = config.section === "预告片" || config.channel === "podcast_speech";
  const strategies = youtubeFirst
    ? [fetchYouTubeArticles, fetchNewsApiArticles]
    : [fetchNewsApiArticles, fetchYouTubeArticles];
  for (const strategy of strategies) {
    try {
      const articles = await strategy(config);
      if (articles.length) return articles;
    } catch {
      // Keep going: authorized APIs can fail while direct source pages still work.
    }
  }
  return [];
}

function normalizeArticle(article, config, index, date) {
  const title = article.title || `${channels[config.channel]}更新`;
  const domain = article.domain || safeDomain(article.url);
  const publishedAt = article.publishedAt || formatPublishedDate(article.publishedRaw, date);
  const sourceLead = compactText(article.description || article.bodyParagraphs?.[0] || "", 170);
  const sourceDetails = (article.bodyParagraphs || []).filter(looksLikeParagraph).slice(0, 3).map((text) => compactText(text, 180));
  const preferenceTags = article.preferenceTags || getPreferenceSignals(article, config).tags;
  const preferenceScore = article.preferenceScore || getPreferenceSignals(article, config).score;
  const score = Math.min(98, Math.max(64, 66 + preferenceScore - index * 3));
  const people = extractPeople(article);
  const regions = inferRegions(article, config);

  return {
    id: `${date}-${config.channel}-${index + 1}`,
    date,
    channel: config.channel,
    section: config.section,
    titleZh: title,
    summaryZh: sourceLead
      ? `${publishedAt}，${domain} 发布：${sourceLead}`
      : `${publishedAt}，${domain} 发布相关报道。该条目由每日更新脚本从过去24小时来源中自动汇总，详情需打开原文核对具体上下文。`,
    whyItMatters: preferenceTags.length
      ? `收录原因：${preferenceTags.join("、")}。这类消息更接近人工素材库里的高热度、强记忆点或年度节点型选题。`
      : `该消息进入${channels[config.channel]}频道，原因是它在过去24小时内被新闻源捕捉，并与当前频道关键词相关。`,
    regions,
    people,
    platforms: config.sources.map(([publisher]) => publisher).slice(0, 4),
    importanceScore: score,
    heatScore: Math.max(60, score - 2),
    confidence: preferenceScore >= 24 && index === 0 ? "confirmed" : "developing",
    preferenceTags,
    thumbnailUrl: article.imageUrl || "",
    detailBlocks: [
      `时间：${publishedAt}。`,
      `地点/范围：${regions.join("、")}。`,
      people.length ? `涉及人物：${people.join("、")}。` : `涉及对象：${config.section || channels[config.channel]}相关当事方、平台或机构。`,
      sourceDetails.length
        ? `来源内容：${sourceDetails.join(" ")}`
        : `具体信息：${title}。当前自动更新脚本已记录原文链接，页面保留报道来源、图片/视频入口和相关新闻，人工阅读时应以原文为准。`,
      `为什么值得收录：${preferenceTags.length ? preferenceTags.join("、") : "命中当前频道关键词"}。`,
      `后续观察：继续跟踪同一主题在权威媒体、视频源和社交平台的后续报道；若出现官方声明或更多独立来源，下一次更新会提升可信度。`
    ],
    sourceSnapshots: article.sourceSnapshot ? [article.sourceSnapshot] : [],
    sources: [
      {
        publisher: domain,
        title,
        url: absoluteUrl(article.url),
        publishedAt
      },
      ...config.sources.slice(0, 2).map(([publisher, url]) => ({
        publisher,
        title: `${publisher} 相关来源`,
        url,
        publishedAt: `${date} 08:00`
      }))
    ]
  };
}

function fallbackItem(config, index, date) {
  return {
    id: `${date}-${config.channel}-fallback-${index + 1}`,
    date,
    channel: config.channel,
    section: config.section,
    titleZh: `${channels[config.channel]}：${date} 来源池已检查，等待可靠条目确认`,
    summaryZh: `${date} 北京时间早间更新已检查该频道来源。当前没有足够具体且可交叉验证的新增条目，因此不编造新闻。`,
    whyItMatters: "该空状态用于提示系统已经运行，但没有达到收录门槛的可靠消息。",
    regions: config.section === "国内" ? ["中国"] : ["全球"],
    people: [],
    platforms: config.sources.map(([publisher]) => publisher).slice(0, 4),
    importanceScore: 40,
    heatScore: 40,
    confidence: "single_source",
    detailBlocks: [
      `时间：${date} 北京时间早间。`,
      `范围：${config.section || channels[config.channel]}来源池。`,
      "具体信息：本次检查未获得足够明确的人、事、时间、地点和双源确认，因此不生成具体新闻条目。",
      "后续观察：等待下一次自动更新或人工补充真实来源链接。"
    ],
    sources: config.sources.slice(0, fallbackSourceLimit(config)).map(([publisher, url]) => ({
      publisher,
      title: `${publisher} 来源入口`,
      url,
      publishedAt: `${date} 08:00`
    }))
  };
}

function fallbackSourceLimit(config) {
  if (config.channel === "major_news" && config.section === "国内") return 24;
  if (config.channel === "gaming") return 6;
  return 3;
}

async function buildItems() {
  const date = localDate();
  const items = await buildHotRankingItems(date);
  if (!env.includeSourceQueryItems) return items;

  for (const [configIndex, config] of sourceQueries.entries()) {
    try {
      let articles = await fetchAuthorizedArticles(config);
      if (!articles.length) {
        const fallback = await fetchSourceArticles(config, date);
        articles = fallback.articles;
      }
      articles = selectWorthwhileArticles(articles, config);
      if (articles.length) {
        articles.forEach((article, articleIndex) => {
          items.push(normalizeArticle(article, config, configIndex * 2 + articleIndex, date));
        });
      }
    } catch (error) {
      console.warn(`${channels[config.channel]} skipped: ${String(error.message || error)}`);
    }
  }

  return items;
}


function extractList(data, paths) {
  for (const currentPath of paths) {
    const value = currentPath.split(".").reduce((current, key) => current?.[key], data);
    if (Array.isArray(value)) return value;
  }
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data)) return data;
  return [];
}

function firstText(...values) {
  const value = values.find((entry) => typeof entry === "string" && entry.trim());
  return value ? value.trim() : "";
}

function normalizeHeatValue(value) {
  if (typeof value === "number") return value;
  if (!value) return 0;
  const text = String(value).replace(/,/g, "").trim();
  const number = parseFloat(text);
  if (!Number.isFinite(number)) return 0;
  if (text.includes("亿")) return Math.round(number * 100000000);
  if (text.includes("万")) return Math.round(number * 10000);
  return Math.round(number);
}

function heatScoreFromRank(rank) {
  return Math.max(70, 100 - (rank - 1) * 3);
}

function baiduBoardUrl(tab) {
  return `https://top.baidu.com/board?tab=${tab}`;
}

function baiduSearchUrl(title) {
  return `https://www.baidu.com/s?wd=${encodeURIComponent(title)}`;
}

function extractBaiduCards(data) {
  const cards = data?.data?.cards || data?.props?.pageProps?.data?.cards || data?.props?.pageProps?.cards || [];
  if (Array.isArray(cards) && cards.length) return cards;
  return [];
}

function mapBaiduItem(entry, index, date, section, tab) {
  const title = firstText(entry.query, entry.word, entry.title, entry.name, entry.show, entry.desc);
  if (!title || weakHeadlinePatterns.some((pattern) => pattern.test(title))) return null;
  const rank = index + 1;
  const heatValue = normalizeHeatValue(entry.hotScore || entry.hotValue || entry.value || entry.score || entry.desc);
  const url = entry.url || entry.rawUrl || baiduSearchUrl(title);
  const imageUrl = entry.img || entry.image || entry.cover || entry.pic || "";
  return makeRankingItem({
    date,
    section,
    publisher: "百度热搜",
    title,
    rank,
    heatValue,
    url,
    originalUrl: baiduBoardUrl(tab),
    imageUrl,
    summary: entry.desc || entry.content || "",
    tags: ["百度", section]
  });
}

const open2HubSections = new Map([
  ["抖音", "抖音热榜"],
  ["微博", "微博热搜"],
  ["百度", "百度热搜"],
  ["今日头条", "今日头条"],
  ["腾讯新闻", "腾讯新闻"],
  ["哔哩哔哩", "B站聚合热榜"],
  ["快手", "快手热榜"],
  ["知乎", "知乎热榜"],
  ["豆瓣", "豆瓣热话"],
  ["虎扑", "虎扑热榜"],
  ["36氪", "36氪"],
  ["IT之家", "IT之家"],
  ["游民星空", "游戏热榜"],
  ["爱范儿", "爱范儿"],
  ["虎嗅", "虎嗅"]
]);

const momoyuSections = new Map([
  ["zhihu", "知乎热榜"],
  ["weibo", "微博热搜"],
  ["toutiao", "今日头条"],
  ["douban", "豆瓣热话"],
  ["hupu", "虎扑热榜"],
  ["bilibili", "B站聚合热榜"],
  ["itzhijia", "IT之家"],
  ["aifaner", "爱范儿"],
  ["huxiu", "虎嗅"],
  ["zhongguancun", "中关村在线"],
  ["csdn", "CSDN"],
  ["juejin", "掘金"]
]);

function cleanRankTitle(value = "") {
  return decodeHtml(value).replace(/\s+/g, " ").trim();
}

function decodeUrlFromTophubLink(url) {
  try {
    const parsed = new URL(url, "https://tophub.today");
    return parsed.searchParams.get("url") || parsed.toString();
  } catch {
    return url;
  }
}

function inferHeatFromExtra(extra = "") {
  return normalizeHeatValue(String(extra).replace(/[^\d.万亿kKmM]/g, ""));
}

async function fetchOpen2HubRankings(date, limitEach = 8) {
  const html = await fetchText("https://rebang.open2hub.com/", 9000);
  const results = [];
  const cards = html.matchAll(/<section class="card"[^>]*data-filter="([^"]+)"[\s\S]*?<div class="header-content">\s*<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>[\s\S]*?<div class="list-container">([\s\S]*?)<\/div>\s*<\/section>/g);
  for (const card of cards) {
    const sourceName = cleanRankTitle(card[2].replace(/<[^>]+>/g, ""));
    const section = open2HubSections.get(sourceName);
    if (!section) continue;
    const updateText = cleanRankTitle(card[3].replace(/<[^>]+>/g, ""));
    const items = [...card[4].matchAll(/<a href="([^"]+)" class="list-item"[^>]*>\s*<span class="list-number">([^<]+)<\/span>\s*<span class="list-text">([\s\S]*?)<\/span>/g)];
    for (const item of items.slice(0, limitEach)) {
      const rank = Number(cleanRankTitle(item[2])) || results.length + 1;
      const title = cleanRankTitle(item[3].replace(/<[^>]+>/g, ""));
      if (!title || weakHeadlinePatterns.some((pattern) => pattern.test(title))) continue;
      results.push(makeRankingItem({
        date,
        section,
        publisher: `Open2Hub · ${sourceName}`,
        title,
        rank,
        heatValue: 0,
        url: resolveUrl(item[1], "https://rebang.open2hub.com/"),
        originalUrl: "https://rebang.open2hub.com/",
        imageUrl: "",
        summary: `${sourceName}聚合热榜 · ${updateText || "实时更新"}`,
        tags: ["Open2Hub", sourceName]
      }));
    }
  }
  return results;
}

async function fetchMomoyuRankings(date, limitEach = 8) {
  const data = await fetchJson("https://momoyu.cc/api/hot/list?type=0", {
    headers: {
      referer: "https://momoyu.cc/"
    }
  }, 9000);
  const list = data?.data || [];
  const results = [];
  for (const source of list) {
    const section = momoyuSections.get(source.source_key);
    if (!section) continue;
    const sourceName = source.name || section;
    for (const [index, entry] of (source.data || []).slice(0, limitEach).entries()) {
      const title = cleanRankTitle(entry.title || "");
      if (!title || weakHeadlinePatterns.some((pattern) => pattern.test(title))) continue;
      const extra = cleanRankTitle(entry.extra || "");
      results.push(makeRankingItem({
        date,
        section,
        publisher: `摸摸鱼 · ${sourceName}`,
        title,
        rank: index + 1,
        heatValue: inferHeatFromExtra(extra),
        url: entry.link || "https://momoyu.cc/",
        originalUrl: "https://momoyu.cc/",
        imageUrl: "",
        summary: `${sourceName}${extra ? ` · ${extra}` : ""}`,
        tags: ["摸摸鱼", sourceName]
      }));
    }
  }
  return results;
}

async function fetchTophubRankings(date, limitEach = 6) {
  const html = await fetchText("https://tophub.today/", 20000);
  const results = [];
  const cards = html.matchAll(/<div class="cc-cd"[^>]*>[\s\S]*?<div class="cc-cd-lb">[\s\S]*?<span>\s*([^<]+?)\s*<\/span>[\s\S]*?<span class="cc-cd-sb-st">\s*([^<]+?)\s*<\/span>[\s\S]*?<div class="cc-cd-cb-l[^"]*">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/g);
  for (const card of cards) {
    const sourceName = cleanRankTitle(card[1]);
    const boardName = cleanRankTitle(card[2]);
    const section = open2HubSections.get(sourceName) || (sourceName.includes("哔哩") ? "B站聚合热榜" : null);
    if (!section) continue;
    const items = [...card[3].matchAll(/<a href="([^"]+)"[\s\S]*?<span class="s[^"]*">\s*([^<]+)\s*<\/span>\s*<span class="t">([\s\S]*?)<\/span>\s*<span class="e">([\s\S]*?)<\/span>/g)];
    for (const item of items.slice(0, limitEach)) {
      const rank = Number(cleanRankTitle(item[2])) || results.length + 1;
      const title = cleanRankTitle(item[3].replace(/<[^>]+>/g, ""));
      const extra = cleanRankTitle(item[4].replace(/<[^>]+>/g, ""));
      if (!title || weakHeadlinePatterns.some((pattern) => pattern.test(title))) continue;
      results.push(makeRankingItem({
        date,
        section,
        publisher: `Tophub · ${sourceName}`,
        title,
        rank,
        heatValue: inferHeatFromExtra(extra),
        url: decodeUrlFromTophubLink(item[1]),
        originalUrl: "https://tophub.today/",
        imageUrl: "",
        summary: `${boardName}${extra ? ` · ${extra}` : ""}`,
        tags: ["Tophub", sourceName]
      }));
    }
  }
  return results;
}

function dedupeRankingItems(items) {
  const seen = new Set();
  const normalized = [];
  for (const item of items) {
    const key = `${item.section}|${cleanRankTitle(item.titleZh).replace(/[^\u4e00-\u9fffA-Za-z0-9]/g, "").toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    normalized.push(item);
  }
  return normalized;
}

async function fetchBaiduBoard(tab, section, date, limit = 10) {
  const html = await fetchText(baiduBoardUrl(tab), 7000);
  const data = extractBaiduData(html);
  const cards = extractBaiduCards(data);
  const content = cards.flatMap((card) => card.content || card.list || []);
  return content
    .map((entry, index) => mapBaiduItem(entry, index, date, section, tab))
    .filter(Boolean)
    .slice(0, limit);
}

async function fetchDouyinHot(date, limit = 10) {
  const url = "https://www.douyin.com/aweme/v1/web/hot/search/list/?device_platform=webapp&aid=6383&channel=channel_pc_web&detail_list=1&source=6";
  const data = await fetchJson(url, {}, 7000);
  const list = data?.data?.word_list || data?.word_list || [];
  return list
    .map((entry, index) => {
      const title = firstText(entry.word, entry.sentence, entry.event_word);
      if (!title || weakHeadlinePatterns.some((pattern) => pattern.test(title))) return null;
      return makeRankingItem({
        date,
        section: "抖音热榜",
        publisher: "抖音热榜",
        title,
        rank: Number(entry.position || entry.rank || index + 1),
        heatValue: normalizeHeatValue(entry.hot_value || entry.hotValue || entry.video_count),
        url: `https://www.douyin.com/search/${encodeURIComponent(title)}`,
        originalUrl: "https://www.douyin.com/hot",
        imageUrl: entry.word_cover?.url_list?.[0] || "",
        summary: entry.label_name ? `${entry.label_name} · 抖音热榜` : "抖音热榜上榜话题",
        tags: ["抖音", "热榜"]
      });
    })
    .filter(Boolean)
    .slice(0, limit);
}

async function fetchBilibiliPopular(date, limit = 10) {
  const data = await fetchJson("https://api.bilibili.com/x/web-interface/popular?ps=20&pn=1", {}, 7000);
  const list = data?.data?.list || [];
  return list
    .map((entry, index) => mapBilibiliVideo(entry, index, date, "B站综合热门"))
    .filter(Boolean)
    .slice(0, limit);
}

async function fetchBilibiliRanking(date, limit = 10) {
  const data = await fetchJson("https://api.bilibili.com/x/web-interface/ranking?rid=0&day=3", {
    headers: {
      referer: "https://www.bilibili.com/v/popular/rank/all"
    }
  }, 7000);
  const list = data?.data?.list || [];
  return list
    .map((entry, index) => mapBilibiliVideo(entry, index, date, "B站排行榜"))
    .filter(Boolean)
    .slice(0, limit);
}

function mapBilibiliVideo(entry, index, date, section) {
  const title = firstText(entry.title);
  if (!title || weakHeadlinePatterns.some((pattern) => pattern.test(title))) return null;
  const bvid = entry.bvid || "";
  const owner = entry.owner?.name || entry.author || "B站UP主";
  const views = normalizeHeatValue(entry.stat?.view || entry.play || 0);
  return makeRankingItem({
    date,
    section,
    publisher: section,
    title,
    rank: index + 1,
    heatValue: views,
    url: bvid ? `https://www.bilibili.com/video/${bvid}/` : "https://www.bilibili.com/v/popular/rank/all",
    originalUrl: section === "B站排行榜" ? "https://www.bilibili.com/v/popular/rank/all" : "https://www.bilibili.com/v/popular/all",
    imageUrl: entry.pic || "",
    summary: `${owner} · 播放 ${views ? formatHeatValue(views) : "待确认"}`,
    tags: ["B站", owner]
  });
}

async function fetchDoubanTopics(date, limit = 10) {
  const html = await fetchText("https://www.douban.com/group/explore", 7000);
  const results = [];
  const seen = new Set();
  for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    const url = resolveUrl(match[1], "https://www.douban.com/group/explore");
    const title = decodeHtml(match[2]).replace(/\s+/g, " ").trim();
    if (!url.includes("douban.com/group/topic/")) continue;
    if (!looksLikeHeadline(title) || seen.has(title)) continue;
    seen.add(title);
    results.push(
      makeRankingItem({
        date,
        section: "豆瓣实时讨论",
        publisher: "豆瓣",
        title,
        rank: results.length + 1,
        heatValue: 0,
        url,
        originalUrl: "https://www.douban.com/group/explore",
        imageUrl: "",
        summary: "豆瓣小组实时热门讨论",
        tags: ["豆瓣", "讨论"]
      })
    );
    if (results.length >= limit) break;
  }
  return results;
}

function makeRankingItem({ date, section, publisher, title, rank, heatValue, url, originalUrl, imageUrl, summary, tags }) {
  const score = heatScoreFromRank(rank);
  const heatText = heatValue ? `，热度 ${formatHeatValue(heatValue)}` : "";
  return {
    id: `${date}-hot-${section}-${rank}-${slugId(title)}`,
    date,
    channel: "hot_rankings",
    section,
    titleZh: title,
    summaryZh: `${date} ${publisher}第 ${rank} 名${heatText}。${summary || "该内容正在平台热榜中获得集中讨论。"}`,
    whyItMatters: `收录原因：进入${section}前列，代表截止本次更新时该平台的高热度内容。`,
    regions: ["中国"],
    people: [],
    platforms: [publisher, ...(tags || [])].filter(Boolean).slice(0, 5),
    rank,
    heatScore: score,
    importanceScore: score,
    confidence: "confirmed",
    thumbnailUrl: imageUrl || "",
    preferenceTags: [section, "平台热榜"],
    detailBlocks: [
      `时间：${date} 本次自动更新。`,
      `平台：${publisher}。`,
      `排名：${section}第 ${rank} 名${heatText}。`,
      `具体信息：${title}。${summary || "该条目来自平台公开热榜，适合作为当天网络热度观察入口。"}`,
      "后续观察：如果同一话题同时进入多个平台榜单，或被媒体/视频平台二次传播，可提升为正式事件条目。"
    ],
    sourceSnapshots: [
      {
        publisher,
        title,
        url,
        description: summary || `${section}第 ${rank} 名`,
        paragraphs: [summary || `${title}进入${section}第 ${rank} 名。`],
        imageUrl,
        capturedAt: `${date} 08:00`
      }
    ],
    sources: [
      {
        publisher,
        title,
        url,
        publishedAt: `${date} 08:00`
      },
      {
        publisher: `${publisher}榜单页`,
        title: section,
        url: originalUrl || url,
        publishedAt: `${date} 08:00`
      }
    ]
  };
}

function formatHeatValue(value) {
  if (!value) return "";
  if (value >= 100000000) return `${(value / 100000000).toFixed(1)}亿`;
  if (value >= 10000) return `${(value / 10000).toFixed(1)}万`;
  return String(value);
}

function slugId(value) {
  return encodeURIComponent(String(value).slice(0, 24)).replace(/%/g, "").slice(0, 36);
}

async function buildHotRankingItems(date) {
  const jobs = [
    () => fetchBaiduBoard("realtime", "百度热搜", date, 15),
    () => fetchBaiduBoard("movie", "电影榜", date, 10),
    () => fetchBaiduBoard("teleplay", "电视剧榜", date, 10),
    () => fetchDouyinHot(date, 15),
    () => fetchBilibiliPopular(date, 10),
    () => fetchBilibiliRanking(date, 10),
    () => fetchDoubanTopics(date, 10),
    () => fetchMomoyuRankings(date, 8),
    () => fetchOpen2HubRankings(date, 8),
    () => fetchTophubRankings(date, 6)
  ];
  const results = await Promise.allSettled(jobs.map((job) => job()));
  const items = results.flatMap((result, index) => {
    if (result.status === "fulfilled") return result.value;
    console.warn(`热榜源 ${index + 1} skipped: ${result.reason?.message || result.reason}`);
    return [];
  });
  return dedupeRankingItems(items);
}

async function main() {
  const items = await buildItems();
  if (!items.length) {
    throw new Error("本次更新未抓取到有效条目，已停止写入，避免覆盖现有日报数据。请检查网络权限或稍后重试。");
  }

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  const generatedAt = new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date());

  const body = [
    `window.HOT_INTELLIGENCE_GENERATED_AT = ${JSON.stringify(generatedAt)};`,
    `window.HOT_INTELLIGENCE_ITEMS = ${JSON.stringify(items, null, 2)};`,
    ""
  ].join("\n");

  await fs.writeFile(tempOutputPath, body, "utf8");
  await fs.rename(tempOutputPath, outputPath);
  await fs.copyFile(outputPath, backupPath);
  console.log(`Updated ${outputPath} with ${items.length} items at ${generatedAt}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
