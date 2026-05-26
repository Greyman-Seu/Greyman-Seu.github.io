export const FOLLOW_DATA_BASE_URL =
  import.meta.env.PUBLIC_FOLLOW_DATA_BASE_URL || 'https://followhub.tenstep.top/follow'

// Default behavior:
// - local dev uses remote follow data
// - set PUBLIC_ENABLE_REMOTE_FOLLOW_DATA=false to debug local generated follow data
export const REQUIRE_REMOTE_FOLLOW_DATA = import.meta.env.PROD
export const ENABLE_REMOTE_FOLLOW_DATA =
  import.meta.env.PROD || import.meta.env.PUBLIC_ENABLE_REMOTE_FOLLOW_DATA !== 'false'
