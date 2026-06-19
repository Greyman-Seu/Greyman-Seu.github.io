export const twitterPeopleGroups = [
  {
    slug: 'researchers',
    title: 'Researchers',
    titleZh: '研究人员',
    description: '教授、研究科学家、实验室负责人，以及直接推动基础模型与具身研究的人。'
  },
  {
    slug: 'journalists',
    title: 'Journalists',
    titleZh: '新闻工作者',
    description: '长期追踪 AI 产业、政策与实验室动态的记者与报道作者。'
  },
  {
    slug: 'founders-executives',
    title: 'Founders, Executives',
    titleZh: '创始人 & 决策者',
    description: '实验室、公司与平台的创始人、CEO、总裁与核心业务负责人。'
  },
  {
    slug: 'investors',
    title: 'Selective VC Folk',
    titleZh: '选择性的投资人',
    description: '关注 AI 基础设施、模型平台与应用公司的投资人和市场观察者。'
  },
  {
    slug: 'authors',
    title: 'Authors',
    titleZh: '作家',
    description: '持续输出书籍、深度评论、分析框架与长期观点的作者。'
  },
  {
    slug: 'creators',
    title: 'A.I. Newsletter Niche Creators',
    titleZh: 'AI 领域创作者',
    description: '做 newsletter、YouTube、技术博客、研究导读与知识整理的人。'
  }
] as const

export type TwitterPeopleGroupSlug = (typeof twitterPeopleGroups)[number]['slug']

export type TwitterPerson = {
  index: number
  name: string
  handle: string
  group: TwitterPeopleGroupSlug
  notes: string[]
}

export const twitterPeople: TwitterPerson[] = [
  {
    index: 1,
    name: 'Sam Altman',
    handle: 'sama',
    group: 'founders-executives',
    notes: ['OpenAI 创始人', '前 Y Combinator 总裁']
  },
  {
    index: 2,
    name: 'Yann LeCun',
    handle: 'ylecun',
    group: 'researchers',
    notes: ['纽约大学教授', 'Meta 首席人工智能科学家']
  },
  {
    index: 3,
    name: 'Andrew Ng',
    handle: 'AndrewYNg',
    group: 'researchers',
    notes: ['Coursera 联合创始人', '斯坦福大学计算机系兼职教师', '前百度 AI 集团 / Google Brain 负责人']
  },
  {
    index: 4,
    name: 'François Chollet',
    handle: 'fchollet',
    group: 'researchers',
    notes: ['在 Google 从事深度学习研究', 'Keras 的创建者', '《Deep Learning with Python》作者']
  },
  {
    index: 5,
    name: 'Karen Hao 郝珂灵',
    handle: '_KarenHao',
    group: 'journalists',
    notes: ['《华尔街日报》AI 记者', '美国国家杂志奖得主']
  },
  {
    index: 6,
    name: 'Andrej Karpathy',
    handle: 'karpathy',
    group: 'creators',
    notes: ['YouTuber、博主、意见领袖', '曾任特斯拉和 OpenAI 的 AI 总监']
  },
  {
    index: 7,
    name: 'Jürgen Schmidhuber',
    handle: 'SchmidhuberAI',
    group: 'researchers',
    notes: ['Dalle Molle 人工智能研究所联合主任', '常被称为现代 AI 与深度学习之父之一']
  },
  {
    index: 8,
    name: 'Sara Hooker',
    handle: 'sarahookr',
    group: 'researchers',
    notes: ['Cohere AI 负责人', '曾在 Google Brain 从事研究']
  },
  {
    index: 9,
    name: 'Demis Hassabis',
    handle: 'demishassabis',
    group: 'founders-executives',
    notes: ['DeepMind 与 Isomorphic Labs 创始人兼首席执行官']
  },
  {
    index: 10,
    name: 'Sarah Guo',
    handle: 'saranormous',
    group: 'investors',
    notes: ['Conviction A.I. 创始人', '初创公司投资人', '前 Greylock 合伙人']
  },
  {
    index: 11,
    name: 'David Hardmaru',
    handle: 'hardmaru',
    group: 'creators',
    notes: ['Stability AI 提示工程负责人', '前 Google Brain 研究科学家']
  },
  {
    index: 12,
    name: 'Lilian Weng',
    handle: 'lilianweng',
    group: 'researchers',
    notes: ['OpenAI 应用 AI 负责人']
  },
  {
    index: 13,
    name: 'Oriol Vinyals',
    handle: 'OriolVinyalsML',
    group: 'researchers',
    notes: ['DeepMind 研究总监兼深度学习负责人', '曾主导 AlphaStar、AlphaFold、AlphaCode、WaveNet、seq2seq 等项目', '前 Google Brain 研究科学家']
  },
  {
    index: 14,
    name: 'Michael Black',
    handle: 'Michael_J_Black',
    group: 'researchers',
    notes: ['马克斯·普朗克智能系统研究所主任', 'Meshcapade 首席科学家']
  },
  {
    index: 15,
    name: 'Jeff Dean',
    handle: 'JeffDean',
    group: 'researchers',
    notes: ['Google Research 与 AI 高级研究员兼高级副总裁', '参与设计了 TensorFlow、MapReduce、Bigtable 和 Spanner 等系统']
  },
  {
    index: 16,
    name: 'Ian Goodfellow',
    handle: 'goodfellow_ian',
    group: 'researchers',
    notes: ['DeepMind 研究科学家', 'GAN 的发明者', 'deeplearningbook.org 主作者']
  },
  {
    index: 17,
    name: 'Aakanksha Chowdhery',
    handle: 'achowdhery',
    group: 'researchers',
    notes: ['Google Brain PaLM 项目负责人']
  },
  {
    index: 18,
    name: 'Peter H. Diamandis, MD',
    handle: 'PeterDiamandis',
    group: 'authors',
    notes: ['Singularity University、XPRIZE 和 Fountainlife 创始人', '企业家、投资人、作家']
  },
  {
    index: 19,
    name: 'Gary Marcus',
    handle: 'GaryMarcus',
    group: 'authors',
    notes: ['《Rebooting.AI》和《Guitar Zero》作者', 'Geometric Intelligence 和 RobustAI 创始人']
  },
  {
    index: 20,
    name: 'Lucas Beyer',
    handle: 'giffmana',
    group: 'researchers',
    notes: ['Google Brain 苏黎世研究员']
  },
  {
    index: 21,
    name: 'Sebastian Raschka',
    handle: 'rasbt',
    group: 'authors',
    notes: ['《Ahead of AI》作者', '机器学习与 AI 研究者']
  },
  {
    index: 22,
    name: 'Cassie Kozyrkov',
    handle: 'quaesita',
    group: 'researchers',
    notes: ['Google 首席决策科学家']
  },
  {
    index: 23,
    name: 'Kate Kaye',
    handle: 'KateKayeReports',
    group: 'journalists',
    notes: ['独立记者', '曾任职于 Protocol']
  },
  {
    index: 24,
    name: 'Emad',
    handle: 'EMostaque',
    group: 'founders-executives',
    notes: ['Stability A.I. 创始人']
  },
  {
    index: 25,
    name: 'Fei-Fei Li',
    handle: 'drfeifei',
    group: 'researchers',
    notes: ['斯坦福以人为本人工智能研究院联合主任', 'AI4All 联合创始人兼主席']
  },
  {
    index: 26,
    name: 'Jim Fan',
    handle: 'DrJimFan',
    group: 'researchers',
    notes: ['NVIDIA AI 科学家']
  },
  {
    index: 27,
    name: 'Elvis Saravia',
    handle: 'omarsar0',
    group: 'creators',
    notes: ['DAIR AI 的创建者', '前 Meta AI 和 Elastic 科学家']
  },
  {
    index: 28,
    name: 'Connie Chan',
    handle: 'conniechan',
    group: 'investors',
    notes: ['a16z 普通合伙人']
  },
  {
    index: 29,
    name: 'Hugo Larochelle',
    handle: 'hugo_larochelle',
    group: 'researchers',
    notes: ['Google Brain 研究员', '机器学习教授', '曾任职于 Twitter Cortex']
  },
  {
    index: 30,
    name: 'Benj Edwards',
    handle: 'benjedwards',
    group: 'journalists',
    notes: ['Ars Technica 的 AI 与机器学习记者', '科技史研究者']
  },
  {
    index: 31,
    name: 'Becca Szkutak',
    handle: 'rebecca_szkutak',
    group: 'journalists',
    notes: ['TechCrunch 记者']
  },
  {
    index: 32,
    name: 'Sergey Levine',
    handle: 'svlevine',
    group: 'researchers',
    notes: ['加州大学伯克利分校教授']
  },
  {
    index: 33,
    name: 'Eric Schmidt',
    handle: 'ericschmidt',
    group: 'founders-executives',
    notes: ['前 Google 首席执行官']
  },
  {
    index: 34,
    name: 'Ilya Sutskever',
    handle: 'ilyasut',
    group: 'researchers',
    notes: ['OpenAI AGI 研究者']
  },
  {
    index: 35,
    name: 'Patrick Mineault',
    handle: 'patrickmineault',
    group: 'researchers',
    notes: ['曾任职于 Building 8', '前 Google 工程师']
  },
  {
    index: 36,
    name: 'Natasha Jaques',
    handle: 'natashajaques',
    group: 'researchers',
    notes: ['Google AI 与 Berkeley AI 高级研究科学家']
  },
  {
    index: 37,
    name: 'Pieter Abbeel',
    handle: 'pabbeel',
    group: 'researchers',
    notes: ['伯克利教授', 'Covariant 和 Gradescope 创始人', '《The Robot Brains》播客主持人，AIX Ventures 投资合伙人']
  },
  {
    index: 38,
    name: 'Eliezer Yudkowsky',
    handle: 'ESYudkowsky',
    group: 'authors',
    notes: ['机器智能研究所联合创始人']
  },
  {
    index: 39,
    name: 'Geoffrey Hinton',
    handle: 'geoffreyhinton',
    group: 'researchers',
    notes: ['多伦多大学教授', 'Vector Institute 联合创始人兼首席科学顾问']
  },
  {
    index: 40,
    name: 'Brett Winton',
    handle: 'wintonARK',
    group: 'investors',
    notes: ['Ark Invest 首席未来学家']
  },
  {
    index: 41,
    name: 'Jeff Clune',
    handle: 'jeffclune',
    group: 'researchers',
    notes: ['不列颠哥伦比亚大学副教授', 'Vector Institute 教员']
  },
  {
    index: 42,
    name: 'Sridhar Ramaswamy',
    handle: 'RamaswmySridhar',
    group: 'investors',
    notes: ['Neeva 和 NXYZ Data 联合创始人', 'Greylock 风险合伙人', '前 Google 高级副总裁']
  },
  {
    index: 43,
    name: 'Ben Tossell',
    handle: 'bentossell',
    group: 'authors',
    notes: ['《Ben’s Bites》作者']
  },
  {
    index: 44,
    name: 'John Schulman',
    handle: 'johnschulman2',
    group: 'researchers',
    notes: ['OpenAI 联合创始人']
  },
  {
    index: 45,
    name: 'Ahsen Khaliq',
    handle: '_akhaliq',
    group: 'authors',
    notes: ['AK’s Substack 作者', 'Gradio 创始人，后被 Hugging Face 收购']
  },
  {
    index: 46,
    name: 'Quoc Le',
    handle: 'quocleix',
    group: 'researchers',
    notes: ['Google Brain 首席科学家']
  },
  {
    index: 47,
    name: 'Jack Clark',
    handle: 'jackclarkSF',
    group: 'founders-executives',
    notes: ['Anthropic 创始人', 'Indexing AI 联席主席', '曾任职于 OpenAI']
  },
  {
    index: 48,
    name: 'merve',
    handle: 'mervenoyann',
    group: 'creators',
    notes: ['Hugging Face 的 Merve Noyan']
  },
  {
    index: 49,
    name: 'David Holz',
    handle: 'DavidSHolz',
    group: 'founders-executives',
    notes: ['Midjourney 和 Leap Motion 创始人', '曾任职于 NASA 和马克斯·普朗克研究所']
  },
  {
    index: 50,
    name: 'Nathan Lambert',
    handle: 'natolambert',
    group: 'creators',
    notes: ['Hugging Face 机器学习科学家', '致力于让自动化更普及']
  },
  {
    index: 51,
    name: 'Richard Socher',
    handle: 'RichardSocher',
    group: 'founders-executives',
    notes: ['You.com 首席执行官']
  },
  {
    index: 52,
    name: 'Mustafa Suleyman',
    handle: 'mustafasuleymn',
    group: 'founders-executives',
    notes: ['Inflection AI 联合创始人兼首席执行官', 'DeepMind 联合创始人', '前 Google AI 副总裁']
  },
  {
    index: 53,
    name: 'Zoubin Ghahramani',
    handle: 'ZoubinGhahrama1',
    group: 'researchers',
    notes: ['Google Brain 研究副总裁', '剑桥大学教授']
  },
  {
    index: 54,
    name: 'Nathan Benaich',
    handle: 'nathanbenaich',
    group: 'authors',
    notes: ['《State of AI / Guide to AI》作者']
  },
  {
    index: 55,
    name: 'John McDonnell',
    handle: 'johnvmcdonnell',
    group: 'creators',
    notes: ['曾任职于 Stitch Fix、Square 和 Gureckis Lab']
  },
  {
    index: 56,
    name: 'Bojan Tunguz',
    handle: 'tunguz',
    group: 'creators',
    notes: ['NVIDIA 高级系统软件工程师（机器学习）']
  },
  {
    index: 57,
    name: 'Ben Goertzel',
    handle: 'bengoertzel',
    group: 'authors',
    notes: ['SingularityNET 首席执行官']
  },
  {
    index: 58,
    name: 'Chris Olah',
    handle: 'ch402',
    group: 'creators',
    notes: ['Anthropic 创始人', '曾任职于 OpenAI Clarity Team、Google Brain 和 Distill']
  },
  {
    index: 59,
    name: 'Ksenia Se',
    handle: 'Kseniase_',
    group: 'authors',
    notes: ['《TheSequence》作者']
  },
  {
    index: 60,
    name: 'Paul Graham',
    handle: 'paulg',
    group: 'investors',
    notes: ['风险投资人']
  },
  {
    index: 61,
    name: 'Russ Salakhutdinov',
    handle: 'rsalakhu',
    group: 'researchers',
    notes: ['前 Apple AI 成员']
  },
  {
    index: 62,
    name: 'Greg Brockman',
    handle: 'gdb',
    group: 'founders-executives',
    notes: ['OpenAI 总裁兼联合创始人']
  },
  {
    index: 63,
    name: 'Vivek Natarajan',
    handle: 'vivnat',
    group: 'researchers',
    notes: ['在 Google AI 推进医疗 AI 研究', '前 Meta AI 研究员']
  },
  {
    index: 64,
    name: 'Brian X. Chen',
    handle: 'bxchen',
    group: 'journalists',
    notes: ['《纽约时报》记者']
  },
  {
    index: 65,
    name: 'Anima Anandkumar',
    handle: 'AnimaAnandkumar',
    group: 'researchers',
    notes: ['加州理工学院教授', 'NVIDIA AI 研究高级总监', '前 AWS 首席科学家']
  },
  {
    index: 66,
    name: 'Jeffrey Towson 陶迅',
    handle: 'JeffreyTowson',
    group: 'authors',
    notes: ['顾问']
  },
  {
    index: 67,
    name: 'Thomas Wolf',
    handle: 'Thom_Wolf',
    group: 'founders-executives',
    notes: ['Hugging Face 联合创始人']
  },
  {
    index: 68,
    name: 'John Platt',
    handle: 'johnplattml',
    group: 'researchers',
    notes: ['Google AI 应用科学总监']
  },
  {
    index: 69,
    name: 'Samanyou Garg',
    handle: 'SamanyouGarg',
    group: 'founders-executives',
    notes: ['Writesonic 创始人兼首席执行官']
  },
  {
    index: 70,
    name: 'Kirk Bourne',
    handle: 'KirkDBorne',
    group: 'authors',
    notes: ['DataPrime 数据科学家']
  },
  {
    index: 71,
    name: 'Alberto Romero',
    handle: 'Alber_RomGar',
    group: 'authors',
    notes: ['《The Algorithmic Bridge》作者', 'CambrianAI 分析师']
  },
  {
    index: 72,
    name: 'Matthew Hutson',
    handle: 'SilverJacket',
    group: 'journalists',
    notes: ['AI 自由撰稿记者']
  },
  {
    index: 73,
    name: 'Tim Scarfe',
    handle: 'ecsquendor',
    group: 'creators',
    notes: ['专注机器学习的 YouTuber']
  },
  {
    index: 74,
    name: 'Jordan Burgess',
    handle: 'jordnb',
    group: 'founders-executives',
    notes: ['Humanloop 联合创始人']
  },
  {
    index: 75,
    name: 'David Luan',
    handle: 'jluan',
    group: 'founders-executives',
    notes: ['Adept AI 创始人']
  },
  {
    index: 76,
    name: 'Connor Leahy',
    handle: 'NPCollapse',
    group: 'founders-executives',
    notes: ['Conjecture 和 EleutherAI 创始人']
  },
  {
    index: 77,
    name: 'Naveen Rao',
    handle: 'NaveenGRao',
    group: 'founders-executives',
    notes: ['MosaicML 联合创始人兼首席执行官', '曾任职于 Nervana 和 Intel AI']
  },
  {
    index: 78,
    name: 'Azeem Azhar',
    handle: 'azeem',
    group: 'authors',
    notes: ['《Exponential View》作者']
  },
  {
    index: 79,
    name: 'Suhail Doshi',
    handle: 'Suhail',
    group: 'founders-executives',
    notes: ['Playground.AI 和 Mixpanel 创始人']
  },
  {
    index: 80,
    name: 'Max Jaderberg',
    handle: 'maxjaderberg',
    group: 'researchers',
    notes: ['Isomorphic Labs 机器学习总监', '前 DeepMind 研究科学家', 'Vision Factory 联合创始人，后被 Google 收购']
  },
  {
    index: 81,
    name: 'Kyle Wiggers',
    handle: 'Kyle_L_Wiggers',
    group: 'journalists',
    notes: ['TechCrunch 科技 AI 记者']
  },
  {
    index: 82,
    name: 'Wei Xu',
    handle: 'cocoweixu',
    group: 'researchers',
    notes: ['佐治亚理工学院计算机系助理教授']
  },
  {
    index: 83,
    name: 'Aidan Gomez',
    handle: 'aidangomezzz',
    group: 'founders-executives',
    notes: ['Cohere 联合创始人兼首席执行官']
  },
  {
    index: 84,
    name: 'Alexandr Wang',
    handle: 'alexandr_wang',
    group: 'founders-executives',
    notes: ['Scale AI 创始人']
  },
  {
    index: 85,
    name: 'Caiming Xiong',
    handle: 'CaimingXiong',
    group: 'researchers',
    notes: ['Salesforce AI 副总裁']
  },
  {
    index: 86,
    name: 'Yi Ma',
    handle: 'YiMaTweets',
    group: 'researchers',
    notes: ['加州大学伯克利分校 EECS 教授、香港大学 IDS 教授']
  },
  {
    index: 87,
    name: 'Misha Denil',
    handle: 'notmisha',
    group: 'researchers',
    notes: ['DeepMind 研究科学家']
  },
  {
    index: 88,
    name: 'Peter Lee',
    handle: 'peteratmsr',
    group: 'researchers',
    notes: ['微软研究院公司副总裁']
  },
  {
    index: 89,
    name: 'Shivon Zilis',
    handle: 'shivon',
    group: 'founders-executives',
    notes: ['Neuralink 运营与特别项目总监']
  },
  {
    index: 90,
    name: 'Jacky Liang',
    handle: 'jackyliang42',
    group: 'creators',
    notes: ['卡内基梅隆大学博士生', '《Last Week in AI》作者']
  },
  {
    index: 91,
    name: 'Vin Vashishta',
    handle: 'v_vashishta',
    group: 'creators',
    notes: ['High ROI Data Science 作者']
  },
  {
    index: 92,
    name: 'Xuedong Huang',
    handle: 'xdh',
    group: 'researchers',
    notes: ['微软 Azure AI 技术院士']
  },
  {
    index: 93,
    name: 'Hannah Fry',
    handle: 'FryRsquared',
    group: 'authors',
    notes: ['科技作者']
  },
  {
    index: 94,
    name: 'Ravi Mhatre',
    handle: 'ravi_lsvp',
    group: 'investors',
    notes: ['Lightspeed Ventures 投资人']
  },
  {
    index: 95,
    name: 'clem',
    handle: 'ClementDelangue',
    group: 'founders-executives',
    notes: ['Hugging Face 联合创始人兼首席执行官', 'Moodstocks 创始人，后被 Google 收购']
  },
  {
    index: 96,
    name: 'Hattie Zhou',
    handle: 'oh_that_hat',
    group: 'researchers',
    notes: ['蒙特利尔大学与 Mila 博士生']
  },
  {
    index: 97,
    name: 'Sapna Maheshwari',
    handle: 'sapna',
    group: 'journalists',
    notes: ['《纽约时报》记者']
  },
  {
    index: 98,
    name: 'Vidhi Lalchand',
    handle: 'VRLalchand',
    group: 'researchers',
    notes: ['剑桥大学机器学习博士生']
  },
  {
    index: 99,
    name: 'Santiago L. Valdarrama',
    handle: 'svpino',
    group: 'authors',
    notes: ['机器学习自由从业者兼技术作者']
  },
  {
    index: 100,
    name: 'Vincent Boucher',
    handle: 'ceobillionaire',
    group: 'founders-executives',
    notes: ['Montreal AI 总裁']
  },
  {
    index: 101,
    name: 'Yannic Kilcher',
    handle: 'ykilcher',
    group: 'creators',
    notes: ['YouTube 创作者']
  },
  {
    index: 102,
    name: 'Matt Bornstein',
    handle: 'BornsteinMatt',
    group: 'investors',
    notes: ['a16z 合伙人']
  },
  {
    index: 103,
    name: 'Lachy Groom',
    handle: 'lachygroom',
    group: 'investors',
    notes: ['天使投资人', 'Bleeding Edge 创始人', '曾任职于 Stripe']
  },
  {
    index: 104,
    name: 'Riley Goodside',
    handle: 'goodside',
    group: 'creators',
    notes: ['Scale AI 首席科学家', '前 OkCupid 和 Grindr 数据科学家']
  },
  {
    index: 105,
    name: 'Amjad Masad',
    handle: 'amasad',
    group: 'founders-executives',
    notes: ['Replit 首席执行官兼工程负责人']
  },
  {
    index: 106,
    name: 'Noam Brown',
    handle: 'polynoamial',
    group: 'researchers',
    notes: ['Meta AI 研究科学家', '共同打造 Libratus 和 Pluribus', '共同打造 CICERO']
  },
  {
    index: 107,
    name: 'Shital Shah',
    handle: 'sytelus',
    group: 'researchers',
    notes: ['研究方向为机器智能、深度学习和神经网络架构']
  }
] as const
