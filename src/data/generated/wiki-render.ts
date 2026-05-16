import { marked } from 'marked'
import { allWikiSources, allWikiSyntheses, allWikiTopics } from '../wiki'

marked.setOptions({
  gfm: true,
  breaks: false,
})

const normalizeLookupKey = (value: string) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/^来源:\s*/, '')
    .replace(/π/g, 'pi')
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '')

const sourceByKey = new Map(
  allWikiSources.flatMap((source) => [
    [normalizeLookupKey(source.slug), source.slug],
    [normalizeLookupKey(source.title), source.slug]
  ])
)
const topicByKey = new Map(
  allWikiTopics.flatMap((topic) => [
    [normalizeLookupKey(topic.slug), topic.slug],
    [normalizeLookupKey(topic.title), topic.slug]
  ])
)
const synthesisByKey = new Map(
  allWikiSyntheses.flatMap((entry) => [
    [normalizeLookupKey(entry.slug), entry.slug],
    [normalizeLookupKey(entry.title), entry.slug]
  ])
)

const resolveRouteSlug = (collection: Map<string, string>, label: string, pathStem: string) =>
  collection.get(normalizeLookupKey(label)) || collection.get(normalizeLookupKey(pathStem)) || pathStem

const normalizeWikiRoutes = (value: string) => {
  const text = String(value || '')
    .replace(/\[([^\]]+)\]\(\.\.\/sources\/([^)]+?)\.md(?:#[^)]+)?\)/g, (_match, label, pathStem) => {
      const slug = resolveRouteSlug(sourceByKey, label, pathStem)
      return `[${label}](/wiki/source/${slug})`
    })
    .replace(/\[([^\]]+)\]\(\.\.\/topics\/([^)]+?)\.md(?:#[^)]+)?\)/g, (_match, label, pathStem) => {
      const slug = resolveRouteSlug(topicByKey, label, pathStem)
      return `[${label}](/wiki/topic/${slug})`
    })
    .replace(/\[([^\]]+)\]\(\.\.\/synthesis\/([^)]+?)\.md(?:#[^)]+)?\)/g, (_match, label, pathStem) => {
      const slug = resolveRouteSlug(synthesisByKey, label, pathStem)
      return `[${label}](/wiki/synthesis/${slug})`
    })

  return text.replace(/\[\[([^\]]+)\]\]/g, (_match, label) => {
    const key = normalizeLookupKey(label)
    const sourceSlug = sourceByKey.get(key)
    if (sourceSlug) return `[${label}](/wiki/source/${sourceSlug})`
    const topicSlug = topicByKey.get(key)
    if (topicSlug) return `[${label}](/wiki/topic/${topicSlug})`
    const synthesisSlug = synthesisByKey.get(key)
    if (synthesisSlug) return `[${label}](/wiki/synthesis/${synthesisSlug})`
    return label
  })
}

export const renderWikiSection = (value: string) => {
  const text = normalizeWikiRoutes(String(value || '').trim())
  if (!text) return ''
  return marked.parse(text) as string
}
