export const WIKI_DATA_BASE_URL =
  import.meta.env.PUBLIC_WIKI_DATA_BASE_URL || 'https://followhub.tenstep.top/wiki'

export const REQUIRE_REMOTE_WIKI_DATA = import.meta.env.PROD
export const ENABLE_REMOTE_WIKI_DATA =
  import.meta.env.PROD || import.meta.env.PUBLIC_ENABLE_REMOTE_WIKI_DATA === 'true'
