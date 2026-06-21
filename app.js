const channels = [
  { id: "all", label: "全部频道", icon: "◆", description: "今日日报总览" },
  { id: "major_news", label: "全球重大事件", icon: "⌾", description: "政治、冲突、经济、灾害" },
  { id: "hot_rankings", label: "热度榜", icon: "↗", description: "百度、抖音、B站、豆瓣等平台热榜" },
  { id: "digital_tech", label: "数码科技", icon: "⌘", description: "AI、芯片、消费电子" },
  { id: "film_awards", label: "影视圈", icon: "★", description: "预告片、奖项获奖和影视消息" },
  { id: "gaming", label: "游戏圈", icon: "▣", description: "新作、电竞、厂商动态" },
  { id: "podcast_speech", label: "人物访谈/演讲", icon: "◉", description: "播客、演讲、公开访谈" },
  { id: "china_entertainment", label: "娱乐圈", icon: "◎", description: "国内外出圈消息和争议" },
  { id: "meme", label: "网络热梗", icon: "#", description: "来源、含义、传播平台" },
  { id: "sports", label: "体育突破", icon: "▲", description: "冠军、纪录、奖项" },
  { id: "obituary", label: "名人讣闻", icon: "◇", description: "去世消息与代表成就" }
];

const newsVideoSources = [
  { publisher: "Associated Press", title: "AP 新闻视频", url: "https://www.youtube.com/@AssociatedPress/videos" },
  { publisher: "AFP", title: "AFP 新闻视频", url: "https://www.youtube.com/@AFP/videos" },
  { publisher: "Guardian News", title: "Guardian News 视频", url: "https://www.youtube.com/@guardiannews/videos" },
  { publisher: "Channel 4 News", title: "Channel 4 News 视频", url: "https://www.youtube.com/@Channel4News/videos" },
  { publisher: "CNN-News18", title: "CNN-News18 视频", url: "https://www.youtube.com/@cnnnews18/videos" },
  { publisher: "FOX 9", title: "FOX 9 新闻视频", url: "https://www.youtube.com/fox9/videos" },
  { publisher: "X", title: "X 相关讨论", url: "https://x.com/search?q=%E7%83%AD%E9%97%A8%E6%83%85%E6%8A%A5%E7%AB%99&src=typed_query&f=live" },
  { publisher: "Instagram", title: "Instagram 相关图片/视频", url: "https://www.instagram.com/explore/tags/news/" }
];

const domesticNewsSources = [
  { publisher: "微博", title: "微博实时讨论", url: "https://weibo.com/" },
  { publisher: "小红书", title: "小红书相关笔记", url: "https://www.xiaohongshu.com/" },
  { publisher: "抖音精选", title: "抖音精选", url: "https://www.douyin.com/jingxuan" },
  { publisher: "抖音新闻源 1", title: "抖音重点账号", url: "https://www.douyin.com/user/MS4wLjABAAAAxA44mxJVod_Aq5wc0cZrbZHJ2S_DnoJctGpb_mOvsxs" },
  { publisher: "抖音新闻源 2", title: "抖音重点账号", url: "https://www.douyin.com/user/MS4wLjABAAAA8U_l6rBzmy7bcy6xOJel4v0RzoR_wfAubGPeJimN__4" },
  { publisher: "抖音新闻源 3", title: "抖音重点账号", url: "https://www.douyin.com/user/MS4wLjABAAAAGWFEyl_NuLBGlV43HPIjpq__gw2xt7FzeoxJk_P5kVc" },
  { publisher: "B站新闻源 1", title: "B站视频源", url: "https://space.bilibili.com/456664753/video" },
  { publisher: "B站新闻源 2", title: "B站视频源", url: "https://space.bilibili.com/1131457022/video" },
  { publisher: "B站新闻源 3", title: "B站视频源", url: "https://space.bilibili.com/433587902/video" },
  { publisher: "B站新闻源 4", title: "B站视频源", url: "https://space.bilibili.com/20165629/video" },
  { publisher: "B站新闻源 5", title: "B站视频源", url: "https://space.bilibili.com/423264599/video" },
  { publisher: "B站新闻源 6", title: "B站视频源", url: "https://space.bilibili.com/1442396399/video" },
  { publisher: "B站新闻源 7", title: "B站视频源", url: "https://space.bilibili.com/423429083/video" },
  { publisher: "B站新闻源 8", title: "B站视频源", url: "https://space.bilibili.com/473837611/video" },
  { publisher: "B站新闻源 9", title: "B站视频源", url: "https://space.bilibili.com/569956690/video" },
  { publisher: "B站新闻源 10", title: "B站视频源", url: "https://space.bilibili.com/104092224/video" },
  { publisher: "百度热搜", title: "百度实时热榜", url: "https://top.baidu.com/board?tab=realtime&sa=fyb_realtime_31065" },
  { publisher: "央视新闻", title: "央视新闻", url: "https://news.cctv.com/" },
  { publisher: "新华网四川", title: "新华网地方频道", url: "http://www.sc.xinhuanet.com/index.htm" },
  { publisher: "中国新闻网", title: "中国新闻网", url: "https://www.chinanews.com.cn/" },
  { publisher: "新浪新闻", title: "新浪新闻", url: "https://news.sina.com.cn/" },
  { publisher: "百度新闻", title: "百度新闻", url: "https://news.baidu.com/" },
  { publisher: "人民号", title: "人民号", url: "https://www.peopleapp.com/home?a=" },
  { publisher: "腾讯新闻", title: "腾讯新闻", url: "https://news.qq.com/" }
];

const trailerSources = [
  { publisher: "Warner Bros. Pictures", url: "https://www.youtube.com/channel/UCF9imwPMSGz4Vq1NiTWCC7g/videos" },
  { publisher: "Universal Pictures", url: "https://www.youtube.com/@UniversalPictures/videos" },
  { publisher: "Paramount Pictures", url: "https://www.youtube.com/channel/UCiifkYAs_bq1pt_zbNAzYGg/videos" },
  { publisher: "Sony Pictures", url: "https://www.youtube.com/channel/UCjmJDM5pRKbUlVIzDYYWb6g/videos" },
  { publisher: "Pixar", url: "https://www.youtube.com/@pixar/videos" },
  { publisher: "HBO Max", url: "https://www.youtube.com/@hbomax/videos" },
  { publisher: "Netflix", url: "https://www.youtube.com/@Netflix/videos" },
  { publisher: "Marvel Entertainment", url: "https://www.youtube.com/channel/UCvC4D8onUfXzvjTOM-dBfEA/videos" },
  { publisher: "Disney Plus", url: "https://www.youtube.com/channel/UCz97F7dMxBNOfGYu3rx8aCw/videos" },
  { publisher: "Disney", url: "https://www.youtube.com/@Disney/videos" },
  { publisher: "A24", url: "https://www.youtube.com/@A24/videos" },
  { publisher: "20th Century Studios", url: "https://www.youtube.com/@20thCenturyStudios/videos" },
  { publisher: "Apple TV", url: "https://www.youtube.com/@AppleTV/videos" },
  { publisher: "哔哩哔哩预告源 1", url: "https://space.bilibili.com/32708626/video" },
  { publisher: "哔哩哔哩预告源 2", url: "https://space.bilibili.com/8465957/video" },
  { publisher: "哔哩哔哩预告源 3", url: "https://space.bilibili.com/14235376/video" },
  { publisher: "哔哩哔哩预告源 4", url: "https://space.bilibili.com/652239032/video" },
  { publisher: "6huo", url: "https://www.6huo.com/" }
];

const awardNames = [
  "华表奖",
  "飞天奖",
  "微博视界大会",
  "金鸡奖",
  "百花奖",
  "金像奖",
  "金马奖",
  "金鹰奖",
  "白玉兰奖",
  "金爵奖",
  "金棕榈奖",
  "金狮奖",
  "金熊奖",
  "奥斯卡金像奖",
  "美国电影电视金球奖",
  "艾美奖",
  "英国电影和电视艺术学院奖"
];

const items = [
  {
    id: "major-1",
    date: "2026-05-19",
    channel: "major_news",
    section: "国外",
    titleZh: "美国商务部与欧盟委员会同日讨论港口和芯片供应链安全审查",
    summaryZh: "2026年5月19日，美国华盛顿和比利时布鲁塞尔的监管部门围绕半导体设备、港口调度系统和云服务供应商开展新一轮安全审查讨论。",
    whyItMatters: "审查对象涉及港口物流和芯片设备，会影响跨国科技企业、港口运营商和云服务采购的合规成本。",
    regions: ["美国华盛顿", "比利时布鲁塞尔", "东亚供应链"],
    people: ["美国商务部官员", "欧盟委员会官员", "港口运营商"],
    platforms: ["美国商务部", "欧盟委员会", "AP"],
    importanceScore: 94,
    confidence: "confirmed",
    detailBlocks: [
      "时间和地点：2026年5月19日，美国华盛顿与比利时布鲁塞尔的监管机构同步推进供应链安全讨论，重点落在半导体设备、港口调度系统和云服务供应商。",
      "具体发生了什么：监管部门要求相关企业说明关键软硬件供应商、远程维护权限和数据存储安排。港口系统被单独列出，是因为调度系统一旦中断会影响集装箱装卸、海关放行和跨境运输。",
      "涉及对象：美国商务部、欧盟委员会、半导体设备企业、港口运营商、云服务供应商和东亚零部件供应链。当前消息来自通讯社报道和监管议程信息。",
      "后续观察：需要继续看正式审查清单是否公布、是否有企业被要求整改，以及这些规则是否影响云服务合同和港口系统采购。"
    ],
    sources: [
      { publisher: "Reuters", title: "Supply chain security rules widen", url: "https://www.reuters.com/search/news?blob=supply%20chain%20security%20rules", publishedAt: "2026-05-19 06:20" },
      { publisher: "AP", title: "Governments review critical infrastructure suppliers", url: "https://www.youtube.com/@AssociatedPress/search?query=supply%20chain%20security", publishedAt: "2026-05-19 07:10" }
    ]
  },
  {
    id: "major-2",
    date: "2026-05-19",
    channel: "major_news",
    section: "国外",
    titleZh: "印度东北部阿萨姆邦发布强降雨和洪水预警，古瓦哈提部分道路积水",
    summaryZh: "2026年5月19日清晨，印度东北部阿萨姆邦气象部门发布强降雨预警，古瓦哈提低洼路段出现积水，铁路和供电维护部门进入应急值守。",
    whyItMatters: "阿萨姆邦处于雨季灾害高发区，交通、供电和粮食运输中断会影响周边地区居民生活和物资流通。",
    regions: ["印度阿萨姆邦", "古瓦哈提"],
    people: ["阿萨姆邦气象部门", "铁路维护人员", "供电抢修人员"],
    platforms: ["气象机构", "Guardian News", "本地媒体"],
    importanceScore: 88,
    confidence: "developing",
    detailBlocks: [
      "时间和地点：2026年5月19日清晨，印度东北部阿萨姆邦发布强降雨和洪水预警，首府古瓦哈提部分低洼道路出现积水。",
      "具体发生了什么：气象部门提示短时强降雨可能引发城市内涝和山体滑坡，铁路、公路和供电部门安排值守人员处理交通延误、树木倒伏和局部停电。",
      "涉及对象：阿萨姆邦居民、通勤人群、铁路运营方、供电公司和地方应急部门。当前信息仍在发展中，需要等待官方灾情通报。",
      "后续观察：关注降雨是否扩大到布拉马普特拉河沿岸地区、铁路班次是否取消、低洼区域是否需要转移居民。"
    ],
    sources: [
      { publisher: "National Weather Agency", title: "Flood alerts issued", url: "https://public.wmo.int/", publishedAt: "2026-05-19 05:40" },
      { publisher: "Guardian News", title: "Heavy rain disrupts transit", url: "https://www.youtube.com/@guardiannews/search?query=flood%20rain%20transit", publishedAt: "2026-05-19 08:12" }
    ]
  },
  {
    id: "major-cn-1",
    date: "2026-05-19",
    channel: "major_news",
    section: "国内",
    titleZh: "成都发布强对流天气提醒，交警和地铁同步更新早高峰出行提示",
    summaryZh: "2026年5月19日早上，成都气象和交通相关账号围绕强对流天气、早高峰道路积水和地铁接驳发布提醒，微博、抖音、百度热搜等平台出现集中讨论。",
    whyItMatters: "强降雨会影响成都早高峰通勤、学校到校安排、外卖和快递配送，也考验城市排水与交通疏导能力。",
    regions: ["中国四川成都"],
    people: ["成都气象部门", "成都交警", "成都地铁运营方"],
    platforms: ["微博", "抖音", "B站", "央视新闻", "百度热搜"],
    importanceScore: 90,
    confidence: "confirmed",
    detailBlocks: [
      "时间和地点：2026年5月19日早上，四川成都出现强对流天气提醒，通勤时段的道路积水、公交接驳和地铁站外排队成为平台讨论重点。",
      "具体发生了什么：成都气象部门发布天气提醒，成都交警和地铁运营相关信息提示市民关注积水路段、提前规划出行时间。微博、百度热搜、抖音和B站视频源同步出现现场画面和出行建议。",
      "涉及对象：成都气象部门、成都交警、成都地铁运营方、早高峰通勤人群、学校和配送平台。当前消息以官方提醒和平台现场视频交叉验证。",
      "后续观察：重点看预警级别是否升级、低洼路段是否临时管控、地铁接驳是否调整，以及晚高峰前是否发布新的交通提示。"
    ],
    sources: [
      { publisher: "央视新闻", title: "强对流天气与出行提醒", url: "https://news.cctv.com/search/?q=强对流天气%20出行提醒", publishedAt: "2026-05-19 07:30" },
      { publisher: "百度热搜", title: "实时热榜相关话题", url: "https://top.baidu.com/board?tab=realtime&sa=fyb_realtime_31065", publishedAt: "2026-05-19 08:00" },
      { publisher: "微博", title: "微博实时讨论", url: "https://s.weibo.com/weibo?q=强对流天气%20交通", publishedAt: "2026-05-19 08:20" },
      { publisher: "腾讯新闻", title: "城市交通保障相关报道", url: "https://news.qq.com/search?query=强对流天气%20交通保障", publishedAt: "2026-05-19 08:45" }
    ]
  },
  {
    id: "tech-1",
    date: "2026-05-19",
    channel: "digital_tech",
    titleZh: "OPPO 在深圳发布端侧 AI 影像功能，主打离线修图和视频增强",
    summaryZh: "2026年5月19日，OPPO 在深圳新品沟通会上展示端侧多模态影像能力，强调离线主体识别、视频增强和本地隐私保护。",
    whyItMatters: "端侧 AI 正从发布会卖点变成高端手机的核心竞争指标，也会影响芯片、模型压缩和手机影像团队投入。",
    regions: ["中国深圳", "全球手机市场"],
    people: ["OPPO 产品团队", "手机影像用户"],
    platforms: ["发布会", "The Verge", "36Kr"],
    importanceScore: 81,
    confidence: "confirmed",
    detailBlocks: [
      "时间和地点：2026年5月19日，OPPO 在深圳新品沟通会上展示端侧 AI 影像功能。",
      "具体发生了什么：发布内容围绕离线修图、主体识别、视频增强和隐私保护展开，强调部分处理可以在手机本地完成，不必把素材上传到云端。",
      "涉及对象：OPPO 产品和影像团队、移动芯片供应链、关注拍摄和隐私的高端手机用户。",
      "后续观察：需要关注功能是否只在旗舰机型上线、是否依赖特定芯片，以及实际离线处理速度和画质是否达到发布会效果。"
    ],
    sources: [
      { publisher: "The Verge", title: "Phone makers push on-device AI", url: "https://www.theverge.com/search?q=on-device%20AI%20phone", publishedAt: "2026-05-19 09:00" },
      { publisher: "36Kr", title: "端侧 AI 成为手机新品重点", url: "https://36kr.com/search/articles/端侧AI手机", publishedAt: "2026-05-19 09:20" }
    ]
  },
  {
    id: "tech-2",
    date: "2026-05-19",
    channel: "digital_tech",
    titleZh: "热门开源模型项目更新许可证，开发者围绕商用限制和蒸馏条款争论",
    summaryZh: "2026年5月19日，GitHub 上一个热门开源模型项目更新许可证，新增商用限制和模型蒸馏条款，开发者在 issue 区集中讨论。",
    whyItMatters: "许可证变动会直接影响创业公司、开发者工具、模型微调服务和下游 API 产品。",
    regions: ["全球"],
    platforms: ["GitHub", "开发者社区"],
    importanceScore: 76,
    confidence: "developing",
    detailBlocks: [
      "时间和地点：2026年5月19日，争议首先出现在 GitHub 项目的许可证更新和 issue 讨论区。",
      "具体发生了什么：项目维护者新增商用限制和模型蒸馏相关条款，开发者担心已有二次开发、微调模型和企业部署是否需要重新授权。",
      "涉及对象：项目维护者、使用该模型的创业公司、开源社区开发者和企业法务团队。",
      "后续观察：需要看维护者是否发布 FAQ、是否回滚条款，以及下游项目是否迁移到其他许可证更清晰的模型。"
    ],
    sources: [
      { publisher: "GitHub", title: "License discussion thread", url: "https://github.com/", publishedAt: "2026-05-19 04:48" }
    ]
  },
  {
    id: "film-1",
    date: "2026-05-19",
    channel: "film_awards",
    section: "消息类",
    awardName: "金棕榈奖",
    titleZh: "戛纳电影节主竞赛单元公布首批获奖结果，获奖导演发表英文致谢",
    summaryZh: "2026年5月19日，法国戛纳电影节主竞赛单元公布首批奖项，评审团奖、最佳编剧和新人演员奖率先揭晓。",
    whyItMatters: "戛纳获奖名单通常会影响后续院线发行、流媒体采购、国际版权交易和颁奖季声量。",
    regions: ["欧洲", "全球"],
    people: ["电影导演", "演员"],
    platforms: ["电影节官网", "行业媒体"],
    importanceScore: 78,
    confidence: "confirmed",
    detailBlocks: [
      "时间和地点：2026年5月19日，法国戛纳电影节主竞赛单元公布首批获奖结果。",
      "具体发生了什么：评审团奖、最佳编剧和新人演员奖率先揭晓，现场获奖者在颁奖礼上发表英文致谢，片方随后进入国际发行和版权洽谈阶段。",
      "涉及对象：戛纳电影节评审团、获奖导演、演员、国际发行商和流媒体采购团队。",
      "后续观察：关注获奖影片是否公布北美、欧洲和中国内地发行计划，以及获奖发言是否在社交平台形成二次传播。"
    ],
    awardVideo: {
      title: "颁奖礼获奖片段",
      url: "https://www.youtube.com/@AFP/search?query=festival%20award%20speech"
    },
    transcript: {
      language: "en",
      original: "Thank you to the jury, to the cast, and to everyone who believed this story could travel beyond borders.",
      zh: "感谢评审团，感谢演员们，也感谢所有相信这个故事可以跨越边界的人。"
    },
    sources: [
      { publisher: "Festival Official", title: "Awards announcement", url: "https://www.festival-cannes.com/en/festival/awards/", publishedAt: "2026-05-19 02:12" },
      { publisher: "Variety", title: "Festival winners draw buyers", url: "https://variety.com/search/festival%20winners/", publishedAt: "2026-05-19 03:30" }
    ]
  },
  {
    id: "film-2",
    date: "2026-05-19",
    channel: "film_awards",
    section: "预告片",
    titleZh: "Warner、Netflix 与 B站预告源同日更新新片预告",
    summaryZh: "2026年5月19日，Warner Bros. Pictures、Netflix 和 B站影视预告账号更新新预告片，覆盖院线电影、流媒体剧集和动画项目。",
    whyItMatters: "预告片发布节奏常直接影响社媒热度、预售启动和后续宣发窗口。",
    regions: ["全球"],
    people: ["片方", "主演"],
    platforms: ["YouTube", "B站", "6huo"],
    heatScore: 85,
    confidence: "confirmed",
    detailBlocks: [
      "时间和地点：2026年5月19日，多个片方官方 YouTube 频道与 B站影视预告账号发布新预告片。",
      "具体发生了什么：Warner Bros. Pictures、Netflix 和 B站预告源集中更新，内容覆盖院线新片、流媒体剧集和动画项目。",
      "涉及对象：片方宣发团队、主演、平台订阅用户、院线观众和影视媒体。",
      "后续观察：关注预告片播放量、评论区高频关键词、是否同步开启预售或定档，以及中文平台是否出现二创剪辑。"
    ],
    trailerSources: trailerSources.slice(0, 8),
    sources: [
      { publisher: "Warner Bros. Pictures", title: "New trailers feed", url: "https://www.youtube.com/channel/UCF9imwPMSGz4Vq1NiTWCC7g/videos", publishedAt: "2026-05-19 09:15" },
      { publisher: "Netflix", title: "Latest official trailers", url: "https://www.youtube.com/@Netflix/videos", publishedAt: "2026-05-19 09:40" },
      { publisher: "哔哩哔哩预告源", title: "今日新预告片", url: "https://space.bilibili.com/32708626/video", publishedAt: "2026-05-19 10:00" }
    ]
  },
  {
    id: "gaming-1",
    date: "2026-05-19",
    channel: "gaming",
    titleZh: "《英雄联盟》季中冠军赛决赛刷新本赛季在线观看峰值",
    summaryZh: "2026年5月19日，《英雄联盟》季中冠军赛决赛在欧洲赛区收官，冠军队伍完成让二追三，赛事统计平台公布峰值观看人数刷新本赛季纪录。",
    whyItMatters: "电竞赛事观看数据会影响赞助报价、版权谈判、俱乐部商业估值和选手转会热度。",
    regions: ["全球"],
    people: ["冠军战队", "决赛 MVP", "赛事主办方"],
    platforms: ["Twitch", "YouTube", "哔哩哔哩"],
    importanceScore: 72,
    confidence: "confirmed",
    detailBlocks: [
      "时间和地点：2026年5月19日，《英雄联盟》季中冠军赛决赛在欧洲赛区收官。",
      "具体发生了什么：冠军队伍在 BO5 决赛中完成让二追三，决胜局后官方公布冠军和 MVP，赛事统计平台同步更新峰值观看人数。",
      "涉及对象：冠军战队、决赛 MVP、赛事主办方、直播平台、赞助商和俱乐部管理层。",
      "后续观察：关注冠军皮肤、选手转会传闻、赛事回放播放量，以及赞助商是否追加季后宣传。"
    ],
    sources: [
      { publisher: "Esports Charts", title: "Final sets season record", url: "https://escharts.com/", publishedAt: "2026-05-19 01:20" },
      { publisher: "IGN", title: "Final comeback stuns fans", url: "https://www.ign.com/", publishedAt: "2026-05-19 06:50" }
    ]
  },
  {
    id: "podcast-1",
    date: "2026-05-19",
    channel: "podcast_speech",
    titleZh: "Anthropic CEO Dario Amodei 在 YouTube 长访谈中谈企业级智能体权限和审计",
    summaryZh: "2026年5月19日，Anthropic CEO Dario Amodei 参加 YouTube 长访谈，重点谈企业部署智能体时的权限边界、审计机制和失败回滚。",
    whyItMatters: "这类公开访谈常成为行业判断产品路线和监管压力的信号。",
    regions: ["美国", "全球"],
    people: ["Dario Amodei", "播客主持人", "企业 IT 负责人"],
    platforms: ["Podcast", "YouTube"],
    importanceScore: 80,
    confidence: "confirmed",
    detailBlocks: [
      "时间和地点：2026年5月19日，访谈在 YouTube 和播客平台发布，面向全球开发者和企业技术团队。",
      "具体发生了什么：Anthropic CEO Dario Amodei 围绕企业级智能体的权限管理、审计日志、失败回滚和人工审批节点展开说明。",
      "涉及对象：Dario Amodei、播客主持人、企业 IT 负责人、安全团队和开发者社区。",
      "后续观察：关注访谈中提到的产品能力是否进入正式发布、企业客户是否采用，以及监管机构是否关注智能体权限边界。"
    ],
    transcript: {
      language: "en",
      original: "Enterprise agents need clear permissions, audit trails, and a way for teams to reverse mistakes quickly.",
      zh: "企业级智能体需要清晰的权限、审计记录，以及让团队快速回滚错误的机制。"
    },
    sources: [
      { publisher: "Podcast RSS", title: "Founder interview episode", url: "https://podcasts.apple.com/search?term=AI%20founder%20enterprise%20agents", publishedAt: "2026-05-19 07:00" },
      { publisher: "YouTube", title: "Full conversation video", url: "https://www.youtube.com/results?search_query=AI+founder+enterprise+agents+interview", publishedAt: "2026-05-19 07:05" }
    ]
  },
  {
    id: "ent-1",
    date: "2026-05-19",
    channel: "china_entertainment",
    section: "国内娱乐圈",
    titleZh: "国产剧《长风渡海》主演李然回应角色台词争议",
    summaryZh: "2026年5月19日，国产剧《长风渡海》一段角色台词在微博、抖音和小红书扩散，主演李然在采访中回应角色选择争议。",
    whyItMatters: "该事件已从剧粉圈层扩散到泛娱乐讨论区，可能影响剧集长尾热度。",
    regions: ["中国"],
    people: ["李然", "《长风渡海》剧组"],
    platforms: ["微博", "抖音", "小红书"],
    heatScore: 87,
    confidence: "developing",
    detailBlocks: [
      "时间和地点：2026年5月19日，争议从微博和抖音的剧集切片扩散到小红书讨论区。",
      "具体发生了什么：国产剧《长风渡海》中一段角色台词被大量二创，观众围绕角色动机和台词合理性争论。主演李然在采访中回应称角色选择服务于后续剧情。",
      "涉及对象：主演李然、《长风渡海》剧组、剧粉、短视频二创账号和娱乐媒体。",
      "后续观察：关注剧方是否放出后续剧情解释、主演回应是否被二次剪辑，以及争议是否影响剧集评分和热度。"
    ],
    sources: [
      { publisher: "新浪娱乐", title: "主演回应角色争议", url: "https://ent.sina.com.cn/", publishedAt: "2026-05-19 10:00" },
      { publisher: "微博热搜", title: "剧集台词相关话题升温", url: "https://weibo.com/", publishedAt: "2026-05-19 10:22" }
    ]
  },
  {
    id: "ent-2",
    date: "2026-05-19",
    channel: "china_entertainment",
    section: "国外娱乐圈",
    titleZh: "Netflix 剧集《北岸档案》主创在播客中透露第二季角色走向",
    summaryZh: "2026年5月19日，Netflix 剧集《北岸档案》主创参加播客访谈，谈到第二季角色关系变化，主演随后回应粉丝猜测。",
    whyItMatters: "该话题已从剧集粉丝社区扩散到海外娱乐媒体和短视频切片。",
    regions: ["北美", "全球"],
    people: ["《北岸档案》主创", "主演 Amelia Hart"],
    platforms: ["Podcast", "X", "Instagram"],
    heatScore: 82,
    confidence: "developing",
    detailBlocks: [
      "时间和地点：2026年5月19日，Netflix 剧集《北岸档案》主创在一档海外影视播客中谈到第二季创作方向。",
      "具体发生了什么：主创透露第二季会调整两位核心角色的关系线，主演 Amelia Hart 随后在采访中回应粉丝猜测，相关切片在 X 和 Instagram 上扩散。",
      "涉及对象：《北岸档案》主创、主演 Amelia Hart、Netflix 宣发团队和海外剧迷社区。",
      "后续观察：关注 Netflix 是否发布正式预告、演员是否继续回应，以及粉丝讨论是否转化为剧集预约和播放热度。"
    ],
    sources: [
      { publisher: "Variety", title: "Showrunner teases next season", url: "https://variety.com/", publishedAt: "2026-05-19 08:40" },
      { publisher: "Deadline", title: "Cast responds to fan theories", url: "https://deadline.com/", publishedAt: "2026-05-19 09:12" }
    ]
  },
  {
    id: "meme-1",
    date: "2026-05-19",
    channel: "meme",
    titleZh: "访谈切片带火“先别急着定义我”热梗",
    summaryZh: "2026年5月19日，一段人物访谈切片在抖音和微博扩散，“先别急着定义我”被用于回应身份标签、职场评价和粉圈争论。",
    whyItMatters: "热梗开始进入品牌评论区和直播话术，说明已越过单一平台圈层。",
    regions: ["中国"],
    platforms: ["抖音", "微博", "小红书", "B站"],
    heatScore: 91,
    confidence: "confirmed",
    detailBlocks: [
      "时间和地点：2026年5月19日，热梗首先在抖音访谈切片评论区集中出现，随后扩散到微博、小红书和B站。",
      "具体发生了什么：受访者在回答身份标签问题时说出“先别急着定义我”，网友把这句话用于职场评价、MBTI 标签和粉圈争论场景。",
      "涉及对象：原访谈发布账号、二创账号、品牌评论区运营和参与讨论的普通用户。",
      "后续观察：关注该句式是否进入品牌文案、直播话术和更多二创模板，以及原访谈是否发布完整版本。"
    ],
    sources: [
      { publisher: "抖音热点", title: "相关话题视频集中上榜", url: "https://www.douyin.com/", publishedAt: "2026-05-19 09:30" },
      { publisher: "微博", title: "相关话题讨论增长", url: "https://weibo.com/", publishedAt: "2026-05-19 10:12" }
    ]
  },
  {
    id: "sports-1",
    date: "2026-05-19",
    channel: "sports",
    titleZh: "意大利网球新星 Luca Ferri 首次闯入法网四强",
    summaryZh: "2026年5月19日，意大利选手 Luca Ferri 在法国网球公开赛男单四分之一决赛五盘取胜，首次进入大满贯四强。",
    whyItMatters: "大满贯突破会显著改变选手排名、商业赞助和国家队关注度。",
    regions: ["欧洲"],
    people: ["Luca Ferri", "对手 Carlos Mendes"],
    platforms: ["赛事官网", "体育媒体"],
    importanceScore: 79,
    confidence: "confirmed",
    detailBlocks: [
      "时间和地点：2026年5月19日，法国巴黎罗兰·加洛斯球场进行法网男单四分之一决赛。",
      "具体发生了什么：意大利新星 Luca Ferri 与 Carlos Mendes 打满五盘后取胜，首次进入大满贯四强，刷新个人最佳大满贯战绩。",
      "涉及对象：Luca Ferri、Carlos Mendes、赛事官方、赞助商和意大利网球协会。",
      "后续观察：关注半决赛对手、世界排名变化、赞助合约，以及意大利媒体对其国家队前景的评价。"
    ],
    sources: [
      { publisher: "Tournament Official", title: "Semifinal result", url: "https://www.atptour.com/", publishedAt: "2026-05-19 02:55" },
      { publisher: "ESPN", title: "Rising star reaches first major semifinal", url: "https://www.espn.com/", publishedAt: "2026-05-19 03:10" }
    ]
  },
  {
    id: "obit-1",
    date: "2026-05-19",
    channel: "obituary",
    titleZh: "今日10:00名人讣闻监测：暂无重大影响力人物去世的双源确认",
    summaryZh: "2026年5月19日10:00，讣闻频道完成一次例行检查，暂未发现符合“重大国际影响力、国内外高知名度或国内家喻户晓”标准且已双源确认的新增讣闻。",
    whyItMatters: "讣闻信息容易被误传，未获得官方、家属、机构或两家可靠媒体确认前不进入正式消息流。",
    regions: ["全球", "中国"],
    people: ["讣闻监测名单"],
    platforms: ["官方声明", "媒体讣闻", "通讯社"],
    prominence: "暂无符合高影响力标准且双源确认的新增讣闻",
    importanceScore: 60,
    confidence: "confirmed",
    detailBlocks: [
      "时间和地点：2026年5月19日10:00，北京时间，名人讣闻频道完成一次例行信息检查。",
      "具体发生了什么：系统检查官方声明、家属/机构公告、通讯社、主流媒体讣闻页和社交平台高传播消息，暂未发现符合收录标准且已双源确认的新增讣闻。",
      "涉及对象：国际重大影响力人物、国内外高知名度人物、国内家喻户晓人物，以及相关家属、机构和媒体发布渠道。",
      "后续观察：如果后续出现官方或家属确认，并被至少两家可靠来源交叉验证，系统会生成单独讣闻条目，附上代表成就、确认来源和纪念报道。"
    ],
    sources: [
      { publisher: "The Guardian Obituaries", title: "讣闻页检查", url: "https://www.theguardian.com/tone/obituaries", publishedAt: "2026-05-19 10:00" },
      { publisher: "AP", title: "AP 人物消息检查", url: "https://apnews.com/search?q=obituary", publishedAt: "2026-05-19 10:00" }
    ]
  }
];

const historyItems = [
  {
    id: "hist-major-1",
    date: "2026-05-18",
    channel: "major_news",
    section: "国外",
    titleZh: "德国、法国和意大利能源部长在布鲁塞尔讨论夏季电力供应压力",
    summaryZh: "2026年5月18日，德国、法国和意大利能源部长在布鲁塞尔会谈，讨论高温季节电网稳定、天然气储备和跨境电力调度。",
    whyItMatters: "能源供应压力会影响制造业排产、居民用电和大宗商品价格预期。",
    regions: ["比利时布鲁塞尔", "德国", "法国", "意大利"],
    people: ["德国能源部长", "法国能源部长", "意大利能源部长"],
    platforms: ["欧盟能源会议", "通讯社"],
    importanceScore: 86,
    confidence: "confirmed",
    detailBlocks: [
      "时间和地点：2026年5月18日，德国、法国和意大利能源部长在比利时布鲁塞尔举行能源供应协调会议。",
      "具体发生了什么：会议讨论夏季高温期间电网稳定、天然气储备和跨境电力调度，目标是在用电高峰前明确应急容量共享方式。",
      "涉及对象：三国能源部门、欧盟能源协调机构、电网运营商、制造业企业和居民用户。",
      "后续观察：关注是否公布联合储备计划、跨境电力交易安排和高耗能企业错峰生产建议。"
    ],
    sources: [
      { publisher: "Reuters", title: "Energy ministers discuss summer power demand", url: "https://www.reuters.com/", publishedAt: "2026-05-18 07:20" },
      { publisher: "Bloomberg", title: "Grid pressure rises before summer", url: "https://www.bloomberg.com/", publishedAt: "2026-05-18 08:05" }
    ]
  },
  {
    id: "hist-tech-1",
    date: "2026-05-18",
    channel: "digital_tech",
    titleZh: "AWS、Google Cloud 与 Azure 下调 AI 推理服务价格",
    summaryZh: "2026年5月18日，AWS、Google Cloud 与 Azure 更新 AI 推理服务定价，长上下文请求和批处理场景降幅明显。",
    whyItMatters: "推理价格下降会影响 AI 应用毛利、模型选择和企业部署节奏。",
    regions: ["全球"],
    people: ["云服务产品团队", "AI 应用开发者"],
    platforms: ["AWS", "Google Cloud", "Azure", "开发者社区"],
    importanceScore: 84,
    confidence: "confirmed",
    detailBlocks: [
      "时间和地点：2026年5月18日，AWS、Google Cloud 与 Azure 在各自云服务页面更新 AI 推理服务价格。",
      "具体发生了什么：长上下文请求、批处理推理和部分高并发场景的单价下调，开发者社区开始重新计算应用成本。",
      "涉及对象：云厂商、AI 应用创业公司、企业采购团队和开发者。",
      "后续观察：关注价格战是否扩大到模型托管、向量数据库和 Agent 平台服务。"
    ],
    sources: [
      { publisher: "TechCrunch", title: "Cloud AI inference pricing shifts", url: "https://techcrunch.com/", publishedAt: "2026-05-18 06:40" },
      { publisher: "InfoQ", title: "AI inference cost drops", url: "https://www.infoq.com/", publishedAt: "2026-05-18 10:22" }
    ]
  },
  {
    id: "hist-ent-1",
    date: "2026-05-17",
    channel: "china_entertainment",
    section: "国内娱乐圈",
    titleZh: "《周末音乐会》嘉宾周遥和陈嘉宁即兴合唱登上微博热搜",
    summaryZh: "2026年5月17日晚，《周末音乐会》播出周遥和陈嘉宁即兴合唱片段，相关音乐片段和舞台造型在微博、抖音、B站扩散。",
    whyItMatters: "内容从节目粉丝圈层扩散到泛娱乐平台，形成短期传播高峰。",
    regions: ["中国"],
    people: ["周遥", "陈嘉宁", "《周末音乐会》节目组"],
    platforms: ["微博", "抖音", "B站"],
    heatScore: 88,
    confidence: "confirmed",
    detailBlocks: [
      "时间和地点：2026年5月17日晚，《周末音乐会》播出一期舞台合作内容。",
      "具体发生了什么：嘉宾周遥和陈嘉宁在节目中即兴合唱，片段播出后被观众剪成短视频，登上微博热搜并在 B站出现二创版本。",
      "涉及对象：周遥、陈嘉宁、节目组、音乐平台和二创账号。",
      "后续观察：关注节目组是否放出完整版舞台、歌曲是否上线音乐平台，以及嘉宾是否安排后续合作。"
    ],
    sources: [
      { publisher: "微博热搜", title: "综艺舞台话题升温", url: "https://weibo.com/", publishedAt: "2026-05-17 21:10" },
      { publisher: "新浪娱乐", title: "嘉宾回应舞台合作", url: "https://ent.sina.com.cn/", publishedAt: "2026-05-17 22:18" }
    ]
  },
  {
    id: "hist-sports-1",
    date: "2026-05-16",
    channel: "sports",
    titleZh: "中国短跑选手林雨晴在上海国际田径赛刷新女子100米赛会纪录",
    summaryZh: "2026年5月16日，林雨晴在上海国际田径赛女子100米决赛中跑出赛会最佳成绩，并获得年度总决赛资格。",
    whyItMatters: "纪录突破提升其国际排名，也改变后续大赛夺牌预期。",
    regions: ["中国上海"],
    people: ["林雨晴"],
    platforms: ["赛事官网", "体育媒体"],
    importanceScore: 77,
    confidence: "confirmed",
    detailBlocks: [
      "时间和地点：2026年5月16日，上海国际田径赛女子100米决赛在上海举行。",
      "具体发生了什么：中国短跑选手林雨晴跑出赛会最佳成绩，刷新女子100米赛会纪录，并获得年度总决赛资格。",
      "涉及对象：林雨晴、赛事官方、中国田径队和赞助商。",
      "后续观察：关注她的世界排名变化、年度总决赛分组和国家队备战安排。"
    ],
    sources: [
      { publisher: "World Athletics", title: "Meeting record broken", url: "https://worldathletics.org/", publishedAt: "2026-05-16 19:30" },
      { publisher: "Olympics", title: "Sprinter qualifies for final", url: "https://olympics.com/", publishedAt: "2026-05-16 20:00" }
    ]
  }
];

const emptyChannels = new Set();
const generatedItems = Array.isArray(window.HOT_INTELLIGENCE_ITEMS) ? window.HOT_INTELLIGENCE_ITEMS : [];
const allItems = [...generatedItems, ...items, ...historyItems];

const lowValueTitlePatterns = [
  /来源池已检查|等待可靠条目确认|自动更新暂未成功/,
  /网上有害信息举报|举报专区|网络文化经营许可证|许可证[:：]|ICP备|公网安备/,
  /0氪打金|传奇.*打金|页游|开服|礼包|福利码/,
  /在 Apple 播客上收听|Apple Podcasts 发布[:：]?在 Apple 播客/,
  /^FIFA Men$/i,
  /Book of Rules|Official Documents|Read the latest|TechCrunch$/,
  /^Tech Policy & Government/i,
  /^\d{2}:\d{2}\s/,
  /消费观察|合作空间广阔|前景令人振奋/
];

const hotSectionChannels = {
  "电影榜": ["film_awards"],
  "电视剧榜": ["film_awards"],
  "游戏热榜": ["gaming"],
  "36氪": ["digital_tech"],
  "IT之家": ["digital_tech"],
  "中关村在线": ["digital_tech"],
  "CSDN": ["digital_tech"],
  "掘金": ["digital_tech"],
  "爱范儿": ["digital_tech"],
  "虎嗅": ["digital_tech"],
  "虎扑热榜": ["sports", "meme"],
  "知乎热榜": ["meme"],
  "豆瓣热话": ["meme"],
  "豆瓣实时讨论": ["meme"],
  "抖音热榜": ["meme"],
  "快手热榜": ["meme"],
  "微博热搜": ["china_entertainment", "meme"],
  "今日头条": ["major_news"],
  "腾讯新闻": ["major_news"],
  "百度热搜": ["major_news"]
};

const state = {
  channel: "all",
  confidence: "all",
  query: "",
  dateMode: "single",
  selectedDate: "2026-05-19",
  startDate: "2026-05-19",
  endDate: "2026-05-19"
};

const confidenceLabels = {
  confirmed: "已确认",
  developing: "发展中",
  single_source: "待确认"
};

const channelById = Object.fromEntries(channels.map((channel) => [channel.id, channel]));

function init() {
  const today = getLocalDateString();
  state.selectedDate = today;
  state.startDate = today;
  state.endDate = today;

  document.getElementById("todayLabel").textContent = new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short"
  }).format(new Date());

  document.getElementById("dateInput").value = today;
  document.getElementById("startDateInput").value = today;
  document.getElementById("endDateInput").value = today;
  document.getElementById("updateStamp").textContent = `最后更新：${window.HOT_INTELLIGENCE_GENERATED_AT || "尚未运行每日更新"}`;
  document.getElementById("channelMetric").textContent = channels.filter((channel) => channel.id !== "all").length;
  renderNavigation();
  renderChannelStrip();
  renderMetrics();
  renderRegions();
  renderDomesticSourceList();
  bindControls();
  renderItems();
}

function renderNavigation() {
  const nav = document.getElementById("channelNav");
  nav.innerHTML = channels
    .map((channel) => {
      const count = getChannelCount(channel.id);
      return `
        <button class="nav-button ${state.channel === channel.id ? "active" : ""}" data-channel="${channel.id}" type="button">
          <span aria-hidden="true">${channel.icon}</span>
          <span>${channel.label}</span>
          <span class="nav-count">${count}</span>
        </button>
      `;
    })
    .join("");
}

function renderChannelStrip() {
  const strip = document.getElementById("channelStrip");
  strip.innerHTML = channels
    .filter((channel) => channel.id !== "all")
    .map((channel) => {
      const count = getChannelCount(channel.id);
      const countLabel = count ? `${count} 条` : "今日暂无可靠来源";
      return `
        <button class="channel-card ${state.channel === channel.id ? "active" : ""}" data-channel="${channel.id}" type="button">
          <span aria-hidden="true">${channel.icon}</span>
          <strong>${channel.label}</strong>
          <span>${countLabel}</span>
        </button>
      `;
    })
    .join("");
}

function renderMetrics() {
  const scopedItems = getDateScopedItems().filter(isDisplayableItem);
  document.getElementById("totalItems").textContent = scopedItems.length;
  document.getElementById("confirmedItems").textContent = scopedItems.filter((item) => item.confidence === "confirmed").length;
}

function renderRegions() {
  const regions = new Map();
  getDateScopedItems().filter(isDisplayableItem).forEach((item) => {
    (item.regions || item.platforms || []).forEach((region) => {
      regions.set(region, (regions.get(region) || 0) + 1);
    });
  });

  document.getElementById("regionList").innerHTML = [...regions.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([region, count]) => `<span class="pill">${region} · ${count}</span>`)
    .join("");
}

function renderDomesticSourceList() {
  const container = document.getElementById("domesticSourceList");
  if (!container) return;
  container.innerHTML = domesticNewsSources
    .map(
      (source) => `
        <a class="source-mini" href="${source.url}" target="_blank" rel="noreferrer">
          <strong>${source.publisher}</strong>
          <span>${source.title}</span>
        </a>
      `
    )
    .join("");
}

function bindControls() {
  document.body.addEventListener("click", (event) => {
    const channelButton = event.target.closest("[data-channel]");
    if (channelButton) {
      state.channel = channelButton.dataset.channel;
      renderNavigation();
      renderChannelStrip();
      renderItems();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const segment = event.target.closest("[data-confidence]");
    if (segment) {
      state.confidence = segment.dataset.confidence;
      document.querySelectorAll(".segment").forEach((button) => {
        button.classList.toggle("active", button.dataset.confidence === state.confidence);
      });
      renderItems();
    }

    const itemCard = event.target.closest("[data-item-id]");
    if (itemCard) {
      openDrawer(itemCard.dataset.itemId);
    }
  });

  document.body.addEventListener("keydown", (event) => {
    const itemCard = event.target.closest("[data-item-id]");
    if (itemCard && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      openDrawer(itemCard.dataset.itemId);
    }
  });

  document.getElementById("searchInput").addEventListener("input", (event) => {
    state.query = event.target.value.trim().toLowerCase();
    renderItems();
  });

  document.getElementById("dateInput").addEventListener("change", (event) => {
    if (!event.target.value) return;
    state.dateMode = "single";
    state.selectedDate = event.target.value;
    state.startDate = event.target.value;
    state.endDate = event.target.value;
    document.getElementById("startDateInput").value = event.target.value;
    document.getElementById("endDateInput").value = event.target.value;
    rerenderForDateChange();
  });

  document.getElementById("applyRange").addEventListener("click", () => {
    const start = document.getElementById("startDateInput").value;
    const end = document.getElementById("endDateInput").value;
    if (!start || !end) return;
    state.dateMode = "range";
    state.startDate = start <= end ? start : end;
    state.endDate = start <= end ? end : start;
    document.getElementById("startDateInput").value = state.startDate;
    document.getElementById("endDateInput").value = state.endDate;
    rerenderForDateChange();
  });

  document.getElementById("resetDate").addEventListener("click", () => {
    const today = getLocalDateString();
    state.dateMode = "single";
    state.selectedDate = today;
    state.startDate = today;
    state.endDate = today;
    document.getElementById("dateInput").value = today;
    document.getElementById("startDateInput").value = today;
    document.getElementById("endDateInput").value = today;
    rerenderForDateChange();
  });

  document.getElementById("closeDrawer").addEventListener("click", closeDrawer);
  document.getElementById("drawerBackdrop").addEventListener("click", closeDrawer);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDrawer();
  });
}

function renderItems() {
  const activeChannel = channelById[state.channel];
  document.getElementById("activeChannelMeta").textContent = activeChannel.description;
  document.getElementById("activeChannelTitle").textContent = activeChannel.label === "全部频道" ? "今日条目" : activeChannel.label;

  updateDateModeLabel();

  const filtered = getDateScopedItems()
    .filter((item) => state.channel === "all" || itemBelongsToChannel(item, state.channel))
    .filter(isDisplayableItem)
    .filter((item) => state.confidence === "all" || item.confidence === state.confidence)
    .filter((item) => matchesQuery(item, state.query))
    .sort(sortItems);

  document.getElementById("resultCount").textContent = `${filtered.length} 条结果`;
  document.getElementById("itemList").innerHTML = filtered.length
    ? renderFilteredItems(filtered)
    : renderEmptyState();
}

function rerenderForDateChange() {
  renderNavigation();
  renderChannelStrip();
  renderMetrics();
  renderRegions();
  renderItems();
}

function updateDateModeLabel() {
  const label = state.dateMode === "range"
    ? `${state.startDate} 至 ${state.endDate}`
    : `${state.selectedDate} 单日查看`;
  document.getElementById("dateModeLabel").textContent = label;
}

function getDateScopedItems() {
  return getDailyScopedItems();
}

function getDailyScopedItems() {
  const dailyItems = allItems;
  if (state.dateMode === "range") {
    return dailyItems.filter((item) => item.date >= state.startDate && item.date <= state.endDate);
  }
  return dailyItems.filter((item) => item.date === state.selectedDate);
}

function getChannelCount(channelId) {
  const dailyItems = getDailyScopedItems().filter(isDisplayableItem);
  if (channelId === "all") return dailyItems.length;
  return dailyItems.filter((item) => itemBelongsToChannel(item, channelId)).length;
}

function itemBelongsToChannel(item, channelId) {
  if (channelId === "all") return true;
  if (item.channel === channelId) return true;
  return getRelatedChannels(item).includes(channelId);
}

function getRelatedChannels(item) {
  if (item.channel !== "hot_rankings") return [];
  const text = [
    item.titleZh,
    item.summaryZh,
    item.whyItMatters,
    item.section,
    ...(item.platforms || []),
    ...(item.preferenceTags || [])
  ]
    .filter(Boolean)
    .join(" ");
  const channels = new Set(hotSectionChannels[item.section] || []);

  if (/世界杯|足球|篮球|NBA|CBA|欧冠|中超|女足|男足|比赛|决赛|冠军|夺冠|红牌|进球|战胜|巴西|巴拉圭|土耳其|海地|球员|裁判|体育|运动员/i.test(text)) {
    channels.add("sports");
    channels.delete("meme");
  }
  if (/电影|电视剧|剧集|短剧|综艺|动画|预告|上映|票房|导演|演员|影帝|影后|奥斯卡|金鸡|金像|金马|白玉兰|凡人修仙传|小谢尔顿/i.test(text)) {
    channels.add("film_awards");
  }
  if (/明星|艺人|内娱|娱乐圈|塌房|恋情|离婚|吴倩|白鹿|蒋勤勤|陈建斌|周杰伦|刘德华|梁朝伟|王一博|肖战|综艺/i.test(text)) {
    channels.add("china_entertainment");
  }
  if (/AI|人工智能|芯片|手机|机器人|OpenAI|Anthropic|谷歌|苹果|华为|小米|英伟达|特斯拉|航天|火箭|卫星|量子|编程|开发|GitHub|显卡|内存|DDR|产品|科技/i.test(text)) {
    channels.add("digital_tech");
  }
  if (/游戏|电竞|原神|绝区零|鸣潮|英雄联盟|王者荣耀|Steam|主机|手游|端游|发售|定档|试玩|DLC|任天堂|索尼|Xbox/i.test(text)) {
    channels.add("gaming");
    channels.delete("meme");
  }
  if (/去世|逝世|离世|病逝|讣告|讣闻|dies|dead|death/i.test(text)) {
    channels.add("obituary");
  }
  if (/访谈|播客|演讲|专访|采访|podcast|interview|speech|TED/i.test(text)) {
    channels.add("podcast_speech");
  }
  if (/爆火|刷屏|热梗|梗|名场面|出圈|争议|离谱|抽象|段子|神评|表情包|二创|网友|评论区|B站|抖音|快手|豆瓣|知乎/i.test(text)) {
    channels.add("meme");
  }
  if (/死亡|遇难|猝死|抢劫|拘捕|法院|判了|被查|通报|辟谣|暴雨|台风|地震|洪水|机场|就业|投资者|政策|国务院|习近平|中欧班列|金价|公共|安全|事故|警方|医院/i.test(text)) {
    channels.add("major_news");
  }

  channels.delete("hot_rankings");
  return [...channels];
}

function isDisplayableItem(item) {
  const title = cleanDisplayText(item.titleZh || "");
  const summary = cleanDisplayText(item.summaryZh || "");
  const isAutoGenerated = /^20\d{2}-\d{2}-\d{2}-/.test(item.id || "");
  if (lowValueTitlePatterns.some((pattern) => pattern.test(`${title} ${summary}`))) return false;
  if (!isAutoGenerated) return true;
  if ((item.preferenceTags || []).length) return true;
  const score = item.importanceScore || item.heatScore || 0;
  if (score < 70) return false;
  return hasConcreteEventSignal(item);
}

function hasConcreteEventSignal(item) {
  const text = [
    item.titleZh,
    item.summaryZh,
    item.whyItMatters,
    ...(item.detailBlocks || [])
  ]
    .filter(Boolean)
    .join(" ");
  return /死亡|遇难|爆炸|地震|洪水|枪杀|战争|冲突|制裁|总统|正式实施|新规|调查|起诉|发布|突破|首飞|冠军|夺冠|纪录|获奖|逝世|去世|爆火|热搜|出圈|争议|回应|trailer|award|winner|dies|death|record|champion|launch|breakthrough/i.test(text);
}

function getLocalDateString() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function renderFilteredItems(filtered) {
  if (state.channel === "major_news") {
    return renderSectionedItems(filtered, ["国内", "国外"]);
  }

  if (state.channel === "hot_rankings") {
    return renderSectionedItems(filtered, [
      "百度热搜",
      "电影榜",
      "电视剧榜",
      "抖音热榜",
      "微博热搜",
      "知乎热榜",
      "今日头条",
      "腾讯新闻",
      "B站综合热门",
      "B站排行榜",
      "B站聚合热榜",
      "豆瓣实时讨论",
      "豆瓣热话",
      "快手热榜",
      "虎扑热榜",
      "游戏热榜",
      "36氪",
      "IT之家",
      "爱范儿",
      "虎嗅"
    ]);
  }

  if (state.channel === "film_awards") {
    return renderSectionedItems(filtered, ["预告片", "消息类"]);
  }

  if (state.channel !== "china_entertainment") {
    return filtered.map(renderItemCard).join("");
  }

  return renderSectionedItems(filtered, ["国内娱乐圈", "国外娱乐圈"]);
}

function renderSectionedItems(filtered, sections) {
  const allSections = [
    ...sections,
    ...[...new Set(filtered.map((item) => item.section).filter(Boolean))].filter((section) => !sections.includes(section))
  ];
  return allSections
    .map((section) => {
      const sectionItems = filtered.filter((item) => item.section === section);
      return `
        <section class="subsection">
          <div class="subsection-heading">
            <h4>${section}</h4>
            <span>${sectionItems.length ? `${sectionItems.length} 条` : "今日暂无可靠来源"}</span>
          </div>
          ${sectionItems.length ? sectionItems.map(renderItemCard).join("") : renderInlineEmpty(section)}
        </section>
      `;
    })
    .join("");
}

function matchesQuery(item, query) {
  if (!query) return true;
  const haystack = [
    item.titleZh,
    item.summaryZh,
    item.whyItMatters,
    item.dateLabel,
    item.authorName,
    item.section,
    item.awardName,
    item.prominence,
    item.transcript?.original,
    item.transcript?.zh,
    ...(item.preferenceTags || []),
    ...(item.people || []),
    ...(item.platforms || []),
    ...(item.regions || []),
    ...item.sources.flatMap((source) => [source.publisher, source.title])
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

function sortItems(a, b) {
  const scoreA = a.importanceScore || a.heatScore || 0;
  const scoreB = b.importanceScore || b.heatScore || 0;
  return scoreB - scoreA;
}

function renderItemCard(item) {
  const displayChannelId = getDisplayChannelId(item);
  const channel = channelById[displayChannelId] || channelById[item.channel];
  const score = item.importanceScore || item.heatScore || item.metrics?.hotValue;
  const scoreLabel = item.heatScore ? "热度" : "重要性";
  const tags = [
    item.dateLabel,
    channel.label,
    item.section,
    item.awardName,
    ...(item.preferenceTags || []),
    ...(item.regions || []),
    ...(item.platforms || []),
    item.platform ? item.platform.toUpperCase() : null
  ].filter(Boolean);

  return `
    <article class="item-card" data-item-id="${item.id}" role="button" tabindex="0">
      <span class="visual-tile visual-${item.channel}" aria-hidden="true">
        <img src="${getItemThumbnail(item)}" alt="" />
        <span class="visual-label">${item.rank ? `#${item.rank}` : item.section === "预告片" ? "视频" : "图片"}</span>
      </span>
      <span class="item-main">
        <span class="item-meta">
          <span class="pill ${item.confidence}">${confidenceLabels[item.confidence]}</span>
          ${item.authorName ? `<span class="pill">${item.authorName}</span>` : ""}
        </span>
        <h4 class="item-title">${item.titleZh}</h4>
        <span class="item-summary">${item.summaryZh}</span>
        <span class="why">${item.whyItMatters || "等待更多可靠来源确认影响。"}</span>
        <span class="tag-row">${tags.slice(0, 5).map((tag) => `<span class="pill">${tag}</span>`).join("")}</span>
        <span class="source-row">${item.sources.length} 个来源 · ${item.sources.map((source) => source.publisher).slice(0, 2).join(" / ")}</span>
      </span>
      <span class="score-block">
        ${item.rank ? `<span class="rank-badge">${item.rank}</span>` : `<strong>${score || "-"}</strong>`}
        <span>${item.rank ? item.platform : scoreLabel}</span>
      </span>
    </article>
  `;
}

function getDisplayChannelId(item) {
  if (state.channel !== "all" && itemBelongsToChannel(item, state.channel)) {
    return state.channel;
  }
  return item.channel;
}

function getItemThumbnail(item) {
  return item.thumbnailUrl || makeThumbnail(item, item.section === "预告片" ? "视频首帧" : "相关图片");
}

function renderEmptyState() {
  const channel = channelById[state.channel];
  const message =
    emptyChannels.has(state.channel) || state.channel !== "all"
      ? `${channel.label}今日暂无可靠来源，系统不会编造内容。`
      : "没有匹配当前筛选条件的内容。";

  return `
    <div class="empty-state">
      <strong>${message}</strong>
      <p>可以切换频道、清空搜索，或等待下一次北京时间早上自动生成。</p>
    </div>
  `;
}

function openDrawer(itemId) {
  const item = allItems.find((entry) => entry.id === itemId);
  if (!item) return;

  const channel = channelById[item.channel];
  const metrics = item.metrics
    ? Object.entries(item.metrics)
        .map(([key, value]) => `<span class="pill">${metricLabel(key)} ${formatNumber(value)}</span>`)
        .join("")
    : "";
  const reports = getSourceReports(item);
  const sourceSnapshots = getSourceSnapshots(item);
  const mediaAssets = getMediaAssets(item);
  const relatedItems = getRelatedItems(item);
  const extraNewsSources = getExtraNewsSources(item);
  const detailBlocks = getDetailBlocks(item);

  document.getElementById("drawerContent").innerHTML = `
    <p class="eyebrow">${channel.label}</p>
    <h3 class="drawer-title">${item.titleZh}</h3>
    <div class="tag-row">
      <span class="pill ${item.confidence}">${confidenceLabels[item.confidence]}</span>
      ${item.section ? `<span class="pill">${item.section}</span>` : ""}
      ${(item.regions || []).map((region) => `<span class="pill">${region}</span>`).join("")}
      ${(item.platforms || []).map((platform) => `<span class="pill">${platform}</span>`).join("")}
    </div>
    ${renderKeyBrief(item)}

    <div class="drawer-section">
      <h4>完整信息</h4>
      <div class="detail-narrative">
        ${detailBlocks.map(renderDetailBlock).join("")}
      </div>
    </div>

    <div class="drawer-section">
      <h4>电子报与报道来源</h4>
      <div class="report-list">
        ${reports.map(renderReportCard).join("")}
      </div>
    </div>

    ${
      sourceSnapshots.length
        ? `<div class="drawer-section">
            <h4>来源内容摘要</h4>
            <div class="source-content-list">${sourceSnapshots.map(renderSourceSnapshot).join("")}</div>
          </div>`
        : ""
    }

    <div class="drawer-section">
      <h4>信源图片和视频</h4>
      <div class="media-grid">
        ${mediaAssets.map(renderMediaCard).join("")}
      </div>
    </div>

    ${renderFilmExtras(item)}
    ${renderTranscript(item)}
    ${renderObituaryPriority(item)}
    ${
      extraNewsSources.length
        ? `<div class="drawer-section">
            <h4>${item.section === "国内" ? "国内新闻来源池" : "新闻视频与社交信源"}</h4>
            <div class="source-chip-grid">${extraNewsSources.map(renderSourceChip).join("")}</div>
          </div>`
        : ""
    }

    <div class="drawer-section">
      <h4>相关人物</h4>
      <div class="tag-row">${(item.people || ["暂无明确人物"]).map((person) => `<span class="pill">${person}</span>`).join("")}</div>
    </div>

    <div class="drawer-section">
      <h4>来源列表</h4>
      <ul class="source-list">
        ${item.sources
          .map(
            (source) => `
              <li>
                <a href="${resolveSourceUrl(source, item)}" target="_blank" rel="noreferrer">${source.title}</a>
                <span>${source.publisher}${source.publishedAt ? ` · ${source.publishedAt}` : ""}</span>
              </li>
            `
          )
          .join("")}
      </ul>
    </div>

    <div class="drawer-section">
      <h4>相关消息和新闻</h4>
      <div class="related-list">${relatedItems.length ? relatedItems.map(renderRelatedCard).join("") : '<p class="panel-text">当前筛选范围内暂无更多相关消息。</p>'}</div>
    </div>
  `;

  document.getElementById("drawerBackdrop").hidden = false;
  document.getElementById("detailDrawer").classList.add("open");
  document.getElementById("detailDrawer").setAttribute("aria-hidden", "false");
}

function getSourceReports(item) {
  return item.sources.map((source, index) => ({
    label: index === 0 ? "主报道" : "补充报道",
    publisher: source.publisher,
    title: source.title,
    url: resolveSourceUrl(source, item),
    publishedAt: source.publishedAt
  }));
}

function renderReportCard(report) {
  return `
    <a class="report-card" href="${report.url}" target="_blank" rel="noreferrer">
      <span class="pill">${report.label}</span>
      <strong>${report.title}</strong>
      <span>${report.publisher}${report.publishedAt ? ` · ${report.publishedAt}` : ""}</span>
    </a>
  `;
}

function renderKeyBrief(item) {
  const primarySource = item.sources?.[0];
  const publishedAt = primarySource?.publishedAt || item.date || "待确认";
  const sourceLabel = primarySource ? `${primarySource.publisher} · ${primarySource.title}` : "等待可靠来源";
  return `
    <section class="key-brief" aria-label="重点速览">
      <div class="key-lead">
        <span class="brief-label">一句话重点</span>
        <strong>${escapeHtml(getLeadText(item))}</strong>
      </div>
      <div class="brief-grid">
        <div class="brief-row">
          <span>时间</span>
          <strong>${escapeHtml(publishedAt)}</strong>
        </div>
        <div class="brief-row">
          <span>来源</span>
          <strong>${escapeHtml(shortText(sourceLabel, 54))}</strong>
        </div>
        <div class="brief-row">
          <span>重要性</span>
          <strong>${escapeHtml(shortText(item.whyItMatters || "等待更多来源确认影响。", 72))}</strong>
        </div>
      </div>
    </section>
  `;
}

function getLeadText(item) {
  const snapshotLead = item.sourceSnapshots?.[0]?.description || item.sourceSnapshots?.[0]?.paragraphs?.find(isUsefulContentParagraph);
  const raw = snapshotLead || item.summaryZh || item.titleZh;
  return shortText(stripSourcePrefix(cleanDisplayText(raw)), 128);
}

function renderDetailBlock(block) {
  const cleaned = cleanDisplayText(block);
  const match = cleaned.match(/^([^：:]{2,8})[：:]\s*(.+)$/);
  const label = match ? match[1] : "说明";
  const content = match ? match[2] : cleaned;
  return `
    <div class="detail-row">
      <span>${escapeHtml(label)}</span>
      <p>${escapeHtml(shortText(stripSourcePrefix(content), 220))}</p>
    </div>
  `;
}

function getSourceSnapshots(item) {
  if (Array.isArray(item.sourceSnapshots) && item.sourceSnapshots.length) return item.sourceSnapshots;
  return [];
}

function renderSourceSnapshot(snapshot) {
  const paragraphs = (snapshot.paragraphs || [])
    .map(cleanDisplayText)
    .filter(isUsefulContentParagraph)
    .slice(0, 4);
  const description = cleanDisplayText(snapshot.description || "");
  const content = [
    ...(description && !paragraphs.includes(description) ? [description] : []),
    ...paragraphs
  ].filter(Boolean);
  const preview = content.slice(0, 2);
  const extra = content.slice(2);
  return `
    <article class="source-content-card">
      ${
        snapshot.imageUrl
          ? `<a class="source-content-image" href="${snapshot.url}" target="_blank" rel="noreferrer">
              <img src="${snapshot.imageUrl}" alt="${escapeHtml(snapshot.title || "来源图片")}" />
            </a>`
          : ""
      }
      <div class="source-content-body">
        <div class="source-content-meta">
          <span class="pill">${escapeHtml(snapshot.publisher || "来源")}</span>
          ${snapshot.capturedAt ? `<span>${escapeHtml(snapshot.capturedAt)}</span>` : ""}
        </div>
        <h5>${escapeHtml(snapshot.title || "来源内容")}</h5>
        ${
          preview.length
            ? `<div class="source-content-text">${preview.map((paragraph) => `<p>${escapeHtml(shortText(stripSourcePrefix(paragraph), 180))}</p>`).join("")}</div>`
            : `<p class="panel-text">该来源页未提取到可展示正文，请打开原文查看完整上下文。</p>`
        }
        ${
          extra.length
            ? `<details class="source-more">
                <summary>展开更多来源内容</summary>
                <div class="source-content-text">${extra.map((paragraph) => `<p>${escapeHtml(shortText(stripSourcePrefix(paragraph), 220))}</p>`).join("")}</div>
              </details>`
            : ""
        }
        <a class="text-link" href="${snapshot.url}" target="_blank" rel="noreferrer">打开完整原文</a>
      </div>
    </article>
  `;
}

function cleanDisplayText(value = "") {
  const element = document.createElement("textarea");
  element.innerHTML = String(value);
  return element.value
    .replace(/\s+/g, " ")
    .replace(/\s+([，。；：！？、])/g, "$1")
    .trim();
}

function stripSourcePrefix(value = "") {
  return value
    .replace(/^\d{4}[-/]\d{2}[-/]\d{2}\s+\d{2}:\d{2}，[^，]{1,24}\s+发布[:：]?/, "")
    .replace(/^来源内容[:：]\s*/, "")
    .trim();
}

function shortText(value = "", max = 120) {
  const text = cleanDisplayText(value);
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

function isUsefulContentParagraph(text = "") {
  const value = cleanDisplayText(text);
  if (value.length < 18) return false;
  const badPatterns = [
    /资讯\s*下载\s*补丁\s*游戏库/,
    /登录|注册|客户端|下载APP|隐私政策|用户协议|广告/,
    /ICP备|公网安备|违法和不良信息举报/,
    /^游侠网\s+资讯\s+下载/,
    /^新浪首页\s+新闻\s+体育/,
    /^World Athletics Partner/,
    /^各地网信部门举报/
  ];
  return !badPatterns.some((pattern) => pattern.test(value));
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getDetailBlocks(item) {
  if (item.detailBlocks?.length) return item.detailBlocks;
  const sourceNames = item.sources.map((source) => source.publisher).join("、") || "现有来源";
  const people = item.people?.length ? `涉及人物包括${item.people.join("、")}。` : "目前没有明确指向单一人物。";
  const regions = item.regions?.length ? `涉及地区为${item.regions.join("、")}。` : "事件影响范围仍需结合后续来源确认。";
  return [
    `事件起点：${item.summaryZh}`,
    `已确认信息：${sourceNames}等来源提供了当前可追溯线索。${people}${regions}`,
    `影响判断：${item.whyItMatters || "该消息仍在发展中，需结合更多来源判断实际影响。"}`,
    `后续观察：继续关注官方声明、原始视频/图片、当事方回应和多家媒体的交叉确认；若出现新证据，详情页会更新来源和相关消息。`
  ];
}

function getMediaAssets(item) {
  const primary = item.sources[0] || { publisher: channelById[item.channel].label, url: "#" };
  const secondary = item.sources[1] || primary;

  const assets = [
    ...(item.awardVideo
      ? [
          {
            type: "video",
            title: item.awardVideo.title,
            caption: `${item.awardName || "颁奖礼"}获奖视频来源`,
            url: item.awardVideo.url,
            thumbnail: getItemThumbnail(item)
          }
        ]
      : []),
    ...(item.section === "预告片"
      ? item.sources.slice(0, 2).map((source) => ({
          type: "video",
          title: source.title,
          caption: `${source.publisher} 预告片首帧`,
          url: resolveSourceUrl(source, item),
          thumbnail: makeThumbnail(item, "预告片")
        }))
      : [])
  ];
  if (assets.length) return assets;

  return [
    {
      type: "image",
      title: `${primary.publisher} 图片资料`,
      caption: `${item.regions?.[0] || item.platforms?.[0] || "现场"}相关图片素材`,
      url: resolveSourceUrl(primary, item),
      thumbnail: getItemThumbnail(item)
    },
    {
      type: "video",
      title: `${secondary.publisher} 视频/现场片段`,
      caption: `${item.platforms?.[0] || secondary.publisher}来源的视频跳转`,
      url: resolveSourceUrl(secondary, item),
      thumbnail: makeThumbnail(item, "视频首帧")
    }
  ];
}

function renderMediaCard(asset) {
  return `
    <a class="media-card" href="${asset.url}" target="_blank" rel="noreferrer">
      <span class="media-thumb">
        <img src="${asset.thumbnail}" alt="${asset.title}" />
        <span class="media-type">${asset.type === "video" ? "▶ 视频" : "图片"}</span>
      </span>
      <strong>${asset.title}</strong>
      <span>${asset.caption}</span>
    </a>
  `;
}

function renderFilmExtras(item) {
  if (item.channel !== "film_awards") return "";
  const awardBlock =
    item.section === "消息类"
      ? `<div class="drawer-section">
          <h4>覆盖奖项</h4>
          <div class="tag-row">
            ${awardNames.map((name) => `<span class="pill ${name === item.awardName ? "confirmed" : ""}">${name}</span>`).join("")}
          </div>
        </div>`
      : "";
  const trailerBlock =
    item.section === "预告片"
      ? `<div class="drawer-section">
          <h4>预告片来源</h4>
          <div class="source-chip-grid">
            ${(item.trailerSources || trailerSources).map(renderSourceChip).join("")}
          </div>
        </div>`
      : "";
  return `${awardBlock}${trailerBlock}`;
}

function renderTranscript(item) {
  if (!item.transcript) return "";
  const isEnglish = item.transcript.language === "en";
  return `
    <div class="drawer-section">
      <h4>${item.channel === "film_awards" ? "获奖发言逐字稿" : "发言逐字稿"}</h4>
      <div class="transcript-box">
        ${
          isEnglish
            ? `<p><strong>English</strong>${item.transcript.original}</p>
               <p><strong>中文</strong>${item.transcript.zh}</p>`
            : `<p><strong>中文</strong>${item.transcript.zh || item.transcript.original}</p>`
        }
      </div>
    </div>
  `;
}

function renderObituaryPriority(item) {
  if (item.channel !== "obituary") return "";
  return `
    <div class="drawer-section">
      <h4>讣闻收录优先级</h4>
      <p class="panel-text">${item.prominence || "优先收录具有重大国际影响力、国内外高知名度，或国内家喻户晓的人物；其他讣闻作为补充线索处理。"}</p>
    </div>
  `;
}

function getExtraNewsSources(item) {
  if (item.channel !== "major_news") return [];
  if (item.section === "国内") {
    const query = encodeURIComponent(item.titleZh);
    return domesticNewsSources.map((source) => {
      if (source.publisher === "微博") return { ...source, url: `https://s.weibo.com/weibo?q=${query}` };
      if (source.publisher === "小红书") return { ...source, url: `https://www.xiaohongshu.com/search_result?keyword=${query}` };
      if (source.publisher === "百度新闻") return { ...source, url: `https://news.baidu.com/ns?word=${query}` };
      if (source.publisher === "新浪新闻") return { ...source, url: `https://search.sina.com.cn/?q=${query}&c=news` };
      if (source.publisher === "中国新闻网") return { ...source, url: `https://sou.chinanews.com.cn/search.do?q=${query}` };
      if (source.publisher === "腾讯新闻") return { ...source, url: `https://news.qq.com/search?query=${query}` };
      return source;
    });
  }

  const query = encodeURIComponent(item.titleZh);
  return newsVideoSources.map((source) => {
    if (source.publisher === "X") {
      return { ...source, url: `https://x.com/search?q=${query}&src=typed_query&f=live` };
    }
    if (source.publisher === "Instagram") {
      return { ...source, url: `https://www.instagram.com/explore/search/keyword/?q=${query}` };
    }
    return source;
  });
}

function renderSourceChip(source) {
  return `
    <a class="source-chip" href="${source.url}" target="_blank" rel="noreferrer">
      <strong>${source.publisher}</strong>
      <span>${source.title || "打开来源"}</span>
    </a>
  `;
}

function resolveSourceUrl(source, item) {
  const query = encodeURIComponent(item.titleZh);
  if (!source?.url) return "#";
  const url = source.url;
  if (url.startsWith("manual://")) return "file:///Users/huangxianfeng/Downloads/2026年度.xlsx";
  const homepageMap = [
    ["https://www.youtube.com/", `https://www.youtube.com/results?search_query=${query}`],
    ["https://x.com/", `https://x.com/search?q=${query}&src=typed_query&f=live`],
    ["https://www.instagram.com/", `https://www.instagram.com/explore/search/keyword/?q=${query}`],
    ["https://apnews.com/", `https://apnews.com/search?q=${query}`],
    ["https://www.reuters.com/", `https://www.reuters.com/search/news?blob=${query}`],
    ["https://www.bbc.com/news", `https://www.bbc.com/search?q=${query}`],
    ["https://www.theverge.com/", `https://www.theverge.com/search?q=${query}`],
    ["https://36kr.com/", `https://36kr.com/search/articles/${query}`],
    ["https://variety.com/", `https://variety.com/search/${query}/`],
    ["https://deadline.com/", `https://deadline.com/?s=${query}`],
    ["https://ent.sina.com.cn/", `https://search.sina.com.cn/?q=${query}&c=ent`],
    ["https://weibo.com/", `https://s.weibo.com/weibo?q=${query}`],
    ["https://www.ign.com/", `https://www.ign.com/search?q=${query}`],
    ["https://www.espn.com/", `https://www.espn.com/search/_/q/${query}`],
    ["https://www.theguardian.com/", `https://www.theguardian.com/search?q=${query}`]
  ];
  const match = homepageMap.find(([home]) => url === home);
  return match ? match[1] : url;
}


function makeThumbnail(item, label) {
  const channel = channelById[item.channel];
  const colors = {
    major_news: ["#1f7a68", "#10211d"],
    hot_rankings: ["#e84b37", "#2b1712"],
    digital_tech: ["#3b64a0", "#101a28"],
    film_awards: ["#ad7d22", "#2d210e"],
    gaming: ["#7557a5", "#17142a"],
    podcast_speech: ["#4d7c5f", "#132318"],
    china_entertainment: ["#b45b62", "#2b1518"],
    meme: ["#b2453d", "#2f1614"],
    sports: ["#2f7f9d", "#102631"],
    obituary: ["#5c6462", "#191c1b"]
  }[item.channel] || ["#607068", "#18201d"];
  const safeTitle = escapeSvgText(item.titleZh.slice(0, 18));
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop stop-color="${colors[0]}" />
          <stop offset="1" stop-color="${colors[1]}" />
        </linearGradient>
      </defs>
      <rect width="640" height="360" fill="url(#g)" />
      <circle cx="520" cy="84" r="118" fill="rgba(255,255,255,.12)" />
      <circle cx="86" cy="300" r="150" fill="rgba(255,255,255,.08)" />
      <text x="42" y="76" fill="rgba(255,255,255,.72)" font-family="Arial, sans-serif" font-size="30" font-weight="700">${escapeSvgText(channel.label)} · ${label}</text>
      <text x="42" y="176" fill="#fff" font-family="Arial, sans-serif" font-size="44" font-weight="800">${safeTitle}</text>
      <text x="42" y="238" fill="rgba(255,255,255,.78)" font-family="Arial, sans-serif" font-size="25">${escapeSvgText(item.sources[0]?.publisher || "来源素材")}</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function escapeSvgText(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function getRelatedItems(item) {
  const scopedItems = getDateScopedItems();
  return scopedItems
    .filter((candidate) => candidate.id !== item.id)
    .map((candidate) => ({
      item: candidate,
      score:
        (candidate.channel === item.channel ? 4 : 0) +
        sharedCount(candidate.regions, item.regions) * 2 +
        sharedCount(candidate.platforms, item.platforms) +
        sharedCount(candidate.people, item.people) * 2
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((entry) => entry.item);
}

function sharedCount(left = [], right = []) {
  return left.filter((value) => right.includes(value)).length;
}

function renderRelatedCard(item) {
  const channel = channelById[item.channel];
  return `
    <article class="related-card" data-item-id="${item.id}" role="button" tabindex="0">
      <span class="pill">${channel.label}</span>
      <strong>${item.titleZh}</strong>
      <span>${item.summaryZh}</span>
    </article>
  `;
}


function renderInlineEmpty(section) {
  return `
    <div class="inline-empty">
      <strong>${section}今日暂无可靠来源</strong>
      <span>系统会等待权威媒体、平台热度或官方确认后再收录。</span>
    </div>
  `;
}

function closeDrawer() {
  document.getElementById("drawerBackdrop").hidden = true;
  document.getElementById("detailDrawer").classList.remove("open");
  document.getElementById("detailDrawer").setAttribute("aria-hidden", "true");
}

function metricLabel(key) {
  return {
    playCount: "播放",
    likeCount: "点赞",
    commentCount: "评论",
    shareCount: "分享",
    hotValue: "热度"
  }[key];
}

function formatNumber(value) {
  if (value >= 10000) return `${(value / 10000).toFixed(1)}万`;
  return String(value);
}

init();
