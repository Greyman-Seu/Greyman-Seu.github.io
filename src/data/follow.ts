import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { cwd } from 'node:process'
import { fileURLToPath } from 'node:url'

export type FollowSource = 'arxiv' | 'wechat' | 'x' | 'bilibili'
export type FollowImportance = 'high' | 'medium' | 'low'

export type FollowDomain = {
  name: string
  slug: string
  summary: string
  todayCount: number
  weekCount: number
  recentHighlights: string[]
}

export type FollowLink = {
  label: string
  href: string
}

export type FollowAuthorMeta = {
  name: string
  affiliations: string[]
  isFirstAuthor: boolean
  isCorrespondingAuthor: boolean
}

export type FollowItem = {
  id: string
  sourceType: FollowSource
  title: string
  summary: string
  url?: string
  importance: FollowImportance
  includeInFollow?: boolean
  domains: string[]
  links: FollowLink[]
  authors?: string[]
  categories?: string[]
  authorMeta?: FollowAuthorMeta[]
  firstAffiliation?: string
  relatedOrganizations?: string[]
  relatedCompanies?: string[]
  hjfyUrl?: string
  published?: string
  updated?: string
  abstractEn?: string
  oneLinerZh?: string
  summaryCn?: string
  hotScore?: number
  overallScore?: number
  relevanceScore?: number
  isFavorite?: boolean
}

export type FollowSection = {
  sourceType: FollowSource
  title: string
  count: number
  items: FollowItem[]
}

export type FollowDigest = {
  date: string
  summary: string
  highlights: string[]
  counts: Record<FollowSource, number>
  sections: FollowSection[]
}

export type FollowSourceItem = FollowItem & {
  date: string
  sourceTitle: string
}

export type FollowSourceMeta = {
  source: FollowSource
  title: string
  description: string
  path: string
  searchEnabled: boolean
}

export type FollowSourceSummary = FollowSourceMeta & {
  totalCount: number
  latestDate: string
}

export type WikiDomain = {
  slug: string
  name: string
  summary: string
  definition: string
  keyQuestions: string[]
  representativeItems: { title: string; note: string; href?: string }[]
  recentSignals: string[]
}

type GeneratedManifest = {
  latest_date?: string
  sources?: Array<{ source: FollowSource; title: string; count: number; path: string }>
  domains?: Array<{ slug: string; name: string; count: number; latest_date: string }>
}

type GeneratedDigest = {
  date: string
  summary: string
  highlights?: string[]
  counts?: Partial<Record<FollowSource, number>>
  sections?: Array<{
    source_type: FollowSource
    title: string
    count?: number
    items?: Array<{
      id: string
      source_type: FollowSource
      title: string
      summary: string
      url?: string
      importance: FollowImportance
      include_in_follow?: boolean
      domains?: Array<{ slug: string; name: string }>
      links?: FollowLink[]
      authors?: string[]
      categories?: string[]
      author_meta?: Array<{
        name: string
        affiliations?: string[]
        is_first_author?: boolean
        is_corresponding_author?: boolean
      }>
      first_affiliation?: string
      related_organizations?: string[]
      related_companies?: string[]
      hjfy_url?: string
      published?: string
      updated?: string
      abstract_en?: string
      one_liner_zh?: string
      summary_cn?: string
      hot_score?: number
      overall_score?: number
      relevance_score?: number
      is_favorite?: boolean
    }>
  }>
}

const DATA_DIR = dirname(fileURLToPath(import.meta.url))
const GENERATED_FOLLOW_DIR_CANDIDATES = [
  resolve(cwd(), 'src', 'data', 'generated', 'follow'),
  resolve(DATA_DIR, 'generated', 'follow'),
]
const IMPORTANCE_WEIGHT: Record<FollowImportance, number> = {
  high: 3,
  medium: 2,
  low: 1,
}

const followSourceCatalog: FollowSourceMeta[] = [
  {
    source: 'arxiv',
    title: 'arXiv',
    description: '论文量大且结构稳定，适合作为单独来源页并支持搜索与强过滤。',
    path: '/follow/arxiv',
    searchEnabled: true,
  },
  {
    source: 'wechat',
    title: 'WeChat',
    description: '公众号更偏浏览型内容，先做时间排序与简单筛选。',
    path: '/follow/wechat',
    searchEnabled: false,
  },
  {
    source: 'x',
    title: 'X / Twitter',
    description: '适合追踪 thread、demo 与作者动态，第一版只做轻量筛选。',
    path: '/follow/x',
    searchEnabled: false,
  },
  {
    source: 'bilibili',
    title: 'Bilibili',
    description: '视频内容先作为归档型来源页，保留时间轴和领域筛选即可。',
    path: '/follow/bilibili',
    searchEnabled: false,
  },
]

const baseFollowDomains: Omit<FollowDomain, 'todayCount' | 'weekCount' | 'recentHighlights'>[] = [
  {
    name: 'LLM/VLM',
    slug: 'llm-vlm',
    summary: '大模型、多模态大模型，包含推理、训练等。',
  },
  {
    name: 'Physical/Embodied Intelligence',
    slug: 'physical-embodied-intelligence',
    summary: '物理/具身智能整体进展，覆盖机器人操作、感知、规划与泛化。',
  },
  {
    name: 'AIGC',
    slug: 'aigc',
    summary: '图像、视频与语音生成方向。',
  },
  {
    name: 'Agent',
    slug: 'agent',
    summary: '工具调用、规划执行、工作流编排与智能体系统设计。',
  },
]

const fallbackDigests: FollowDigest[] = [
  {
    date: '2026-05-02',
    summary: '今天主要是 LLM/VLM 与物理/具身智能方向有明显更新，另有 1 篇长文适合沉淀到 wiki。',
    highlights: [
      '一篇 arXiv 论文把长程规划与 VLA 执行器解耦，适合作为 LLM/VLM 与具身交叉条目。',
      '一篇公众号文章系统梳理了具身数据合成路线，适合转成 Physical/Embodied Intelligence wiki 索引。',
      'X 上有一个机器人抓取 demo thread 值得追踪原始代码仓库。',
    ],
    counts: { arxiv: 12, wechat: 3, x: 8, bilibili: 1 },
    sections: [
      {
        sourceType: 'arxiv',
        title: 'arXiv',
        count: 12,
        items: [
          {
            id: 'arxiv:2604.21924',
            sourceType: 'arxiv',
            title: 'Long-Horizon Manipulation via Trace-Conditioned VLA Planning',
            summary: '把短程 VLA 执行扩展到长程操作规划，适合作为 LLM/VLM 与具身交叉方向的代表更新。',
            importance: 'high',
            domains: ['llm-vlm', 'physical-embodied-intelligence'],
            links: [
              { label: 'Abs', href: 'https://arxiv.org/abs/2604.21924' },
              { label: 'PDF', href: 'https://arxiv.org/pdf/2604.21924' },
              { label: 'Code', href: 'https://github.com/example/loho-manip' },
            ],
          },
          {
            id: 'arxiv:2604.21241',
            sourceType: 'arxiv',
            title: 'CorridorVLA: Explicit Spatial Constraints for Generative Action Heads',
            summary: '显式空间锚点约束生成式 action head，属于 VLM 与具身控制接口的架构改造。',
            importance: 'medium',
            domains: ['llm-vlm', 'physical-embodied-intelligence'],
            links: [
              { label: 'Abs', href: 'https://arxiv.org/abs/2604.21241' },
              { label: 'PDF', href: 'https://arxiv.org/pdf/2604.21241' },
            ],
          },
        ],
      },
      {
        sourceType: 'wechat',
        title: 'WeChat',
        count: 3,
        items: [
          {
            id: 'wechat:embodied-data',
            sourceType: 'wechat',
            title: '具身数据合成路线梳理',
            summary: '较系统地总结了真实数据、仿真数据与自动标注的组合方式，适合后续沉淀到 wiki。',
            importance: 'high',
            domains: ['physical-embodied-intelligence'],
            links: [{ label: 'Article', href: 'https://example.com/wechat/embodied-data' }],
          },
        ],
      },
      {
        sourceType: 'x',
        title: 'X / Twitter',
        count: 8,
        items: [
          {
            id: 'x:robot-demo-thread',
            sourceType: 'x',
            title: 'Robot grasping thread with code hints',
            summary: '一个 demo thread，值得后续确认代码仓库和真实实验设置。',
            importance: 'medium',
            domains: ['physical-embodied-intelligence', 'agent'],
            links: [{ label: 'Thread', href: 'https://x.com/example/status/1' }],
          },
        ],
      },
      {
        sourceType: 'bilibili',
        title: 'Bilibili',
        count: 1,
        items: [
          {
            id: 'bilibili:vla-video',
            sourceType: 'bilibili',
            title: 'VLA 系统实现复盘视频',
            summary: '更偏工程复盘，适合补充背景，不一定要进主 digest highlights。',
            importance: 'low',
            domains: ['llm-vlm', 'physical-embodied-intelligence'],
            links: [{ label: 'Video', href: 'https://www.bilibili.com/video/BV1xx411c7mD/' }],
          },
        ],
      },
    ],
  },
  {
    date: '2026-05-01',
    summary: '今天的重点相对集中在 Agent 与 AIGC，更多是值得归档的中等强度更新。',
    highlights: [
      '一篇 planning-oriented 论文适合挂到 Agent 与 Physical/Embodied Intelligence 的交叉索引。',
      'AIGC 方向有一个值得收藏的路线与 benchmark 对比总结。',
    ],
    counts: { arxiv: 7, wechat: 1, x: 4, bilibili: 0 },
    sections: [
      {
        sourceType: 'arxiv',
        title: 'arXiv',
        count: 7,
        items: [
          {
            id: 'arxiv:wm-250501',
            sourceType: 'arxiv',
            title: 'Planning-Friendly World Models for Embodied Control',
            summary: '强调 latent state 的规划友好性，适合作为 Agent 与具身控制交叉领域的一条近期信号。',
            importance: 'medium',
            domains: ['agent', 'physical-embodied-intelligence'],
            links: [
              { label: 'Abs', href: 'https://arxiv.org/abs/2505.00001' },
              { label: 'PDF', href: 'https://arxiv.org/pdf/2505.00001' },
            ],
          },
        ],
      },
      {
        sourceType: 'wechat',
        title: 'WeChat',
        count: 1,
        items: [
          {
            id: 'wechat:aigc-benchmark',
            sourceType: 'wechat',
            title: '图像/视频生成路线与 benchmark 对比',
            summary: '更像资料汇总，后续适合转成 AIGC wiki 页的参考索引。',
            importance: 'medium',
            domains: ['aigc'],
            links: [{ label: 'Article', href: 'https://example.com/wechat/aigc-benchmark' }],
          },
        ],
      },
      {
        sourceType: 'x',
        title: 'X / Twitter',
        count: 4,
        items: [
          {
            id: 'x:agent-planning-thread',
            sourceType: 'x',
            title: 'Agent planning notes thread',
            summary: '偏阅读笔记性质，适合作为 follow 上的轻量记录。',
            importance: 'low',
            domains: ['agent'],
            links: [{ label: 'Thread', href: 'https://x.com/example/status/2' }],
          },
        ],
      },
      {
        sourceType: 'bilibili',
        title: 'Bilibili',
        count: 0,
        items: [],
      },
    ],
  },
]

export const wikiDomains: WikiDomain[] = [
  {
    slug: 'llm-vlm',
    name: 'LLM/VLM',
    summary: '基础模型与多模态模型总入口，关注能力边界、训练方式与推理表现。',
    definition: 'LLM/VLM 关注语言模型与视觉语言模型的能力扩展、对齐方式、后训练与多模态推理表现。',
    keyQuestions: [
      '后训练、合成数据与推理时扩展分别带来什么收益？',
      'VLM 的 grounding 与推理能力如何统一评估？',
      '模型能力应该如何服务后续 Agent 与具身系统？',
    ],
    representativeItems: [
      {
        title: 'Long-Horizon Manipulation via Trace-Conditioned VLA Planning',
        note: '可作为 LLM/VLM 与具身交叉场景的近期代表条目。',
        href: 'https://arxiv.org/abs/2604.21924',
      },
      {
        title: 'CorridorVLA',
        note: 'VLM 接口与 action head 设计的示例。',
        href: 'https://arxiv.org/abs/2604.21241',
      },
    ],
    recentSignals: [
      '近期更新集中在 multimodal reasoning、grounding 与 post-training。',
      '值得后续补一个“模型能力 / 数据路线 / 推理范式”三层索引。',
    ],
  },
  {
    slug: 'physical-embodied-intelligence',
    name: 'Physical/Embodied Intelligence',
    summary: '物理/具身智能总入口，覆盖机器人操作、感知、规划、控制与 sim2real。',
    definition: 'Physical/Embodied Intelligence 关注智能体如何在物理环境中感知、决策并执行任务。',
    keyQuestions: [
      '数据、模型、控制器三者如何形成稳定闭环？',
      'sim2real 的核心瓶颈到底在数据还是在策略表达？',
      '应该如何组织多源 follow 信息，形成长期知识图谱？',
    ],
    representativeItems: [{ title: '具身数据合成路线梳理', note: '适合作为领域页中“数据路线”章节的参考。' }],
    recentSignals: [
      '近期 follow 更新中，Physical/Embodied Intelligence 更适合作为聚合域而不是单条 item 的唯一归属。',
      '需要设计子主题到 wiki 的跳转关系。',
    ],
  },
  {
    slug: 'aigc',
    name: 'AIGC',
    summary: '图像、视频与多模态生成方向入口，关注生成质量、控制性与评测。',
    definition: 'AIGC 关注生成式图像、视频与多模态内容的模型能力、数据配方、控制接口与评测方法。',
    keyQuestions: [
      '图像与视频生成该如何统一建模与评测？',
      '控制性、可编辑性和生成质量该如何取舍？',
    ],
    representativeItems: [{ title: '图像/视频生成路线与 benchmark 对比', note: '适合作为 AIGC 领域页入口的资料型条目。' }],
    recentSignals: ['建议后续按“image / video / editing / evaluation”四个子类拆分。'],
  },
  {
    slug: 'agent',
    name: 'Agent',
    summary: '工具调用、规划执行、工作流编排与智能体系统设计。',
    definition: 'Agent 关注模型如何结合工具、环境状态与规划机制，完成多步任务与闭环执行。',
    keyQuestions: [
      'tool use、planning、memory 与 feedback loop 如何组合？',
      'Agent 应该如何与基础模型和外部环境对齐？',
    ],
    representativeItems: [{ title: 'Planning-Friendly World Models for Embodied Control', note: '适合作为 Agent 与具身控制交叉问题的入口条目。' }],
    recentSignals: ['后续可把 planning、tool use、workflow、evaluation 分成独立 topic。'],
  },
]

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, 'utf-8')) as T
}

function normalizeImportance(value: unknown): FollowImportance {
  return value === 'high' || value === 'medium' || value === 'low' ? value : 'medium'
}

function normalizeGeneratedDigests(root: string): FollowDigest[] {
  const dailyDir = resolve(root, 'daily')
  if (!existsSync(dailyDir)) return []
  const files = readdirSync(dailyDir)
    .filter((name) => name.endsWith('.json'))
    .sort()
    .reverse()

  return files.map((name) => {
    const digest = readJson<GeneratedDigest>(resolve(dailyDir, name))
    return {
      date: String(digest.date || name.replace(/\.json$/, '')),
      summary: String(digest.summary || '').trim(),
      highlights: Array.isArray(digest.highlights) ? digest.highlights.map((item) => String(item)) : [],
      counts: {
        arxiv: Number(digest.counts?.arxiv || 0),
        wechat: Number(digest.counts?.wechat || 0),
        x: Number(digest.counts?.x || 0),
        bilibili: Number(digest.counts?.bilibili || 0),
      },
      sections: Array.isArray(digest.sections)
        ? digest.sections.map((section) => ({
            sourceType: section.source_type,
            title: String(section.title || section.source_type),
            count: Array.isArray(section.items) ? section.items.length : Number(section.count || 0),
            items: Array.isArray(section.items)
              ? section.items.map((item) => ({
                  id: String(item.id || ''),
                  sourceType: item.source_type,
                  title: String(item.title || ''),
                  summary: String(item.summary || ''),
                  url: String(item.url || ''),
                  importance: normalizeImportance(item.importance),
                  includeInFollow: item.include_in_follow !== false,
                  domains: Array.isArray(item.domains)
                    ? item.domains.map((domain) => String(domain.slug || '')).filter(Boolean)
                    : [],
                  links: Array.isArray(item.links)
                    ? item.links
                        .filter((link) => link && link.href)
                        .map((link) => ({ label: String(link.label || 'Link'), href: String(link.href) }))
                    : [],
                  authors: Array.isArray(item.authors) ? item.authors.map((author) => String(author)) : [],
                  categories: Array.isArray(item.categories) ? item.categories.map((category) => String(category)) : [],
                  authorMeta: Array.isArray(item.author_meta)
                    ? item.author_meta
                        .filter((author) => author && author.name)
                        .map((author) => ({
                          name: String(author.name || ''),
                          affiliations: Array.isArray(author.affiliations) ? author.affiliations.map((aff) => String(aff)) : [],
                          isFirstAuthor: Boolean(author.is_first_author),
                          isCorrespondingAuthor: Boolean(author.is_corresponding_author),
                        }))
                    : [],
                  firstAffiliation: String(item.first_affiliation || ''),
                  relatedOrganizations: Array.isArray(item.related_organizations)
                    ? item.related_organizations.map((organization) => String(organization)).filter(Boolean)
                    : [],
                  relatedCompanies: Array.isArray(item.related_companies)
                    ? item.related_companies.map((company) => String(company)).filter(Boolean)
                    : [],
                  hjfyUrl: String(item.hjfy_url || ''),
                  published: String(item.published || ''),
                  updated: String(item.updated || ''),
                  abstractEn: String(item.abstract_en || ''),
                  oneLinerZh: String(item.one_liner_zh || ''),
                  summaryCn: String(item.summary_cn || ''),
                  hotScore: Number(item.hot_score || 0),
                  overallScore: Number(item.overall_score || 0),
                  relevanceScore: Number(item.relevance_score || 0),
                  isFavorite: Boolean(item.is_favorite),
                }))
              : [],
          }))
        : [],
    }
  })
}

function flattenDigestItems(digests: FollowDigest[]): FollowSourceItem[] {
  return digests.flatMap((digest) =>
    digest.sections.flatMap((section) =>
      section.items
        .filter((item) => item.includeInFollow !== false)
        .map((item) => ({
          ...item,
          date: digest.date,
          sourceTitle: section.title,
        }))
    )
  )
}

function buildFollowDomainsFromDigests(digests: FollowDigest[]): FollowDomain[] {
  const latestDate = digests[0]?.date || ''
  const allItems = flattenDigestItems(digests)
  return baseFollowDomains.map((domain) => {
    const todayItems = allItems.filter((item) => item.date === latestDate && item.domains.includes(domain.slug))
    const weekItems = allItems.filter((item) => item.domains.includes(domain.slug))
    const recentHighlights = todayItems
      .slice()
      .sort((a, b) => IMPORTANCE_WEIGHT[b.importance] - IMPORTANCE_WEIGHT[a.importance])
      .slice(0, 2)
      .map((item) => item.title)

    return {
      ...domain,
      todayCount: todayItems.length,
      weekCount: weekItems.length,
      recentHighlights: recentHighlights.length > 0 ? recentHighlights : ['Waiting for generated follow data'],
    }
  })
}

function loadGeneratedState():
  | {
      digests: FollowDigest[]
      manifest: GeneratedManifest
    }
  | null {
  const GENERATED_FOLLOW_DIR = GENERATED_FOLLOW_DIR_CANDIDATES.find((path) =>
    existsSync(resolve(path, 'manifest.json'))
  )
  if (!GENERATED_FOLLOW_DIR) return null
  const manifestPath = resolve(GENERATED_FOLLOW_DIR, 'manifest.json')
  const manifest = readJson<GeneratedManifest>(manifestPath)
  const digests = normalizeGeneratedDigests(GENERATED_FOLLOW_DIR)
  if (!digests.length) return null
  return { digests, manifest }
}

const generatedState = loadGeneratedState()

export const followDigests: FollowDigest[] = generatedState?.digests || fallbackDigests
export const followDomains: FollowDomain[] = generatedState
  ? buildFollowDomainsFromDigests(generatedState.digests)
  : buildFollowDomainsFromDigests(fallbackDigests)
export const followSources: FollowSourceMeta[] = followSourceCatalog

export const allFollowItems: FollowSourceItem[] = flattenDigestItems(followDigests)

export const getWikiDomainBySlug = (slug: string) =>
  wikiDomains.find((domain) => domain.slug === slug)

export const getFollowDomainBySlug = (slug: string) =>
  followDomains.find((domain) => domain.slug === slug)

export const getFollowSourceByKey = (source: FollowSource) =>
  followSources.find((item) => item.source === source)

export const getItemsBySource = (source: FollowSource): FollowSourceItem[] =>
  allFollowItems
    .filter((item) => item.sourceType === source)
    .sort((a, b) => {
      if (a.date !== b.date) return a.date < b.date ? 1 : -1
      return IMPORTANCE_WEIGHT[b.importance] - IMPORTANCE_WEIGHT[a.importance]
    })

export const getSourceSummaries = (): FollowSourceSummary[] =>
  followSources.map((source) => {
    const items = getItemsBySource(source.source)
    return {
      ...source,
      totalCount: items.length,
      latestDate: items[0]?.date || '',
    }
  })

export const applyManifestToSourceSummaries = (
  sourceSummaries: FollowSourceSummary[],
  manifest: GeneratedManifest | null
): FollowSourceSummary[] => {
  if (!manifest || !Array.isArray(manifest.sources)) return sourceSummaries
  return sourceSummaries.map((source) => {
    const remote = manifest.sources?.find((item) => item.source === source.source)
    if (!remote) return source
    return {
      ...source,
      totalCount: Number(remote.count || source.totalCount || 0),
    }
  })
}

export const applyManifestToFollowDomains = (
  domains: FollowDomain[],
  manifest: GeneratedManifest | null
): FollowDomain[] => {
  if (!manifest || !Array.isArray(manifest.domains)) return domains
  return domains.map((domain) => {
    const remote = manifest.domains?.find((item) => item.slug === domain.slug)
    if (!remote) return domain
    return {
      ...domain,
      todayCount: Number(remote.count || domain.todayCount || 0),
      weekCount: Number(remote.count || domain.weekCount || 0),
      recentHighlights: domain.recentHighlights,
    }
  })
}
