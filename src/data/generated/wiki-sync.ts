import sources from './wiki-sync/sources.json'
import topics from './wiki-sync/topics.json'
import syntheses from './wiki-sync/synthesis.json'
import graphData from './wiki-sync/graph-data.json'

export type SyncedWikiSource = (typeof sources)[number]
export type SyncedWikiTopic = (typeof topics)[number]
export type SyncedWikiSynthesis = (typeof syntheses)[number]
export type SyncedWikiGraphData = typeof graphData

export const syncedWikiSources = sources as SyncedWikiSource[]
export const syncedWikiTopics = topics as SyncedWikiTopic[]
export const syncedWikiSyntheses = syntheses as SyncedWikiSynthesis[]
export const syncedWikiGraphData = graphData as SyncedWikiGraphData
