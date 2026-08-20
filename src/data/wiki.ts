import { syncedWikiSources, syncedWikiTopics, syncedWikiSyntheses, syncedWikiGraphData } from './generated/wiki-sync'

export type WikiDomain = {
  slug: string
  name: string
  summary: string
  definition: string
  keyQuestions: string[]
  focusAreas: string[]
  representativeTopics: string[]
  representativeSources: string[]
  recentSignals: string[]
}

export type WikiTopic = {
  slug: string
  title: string
  domain: string
  summary: string
  definition: string
  whyItMatters: string
  keyQuestions: string[]
  relatedSourceSlugs: string[]
  relatedTopicSlugs: string[]
  relatedSynthesisSlugs: string[]
  relatedBlogPosts: { title: string; href: string }[]
  updatedDate: string
  body?: string
  sourceTitles?: string[]
  relatedPages?: string[]
}

export type WikiSource = {
  slug: string
  title: string
  sourceType: 'paper' | 'wechat' | 'web' | 'note'
  sourceUrl?: string
  htmlUrl?: string
  pdfUrl?: string
  codeUrl?: string
  translationUrl?: string
  publishDate: string
  authors?: string[]
  affiliation?: string
  relatedOrganizations?: string[]
  relatedCompanies?: string[]
  keywords?: string[]
  primaryDomainSlug?: string
  domainSlugs?: string[]
  heroImage?: string
  tldr?: string
  intuition?: string
  abstractEn?: string
  abstractZh?: string
  summary: string
  researchProblem?: string
  backgroundMotivation?: string
  backgroundGap?: string
  methodOverview?: string
  methodCore?: string
  methodBreakdown?: string[]
  methodTakeaways?: string[]
  keyTakeaways: string[]
  experimentalSignals?: string[]
  resultHighlights?: string[]
  resultsTable?: { columns: string[]; rows: string[][] }
  strengths?: string[]
  limitations?: string[]
  insights?: string[]
  insightCore?: string[]
  insightRelations?: string[]
  insightBorrowable?: string[]
  borrowableIdeas?: string[]
  methodRelations?: string[]
  riskLimitations?: string[]
  riskScenarios?: string[]
  riskJudgment?: string[]
  risks?: string
  applicationScenarios?: string[]
  criticalNotes?: string[]
  figureGallery?: { zone?: string; src: string; caption: string }[]
  relatedTopicSlugs: string[]
  relatedBlogPosts: { title: string; href: string }[]
}

export type WikiSynthesis = {
  slug: string
  title: string
  kind: 'overview' | 'comparison' | 'timeline'
  summary: string
  relatedTopicSlugs: string[]
  relatedSourceSlugs: string[]
  updatedDate: string
  body?: string
  sourceTitles?: string[]
  relatedPages?: string[]
}

type WikiRecentItem =
  | { type: 'topic'; slug: string; title: string; date: string; summary: string }
  | { type: 'source'; slug: string; title: string; date: string; summary: string }
  | { type: 'synthesis'; slug: string; title: string; date: string; summary: string }

export const wikiDomains: WikiDomain[] = [
  {
    slug: 'llm-vlm',
    name: 'LLM/VLM',
    summary: '基础模型与多模态模型总入口，聚焦训练方式、推理能力、数据路线与评测。',
    definition:
      'LLM/VLM 领域记录语言模型与视觉语言模型的能力边界、后训练方法、多模态推理、评测框架以及它们与 agent、具身系统的接口关系。',
    keyQuestions: [
      '后训练、合成数据与 test-time scaling 分别解决什么问题？',
      '多模态模型的 grounding 与 reasoning 应该如何统一理解？',
      '基础模型能力如何服务后续 agent 与具身系统？'
    ],
    focusAreas: ['post-training', 'reasoning', 'multimodal grounding', 'evaluation'],
    representativeTopics: ['test-time-scaling', 'multimodal-grounding', 'post-training-recipes'],
    representativeSources: ['trace-conditioned-vla-planning', 'corridor-vla'],
    recentSignals: [
      '近期值得持续积累 post-training 与 reasoning 的交叉观察。',
      '多模态 grounding 和 tool use 的边界仍需要专题化整理。'
    ]
  },
  {
    slug: 'physical-embodied-intelligence',
    name: 'Physical/Embodied Intelligence',
    summary: '物理/具身智能总入口，覆盖感知、规划、控制、世界模型与 sim2real。',
    definition:
      'Physical/Embodied Intelligence 关注智能体如何在真实世界中感知、规划并执行动作，核心问题是把数据、模型、控制器与物理约束连接成稳定闭环。',
    keyQuestions: [
      '数据、模型、控制器三者怎样形成稳定闭环？',
      'sim2real 的主要瓶颈是数据覆盖还是策略表达？',
      '世界模型怎样才能真正为行动和规划服务？'
    ],
    focusAreas: ['world models', 'robot manipulation', 'sim2real', 'planning'],
    representativeTopics: ['world-models-for-action', 'data-synthesis-for-embodiment'],
    representativeSources: ['hamiltonian-world-models', 'embodied-data-synthesis-note'],
    recentSignals: [
      '世界模型从“能生成未来”转向“是否能为行动服务”的讨论在升温。',
      '具身数据合成路线值得沉淀成稳定主题页，而不是散落在单条资料里。'
    ]
  },
  {
    slug: 'aigc',
    name: 'AIGC',
    summary: '图像、视频与多模态生成方向入口，关注质量、控制性、编辑与评测。',
    definition:
      'AIGC 领域关注图像、视频和多模态内容生成系统的模型路线、数据配方、控制接口和评测方法。',
    keyQuestions: [
      '图像与视频生成的统一问题框架是什么？',
      '控制性、可编辑性与生成质量该如何取舍？'
    ],
    focusAreas: ['video generation', 'image editing', 'evaluation'],
    representativeTopics: ['video-generation-evaluation'],
    representativeSources: ['v2xum-llm'],
    recentSignals: ['一期先保留领域入口，后续再按 image / video / editing / evaluation 拆主题。']
  },
  {
    slug: 'agent',
    name: 'Agent',
    summary: '工具调用、规划执行、工作流编排与智能体系统设计。',
    definition:
      'Agent 领域关注模型如何结合工具、记忆、规划和环境反馈完成多步任务，并把基础模型能力转化成稳定工作流。',
    keyQuestions: [
      'tool use、planning、memory 与 feedback loop 如何组合？',
      'agent 系统的评估应看任务完成率还是知识组织能力？',
      '知识库与 agent 的关系应该如何设计成长期资产？'
    ],
    focusAreas: ['tool use', 'planning', 'workflow design', 'memory'],
    representativeTopics: ['tool-use-workflows', 'knowledge-base-as-agent-memory'],
    representativeSources: ['planning-friendly-world-models', 'agentic-knowledge-workflows-note'],
    recentSignals: [
      '知识库不应只是上下文缓存，而应成为 agent 的长期结构化记忆。',
      '后续可以把 planning、tool use、workflow、evaluation 四个方向拆开。'
    ]
  }
]

export const wikiTopics: WikiTopic[] = [
  {
    slug: 'test-time-scaling',
    title: 'Test-Time Scaling',
    domain: 'llm-vlm',
    summary: '围绕长思维链、搜索、反思和多样采样等方法，理解推理时扩展怎样改变模型能力边界。',
    definition: 'Test-Time Scaling 关注在推理阶段通过更长计算、更强搜索或更好验证机制提升模型最终输出质量。',
    whyItMatters: '它直接决定“更大的推理预算”是否真的能换来更强的可靠性和任务完成度。',
    keyQuestions: [
      '推理时扩展主要提升的是正确率、鲁棒性还是可验证性？',
      '什么时候应该用更多 token，什么时候应该改训练？'
    ],
    relatedSourceSlugs: ['trace-conditioned-vla-planning', 'corridor-vla'],
    relatedTopicSlugs: ['post-training-recipes', 'tool-use-workflows'],
    relatedSynthesisSlugs: ['reasoning-systems-overview'],
    relatedBlogPosts: [],
    updatedDate: '2026-05-10'
  },
  {
    slug: 'multimodal-grounding',
    title: 'Multimodal Grounding',
    domain: 'llm-vlm',
    summary: '关注模型如何把视觉、语言和环境对象对齐成可执行、可验证的表示。',
    definition: 'Multimodal Grounding 研究模型如何让语言中的抽象描述稳定映射到图像、视频或环境中的具体对象与关系。',
    whyItMatters: '没有 grounding，多模态系统很容易“看似理解，实际漂浮”。',
    keyQuestions: [
      'grounding 与 reasoning 是串联关系还是统一能力？',
      '怎样评估模型是否真的绑定到世界对象？'
    ],
    relatedSourceSlugs: ['corridor-vla'],
    relatedTopicSlugs: ['world-models-for-action'],
    relatedSynthesisSlugs: ['reasoning-systems-overview'],
    relatedBlogPosts: [],
    updatedDate: '2026-05-08'
  },
  {
    slug: 'world-models-for-action',
    title: 'World Models for Action',
    domain: 'physical-embodied-intelligence',
    summary: '把世界模型从“生成逼真未来”转向“服务行动、规划与稳定预测”的问题框架。',
    definition: 'World Models for Action 关注预测模型如何成为行动决策的一部分，而不只是视觉上可信的未来模拟器。',
    whyItMatters: '具身系统真正需要的是可控、稳定、可规划的未来，而不是仅仅好看的 rollouts。',
    keyQuestions: [
      '世界模型在行动闭环中的接口应该是什么？',
      '物理可信度如何进入模型设计与评估？'
    ],
    relatedSourceSlugs: ['hamiltonian-world-models', 'planning-friendly-world-models'],
    relatedTopicSlugs: ['data-synthesis-for-embodiment', 'tool-use-workflows'],
    relatedSynthesisSlugs: ['embodied-intelligence-map'],
    relatedBlogPosts: [],
    updatedDate: '2026-05-09'
  },
  {
    slug: 'data-synthesis-for-embodiment',
    title: 'Data Synthesis for Embodiment',
    domain: 'physical-embodied-intelligence',
    summary: '整理真实数据、仿真数据和自动标注如何组合，支撑具身系统训练与评估。',
    definition: 'Data Synthesis for Embodiment 关注具身场景中数据从采集、生成到标注的全流程，以及不同来源组合的收益和风险。',
    whyItMatters: '数据路线决定了具身系统是否能扩规模、降成本并跨场景泛化。',
    keyQuestions: [
      '哪些数据一定要真实采集，哪些可以仿真补足？',
      '自动标注与人工标注的可靠边界在哪里？'
    ],
    relatedSourceSlugs: ['embodied-data-synthesis-note'],
    relatedTopicSlugs: ['world-models-for-action'],
    relatedSynthesisSlugs: ['embodied-intelligence-map'],
    relatedBlogPosts: [],
    updatedDate: '2026-05-07'
  },
  {
    slug: 'video-generation-evaluation',
    title: 'Video Generation Evaluation',
    domain: 'aigc',
    summary: '把视频生成任务的质量、可控性、任务适配和统一评测框架放到同一个观察面上。',
    definition: 'Video Generation Evaluation 关注视频生成系统应该如何被比较，不只看视觉质量，也看指令遵循、时序一致性与任务可用性。',
    whyItMatters: 'AIGC 很容易被 demo 驱动，但长期知识库更需要稳定的评测骨架。',
    keyQuestions: [
      '视频生成该优先看视觉质量还是任务完成度？',
      '统一评测框架会如何改变模型路线判断？'
    ],
    relatedSourceSlugs: ['v2xum-llm'],
    relatedTopicSlugs: [],
    relatedSynthesisSlugs: [],
    relatedBlogPosts: [],
    updatedDate: '2026-05-06'
  },
  {
    slug: 'tool-use-workflows',
    title: 'Tool Use Workflows',
    domain: 'agent',
    summary: '围绕工具调用、状态管理和执行反馈，定义 agent 如何真正完成工作。',
    definition: 'Tool Use Workflows 关注模型如何把规划、工具调用、错误恢复和结果沉淀串成可重复的任务闭环。',
    whyItMatters: '没有稳定 workflow，agent 只是会说话；有了 workflow，agent 才开始变成系统。',
    keyQuestions: [
      'tool use 的最小可用循环是什么？',
      '知识库应该作为工具、记忆还是结果仓库存在？'
    ],
    relatedSourceSlugs: ['agentic-knowledge-workflows-note', 'planning-friendly-world-models'],
    relatedTopicSlugs: ['knowledge-base-as-agent-memory', 'test-time-scaling'],
    relatedSynthesisSlugs: ['reasoning-systems-overview'],
    relatedBlogPosts: [],
    updatedDate: '2026-05-10'
  },
  {
    slug: 'knowledge-base-as-agent-memory',
    title: 'Knowledge Base as Agent Memory',
    domain: 'agent',
    summary: '把知识库从“资料存档”提升为 agent 的长期结构化记忆层。',
    definition: 'Knowledge Base as Agent Memory 关注 agent 如何把总结、引用、主题关系和查询结果沉淀为可持续复用的知识结构。',
    whyItMatters: '这直接决定 agent 是一次性回答器，还是能够逐步积累能力的系统。',
    keyQuestions: [
      '哪些内容应该被写回知识库，哪些只应保留在会话里？',
      '知识库条目的粒度应按来源、主题还是任务来设计？'
    ],
    relatedSourceSlugs: ['agentic-knowledge-workflows-note'],
    relatedTopicSlugs: ['tool-use-workflows'],
    relatedSynthesisSlugs: ['reasoning-systems-overview'],
    relatedBlogPosts: [],
    updatedDate: '2026-05-10'
  }
]

export const wikiSources: WikiSource[] = [
  {
    slug: 'trace-conditioned-vla-planning',
    title: 'Long-Horizon Manipulation via Trace-Conditioned VLA Planning',
    sourceType: 'paper',
    sourceUrl: 'https://arxiv.org/abs/2604.21924',
    publishDate: '2026-04-30',
    summary: '一篇把长程规划与 VLA 执行器解耦的代表性论文，适合用来观察 reasoning 与 embodied planning 的接口。',
    keyTakeaways: [
      '把高层规划与低层执行解耦有助于提升长程任务稳定性。',
      '这类方法更适合作为“模型能力如何服务行动”的观察样本，而不只是单篇工程实现。'
    ],
    relatedTopicSlugs: ['test-time-scaling'],
    relatedBlogPosts: []
  },
  {
    slug: 'corridor-vla',
    title: 'CorridorVLA',
    sourceType: 'paper',
    sourceUrl: 'https://arxiv.org/abs/2604.21241',
    publishDate: '2026-04-28',
    summary: '适合观察 VLM 接口如何连接行动头，以及多模态表示怎样进入具身执行。',
    keyTakeaways: [
      '展示了 VLM 表示到行动接口的设计样本。',
      '为 grounding 与控制之间的中间层设计提供了具体案例。'
    ],
    relatedTopicSlugs: ['multimodal-grounding', 'test-time-scaling'],
    relatedBlogPosts: []
  },
  {
    slug: 'hamiltonian-world-models',
    title: 'Hamiltonian World Models',
    sourceType: 'paper',
    sourceUrl: 'https://arxiv.org/abs/2605.00000',
    publishDate: '2026-05-05',
    summary: '提出以 Hamiltonian 结构重新理解 world model，把重点从“生成是否真实”转向“是否对行动有用”。',
    keyTakeaways: [
      '结构化 latent dynamics 可能改善可解释性和长程稳定性。',
      'world model 的瓶颈开始转向物理意义与行动可用性。'
    ],
    relatedTopicSlugs: ['world-models-for-action'],
    relatedBlogPosts: []
  },
  {
    slug: 'embodied-data-synthesis-note',
    title: '具身数据合成路线梳理',
    sourceType: 'wechat',
    publishDate: '2026-05-02',
    summary: '系统梳理真实数据、仿真数据与自动标注的组合方式，适合作为具身数据主题的参考索引。',
    keyTakeaways: [
      '具身数据路线不应只看规模，也要看标注可靠性与任务接口。',
      '更适合沉淀为主题骨架，而不是停留在一篇资料摘要。'
    ],
    relatedTopicSlugs: ['data-synthesis-for-embodiment'],
    relatedBlogPosts: []
  },
  {
    slug: 'planning-friendly-world-models',
    title: 'Planning-Friendly World Models for Embodied Control',
    sourceType: 'paper',
    publishDate: '2026-05-06',
    summary: '一篇适合作为 Agent 与具身交叉切入点的条目，关注 world model 如何进入规划回路。',
    keyTakeaways: [
      '把预测模型与 planner 的接口定义清楚，往往比单纯提升 rollout 质量更关键。',
      '为 agent 与 embodied 两个领域提供了共享观察点。'
    ],
    relatedTopicSlugs: ['world-models-for-action', 'tool-use-workflows'],
    relatedBlogPosts: []
  },
  {
    slug: 'agentic-knowledge-workflows-note',
    title: 'Agentic Knowledge Workflows',
    sourceType: 'note',
    publishDate: '2026-05-10',
    summary: '围绕“输入资料 -> 总结 -> 写入知识库 -> 再检索”的工作流笔记，明确知识库如何成为 agent 的长期记忆层。',
    keyTakeaways: [
      '知识库不是会话缓存，而是长期结构化资产。',
      '写入契约比单次总结质量更重要，因为它决定后续可检索性。'
    ],
    relatedTopicSlugs: ['tool-use-workflows', 'knowledge-base-as-agent-memory'],
    relatedBlogPosts: []
  },
  {
    slug: 'v2xum-llm',
    title: 'Instruct-V2Xum / V2Xum-LLM',
    sourceType: 'paper',
    publishDate: '2026-05-01',
    summary: '适合作为视频生成与视频理解评测路线的代表资料，帮助组织 AIGC 方向的索引页。',
    keyTakeaways: [
      '视频任务的统一框架设计对数据与评测提出更高要求。',
      'AIGC 领域仍需要把 generation 与 evaluation 更清楚地拆开。'
    ],
    relatedTopicSlugs: [],
    relatedBlogPosts: []
  }
]

function slugifySourceTitle(title: string) {
  const hit = normalizedSyncedWikiSources.find((source) => source.title === title)
  return hit ? hit.slug : ''
}

type SyncedSourceWithDomains = (typeof syncedWikiSources)[number] & {
  primaryDomainSlug?: string
  domainSlugs?: string[]
}

type SyncedTopicWithDomain = (typeof syncedWikiTopics)[number] & {
  domain?: string
  primaryDomainSlug?: string
  sourceSlugs?: string[]
  synthesisSlugs?: string[]
  openQuestions?: string[]
}

type SyncedSynthesisWithRelations = (typeof syncedWikiSyntheses)[number] & {
  sourceSlugs?: string[]
  topicSlugs?: string[]
  judgment?: string
  claims?: string[]
  openQuestions?: string[]
}

const normalizeKnownDomainSlug = (value?: string) => {
  const raw = String(value || '').trim()
  if (!raw) return ''
  const exact = wikiDomains.find((domain) => domain.slug === raw)
  if (exact) return exact.slug
  const byName = wikiDomains.find((domain) => domain.name.toLowerCase() === raw.toLowerCase())
  return byName?.slug || raw
}

const getSyncedTopicDomain = (topic: SyncedTopicWithDomain) => {
  const direct = normalizeKnownDomainSlug(topic.domain || topic.primaryDomainSlug)
  if (direct) return direct
  const tagDomain = (topic.tags || []).map(normalizeKnownDomainSlug).find((slug) => wikiDomains.some((domain) => domain.slug === slug))
  return tagDomain || 'physical-embodied-intelligence'
}

const normalizedSyncedWikiSources: WikiSource[] = syncedWikiSources.map((source) => {
  const sourceRecord = source as SyncedSourceWithDomains & Record<string, any>
  const sourceType = ['paper', 'wechat', 'web', 'note'].includes(String(source.sourceType))
    ? (source.sourceType as WikiSource['sourceType'])
    : 'web'
  return {
    slug: source.slug,
    title: source.title,
    sourceType,
    sourceUrl: source.sourceUrl || '',
    htmlUrl: source.htmlUrl || '',
    pdfUrl: source.pdfUrl || '',
    codeUrl: source.codeUrl || '',
    translationUrl: source.translationUrl || '',
    publishDate: source.publishDate || '',
    authors: source.authors || [],
    affiliation: source.affiliation || '',
    relatedOrganizations: sourceRecord.relatedOrganizations || sourceRecord.related_organizations || [],
    relatedCompanies: sourceRecord.relatedCompanies || sourceRecord.related_companies || [],
    keywords: source.keywords || [],
    primaryDomainSlug: sourceRecord.primaryDomainSlug || '',
    domainSlugs: sourceRecord.domainSlugs || [],
    heroImage: source.heroImage && source.heroImage !== 'none' ? source.heroImage : undefined,
    tldr: source.tldr || '',
    intuition: source.intuition || '',
    abstractEn: source.abstractEn || '',
    abstractZh: source.abstractZh || '',
    summary: source.tldr || source.abstractZh || source.abstractEn || source.title,
    researchProblem: sourceRecord.background || '',
    backgroundMotivation: sourceRecord.backgroundMotivation || '',
    backgroundGap: sourceRecord.backgroundGap || '',
    methodOverview: sourceRecord.methodOverview || sourceRecord.method || '',
    methodCore: sourceRecord.methodCore || '',
    methodBreakdown: sourceRecord.methodBreakdown || [],
    methodTakeaways: sourceRecord.methodTakeaways || [],
    keyTakeaways: sourceRecord.methodTakeaways || [],
    experimentalSignals: sourceRecord.resultHighlights || [],
    resultHighlights: sourceRecord.resultHighlights || [],
    resultsTable:
      sourceRecord.resultsTable && Array.isArray(sourceRecord.resultsTable.columns) && Array.isArray(sourceRecord.resultsTable.rows)
        ? sourceRecord.resultsTable
        : undefined,
    strengths: [],
    limitations: sourceRecord.riskLimitations || [],
    insights: sourceRecord.insightCore || [],
    insightCore: sourceRecord.insightCore || [],
    insightRelations: sourceRecord.insightRelations || [],
    insightBorrowable: sourceRecord.insightBorrowable || [],
    borrowableIdeas: sourceRecord.insightBorrowable || [],
    methodRelations: sourceRecord.insightRelations || [],
    riskLimitations: sourceRecord.riskLimitations || [],
    riskScenarios: sourceRecord.riskScenarios || [],
    riskJudgment: sourceRecord.riskJudgment || [],
    risks: sourceRecord.risks || '',
    applicationScenarios: sourceRecord.riskScenarios || [],
    criticalNotes: sourceRecord.riskJudgment || [],
    figureGallery: source.figureGallery || [],
    relatedTopicSlugs: source.relatedTopicSlugs || [],
    relatedBlogPosts: []
  }
})

const mergedWikiSources: WikiSource[] = normalizedSyncedWikiSources

const normalizedSyncedWikiTopics: WikiTopic[] = syncedWikiTopics.map((topic) => {
  const topicWithDomain = topic as SyncedTopicWithDomain
  const relatedSourceSlugs = topicWithDomain.sourceSlugs?.length
    ? topicWithDomain.sourceSlugs
    : (topic.sourceTitles || []).map((title) => slugifySourceTitle(title)).filter(Boolean)
  return {
    slug: topic.slug,
    title: topic.title,
    domain: getSyncedTopicDomain(topicWithDomain),
    summary: topic.summary,
    definition: topic.summary,
    whyItMatters: topic.summary,
    keyQuestions: [],
    relatedSourceSlugs,
    relatedTopicSlugs: [],
    relatedSynthesisSlugs: topicWithDomain.synthesisSlugs || [],
    relatedBlogPosts: [],
    updatedDate: topic.updated || topic.created || '',
    body: topic.body || '',
    sourceTitles: topic.sourceTitles || [],
    relatedPages: topic.relatedPages || []
  }
})

export const wikiSyntheses: WikiSynthesis[] = [
  {
    slug: 'reasoning-systems-overview',
    title: 'Reasoning Systems Overview',
    kind: 'overview',
    summary: '围绕推理时扩展、工具调用与知识库写回，整理“更强回答系统”真正由哪些层组成。',
    relatedTopicSlugs: ['test-time-scaling', 'tool-use-workflows', 'knowledge-base-as-agent-memory'],
    relatedSourceSlugs: ['trace-conditioned-vla-planning', 'agentic-knowledge-workflows-note'],
    updatedDate: '2026-05-10'
  },
  {
    slug: 'embodied-intelligence-map',
    title: 'Embodied Intelligence Map',
    kind: 'overview',
    summary: '把具身数据、世界模型、规划与控制组织成一张长期研究地图，帮助后续知识沉淀有稳定骨架。',
    relatedTopicSlugs: ['world-models-for-action', 'data-synthesis-for-embodiment'],
    relatedSourceSlugs: ['hamiltonian-world-models', 'embodied-data-synthesis-note', 'planning-friendly-world-models'],
    updatedDate: '2026-05-09'
  }
]

const normalizedSyncedWikiSyntheses: WikiSynthesis[] = syncedWikiSyntheses.map((entry) => {
  const entryWithRelations = entry as SyncedSynthesisWithRelations
  return {
    slug: entry.slug,
    title: entry.title,
    kind: 'overview',
    summary: entry.summary,
    relatedTopicSlugs: entryWithRelations.topicSlugs || [],
    relatedSourceSlugs: entryWithRelations.sourceSlugs?.length
      ? entryWithRelations.sourceSlugs
      : (entry.sourceTitles || []).map((title) => slugifySourceTitle(title)).filter(Boolean),
    updatedDate: entry.updated || entry.created || '',
    body: entry.body || '',
    sourceTitles: entry.sourceTitles || [],
    relatedPages: entry.relatedPages || []
  }
})

export const allWikiTopics: WikiTopic[] = normalizedSyncedWikiTopics

const getDomainSlugsFromTopics = (topicSlugs: string[]) =>
  Array.from(
    new Set(
      topicSlugs
        .map((slug) => allWikiTopics.find((topic) => topic.slug === slug)?.domain)
        .filter((slug): slug is string => Boolean(slug))
    )
  )

const normalizeSourceDomains = (source: WikiSource): WikiSource => {
  const explicitDomains = Array.isArray(source.domainSlugs) ? source.domainSlugs.filter(Boolean) : []
  const inferredDomains = getDomainSlugsFromTopics(source.relatedTopicSlugs || [])
  const domainSlugs = Array.from(new Set([...explicitDomains, ...inferredDomains])).slice(0, 2)
  const primaryDomainSlug = source.primaryDomainSlug || domainSlugs[0] || ''
  return {
    ...source,
    primaryDomainSlug,
    domainSlugs
  }
}

export const allWikiSources: WikiSource[] = mergedWikiSources.map(normalizeSourceDomains)

export const allWikiSyntheses: WikiSynthesis[] = normalizedSyncedWikiSyntheses

export const getWikiDomainBySlug = (slug: string) => wikiDomains.find((domain) => domain.slug === slug)
export const getWikiTopicBySlug = (slug: string) => allWikiTopics.find((topic) => topic.slug === slug)
export const getWikiSourceBySlug = (slug: string) => allWikiSources.find((source) => source.slug === slug)
export const getWikiSynthesisBySlug = (slug: string) => allWikiSyntheses.find((entry) => entry.slug === slug)

export const getTopicsByDomain = (domainSlug: string) =>
  allWikiTopics
    .filter((topic) => topic.domain === domainSlug)
    .sort((a, b) => +new Date(b.updatedDate) - +new Date(a.updatedDate))

export const getSourcesByDomain = (domainSlug: string) => {
  const topicSlugs = new Set(getTopicsByDomain(domainSlug).map((topic) => topic.slug))
  return allWikiSources.filter((source) => {
    if (source.domainSlugs?.includes(domainSlug)) return true
    return source.relatedTopicSlugs.some((slug) => topicSlugs.has(slug))
  })
}

export const getSynthesesByDomain = (domainSlug: string) => {
  const topicSlugs = new Set(getTopicsByDomain(domainSlug).map((topic) => topic.slug))
  return allWikiSyntheses.filter((entry) => entry.relatedTopicSlugs.some((slug) => topicSlugs.has(slug)))
}

export const getRecentWikiItems = (limit = 6): WikiRecentItem[] => {
  const items: WikiRecentItem[] = [
    ...allWikiTopics.map((topic) => ({
      type: 'topic' as const,
      slug: topic.slug,
      title: topic.title,
      date: topic.updatedDate,
      summary: topic.summary
    })),
    ...allWikiSources.map((source) => ({
      type: 'source' as const,
      slug: source.slug,
      title: source.title,
      date: source.publishDate,
      summary: source.summary
    })),
    ...allWikiSyntheses.map((entry) => ({
      type: 'synthesis' as const,
      slug: entry.slug,
      title: entry.title,
      date: entry.updatedDate,
      summary: entry.summary
    }))
  ]

  return items.sort((a, b) => +new Date(b.date) - +new Date(a.date)).slice(0, limit)
}

export const getWikiHref = (item: WikiRecentItem) => {
  if (item.type === 'topic') return `/wiki/topic/${item.slug}`
  if (item.type === 'source') return `/wiki/source/${item.slug}`
  return `/wiki/synthesis/${item.slug}`
}

export const wikiGraphData = syncedWikiGraphData
