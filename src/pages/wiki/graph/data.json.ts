import { allWikiSources, allWikiSyntheses, allWikiTopics, wikiGraphData } from '@/data/wiki'
import { mediaUrl } from '@/utils/media'

export const prerender = true

const MARKDOWN_IMAGE_RE = /(!\[[^\]]*\]\()([^)]+)(\))/g

const resolveGraphMedia = (value: unknown) =>
  typeof value === 'string' ? mediaUrl(value.trim()) : value

const resolveMarkdownImages = (value: unknown) => {
  if (typeof value !== 'string') return value

  return value.replace(MARKDOWN_IMAGE_RE, (_match, prefix, url, suffix) => {
    return `${prefix}${resolveGraphMedia(url)}${suffix}`
  })
}

const normalizeKey = (value: unknown) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/π/g, 'pi')
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '')

const sourceRoutes = new Map(
  allWikiSources.flatMap((source) => [
    [normalizeKey(source.slug), `/wiki/source/${source.slug}`],
    [normalizeKey(source.title), `/wiki/source/${source.slug}`]
  ])
)
const topicRoutes = new Map(
  allWikiTopics.flatMap((topic) => [
    [normalizeKey(topic.slug), `/wiki/topic/${topic.slug}`],
    [normalizeKey(topic.title), `/wiki/topic/${topic.slug}`]
  ])
)
const synthesisRoutes = new Map(
  allWikiSyntheses.flatMap((entry) => [
    [normalizeKey(entry.slug), `/wiki/synthesis/${entry.slug}`],
    [normalizeKey(entry.title), `/wiki/synthesis/${entry.slug}`]
  ])
)

const routeForNode = (node: Record<string, any>) => {
  const keys = [normalizeKey(node.id), normalizeKey(node.slug), normalizeKey(node.label)]
  const routes =
    node.type === 'source'
      ? sourceRoutes
      : node.type === 'topic'
        ? topicRoutes
        : node.type === 'synthesis'
          ? synthesisRoutes
          : new Map<string, string>()

  return keys.map((key) => routes.get(key)).find(Boolean) || '/wiki'
}

const aliasKey = (type: string, value: unknown) => `${type}:${normalizeKey(value)}`
const nodeAliases = (node: Record<string, any>) => [node.id, node.slug, node.label, node.title].filter(Boolean)

const graphNodeMap = new Map<string, Record<string, any>>()
const nodeIdByAlias = new Map<string, string>()

const registerNodeAliases = (node: Record<string, any>) => {
  nodeAliases(node).forEach((alias) => {
    const key = aliasKey(node.type, alias)
    if (!nodeIdByAlias.has(key)) nodeIdByAlias.set(key, node.id)
  })
}

const addNode = (node: Record<string, any>) => {
  graphNodeMap.set(node.id, node)
  registerNodeAliases(node)
}

const existingNodeId = (type: string, aliases: unknown[]) =>
  aliases.map((alias) => nodeIdByAlias.get(aliasKey(type, alias))).find(Boolean)

const wikiNodeContent = (title: string, summary?: string, body?: string) =>
  body || `# ${title}${summary ? `\n\n${summary}` : ''}`

const normalizeGraphNode = (node: Record<string, any>) => ({
  ...node,
  url: routeForNode(node),
  content: resolveMarkdownImages(node.content),
  images: Array.isArray(node.images) ? node.images.map(resolveGraphMedia) : node.images,
  heroImage: resolveGraphMedia(node.heroImage)
})

const upsertWikiNode = (fallback: Record<string, any>, aliases: unknown[]) => {
  const id = existingNodeId(fallback.type, aliases) || fallback.id
  const existing = graphNodeMap.get(id)
  const merged = existing
    ? {
        ...fallback,
        ...existing,
        id,
        slug: fallback.slug || existing.slug,
        label: existing.label || fallback.label,
        summary: existing.summary || fallback.summary,
        content: resolveMarkdownImages(existing.content || fallback.content),
        url: fallback.url || existing.url || routeForNode(existing),
        source_path: existing.source_path || fallback.source_path,
        publish_date: existing.publish_date || fallback.publish_date,
        heroImage: existing.heroImage || fallback.heroImage,
        images: existing.images || fallback.images
      }
    : fallback
  addNode(normalizeGraphNode(merged))
}

const wikiSourceNode = (source: (typeof allWikiSources)[number]) => ({
  id: source.slug,
  slug: source.slug,
  label: source.title,
  type: 'source',
  community: source.relatedTopicSlugs?.[0] || source.primaryDomainSlug || 'materials',
  summary: source.summary || source.tldr || source.title,
  content: wikiNodeContent(source.title, source.summary || source.tldr),
  source_path: source.sourceUrl || source.htmlUrl || source.pdfUrl || '',
  publish_date: source.publishDate || '',
  weight: 68,
  confidence: 'EXTRACTED',
  url: `/wiki/source/${source.slug}`,
  heroImage: resolveGraphMedia(source.heroImage),
  images: source.figureGallery?.map((figure) => resolveGraphMedia(figure.src)).filter(Boolean) || [],
  keywords: source.keywords || []
})

const wikiTopicNode = (topic: (typeof allWikiTopics)[number]) => ({
  id: topic.title || topic.slug,
  slug: topic.slug,
  label: topic.title,
  type: 'topic',
  community: topic.domain || 'topics',
  summary: topic.summary,
  content: wikiNodeContent(topic.title, topic.summary, topic.body),
  publish_date: topic.updatedDate || '',
  weight: 76,
  confidence: 'EXTRACTED',
  url: `/wiki/topic/${topic.slug}`
})

const wikiSynthesisNode = (entry: (typeof allWikiSyntheses)[number]) => ({
  id: entry.title || entry.slug,
  slug: entry.slug,
  label: entry.title,
  type: 'synthesis',
  community: 'synthesis',
  summary: entry.summary,
  content: wikiNodeContent(entry.title, entry.summary, entry.body),
  publish_date: entry.updatedDate || '',
  weight: 84,
  confidence: 'EXTRACTED',
  url: `/wiki/synthesis/${entry.slug}`
})

;((wikiGraphData.nodes || []) as Record<string, any>[]).forEach((node) => addNode(normalizeGraphNode(node)))
allWikiSources.forEach((source) => upsertWikiNode(wikiSourceNode(source), [source.slug, source.title]))
allWikiTopics.forEach((topic) => upsertWikiNode(wikiTopicNode(topic), [topic.slug, topic.title]))
allWikiSyntheses.forEach((entry) => upsertWikiNode(wikiSynthesisNode(entry), [entry.slug, entry.title]))

const graphNodes = Array.from(graphNodeMap.values())
const nodeIdFor = (type: string, ...aliases: unknown[]) => existingNodeId(type, aliases) || ''

const graphEdges: Record<string, any>[] = []
const edgeKeys = new Set<string>()
const addEdge = (source: string, target: string, edge: Record<string, any> = {}) => {
  if (!source || !target || source === target) return
  const key = [source, target].sort().join('::')
  if (edgeKeys.has(key)) return
  edgeKeys.add(key)
  graphEdges.push({
    id: edge.id || `wiki-edge-${graphEdges.length + 1}`,
    source,
    target,
    from: source,
    to: target,
    type: edge.type || edge.confidence || 'EXTRACTED',
    confidence: edge.confidence || edge.type || 'EXTRACTED',
    weight: edge.weight ?? 0.72,
    signals: edge.signals || {},
    source_signal_available: edge.source_signal_available === true
  })
}

;((wikiGraphData.edges || []) as Record<string, any>[]).forEach((edge) => {
  const source = graphNodeMap.has(edge.source) ? edge.source : graphNodeMap.has(edge.from) ? edge.from : ''
  const target = graphNodeMap.has(edge.target) ? edge.target : graphNodeMap.has(edge.to) ? edge.to : ''
  addEdge(source, target, edge)
})

allWikiSources.forEach((source) => {
  const sourceId = nodeIdFor('source', source.slug, source.title)
  ;(source.relatedTopicSlugs || []).forEach((topicSlug) => {
    addEdge(sourceId, nodeIdFor('topic', topicSlug), { type: 'EXTRACTED', weight: 0.82 })
  })
})

allWikiTopics.forEach((topic) => {
  const topicId = nodeIdFor('topic', topic.slug, topic.title)
  ;(topic.relatedSourceSlugs || []).forEach((sourceSlug) => {
    addEdge(topicId, nodeIdFor('source', sourceSlug), { type: 'EXTRACTED', weight: 0.82 })
  })
  ;(topic.relatedTopicSlugs || []).forEach((topicSlug) => {
    addEdge(topicId, nodeIdFor('topic', topicSlug), { type: 'INFERRED', weight: 0.62 })
  })
  ;(topic.relatedSynthesisSlugs || []).forEach((slug) => {
    addEdge(topicId, nodeIdFor('synthesis', slug), { type: 'EXTRACTED', weight: 0.78 })
  })
})

allWikiSyntheses.forEach((entry) => {
  const synthesisId = nodeIdFor('synthesis', entry.slug, entry.title)
  ;(entry.relatedTopicSlugs || []).forEach((topicSlug) => {
    addEdge(synthesisId, nodeIdFor('topic', topicSlug), { type: 'EXTRACTED', weight: 0.84 })
  })
  ;(entry.relatedSourceSlugs || []).forEach((sourceSlug) => {
    addEdge(synthesisId, nodeIdFor('source', sourceSlug), { type: 'EXTRACTED', weight: 0.76 })
  })
})

const graphPayload = {
  ...wikiGraphData,
  meta: {
    ...wikiGraphData.meta,
    wiki_title: '知识图谱',
    total_nodes: graphNodes.length,
    total_edges: graphEdges.length
  },
  nodes: graphNodes,
  edges: graphEdges
}

export async function GET() {
  return new Response(JSON.stringify(graphPayload), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=60'
    }
  })
}
