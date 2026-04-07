const ABSOLUTE_URL_RE = /^(?:[a-z]+:)?\/\//i
const DEFAULT_MEDIA_BASE_URL = 'https://media.tenstep.top'

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '')
const trimLeadingSlash = (value: string) => value.replace(/^\/+/, '')

const isProjectMediaPath = (value: string) =>
  value.startsWith('/project-media/') ||
  value.startsWith('project-media/') ||
  value.startsWith('/works/') ||
  value.startsWith('works/')

export const getMediaBaseUrl = () =>
  import.meta.env.PUBLIC_R2_MEDIA_BASE_URL || DEFAULT_MEDIA_BASE_URL

export const mediaUrl = (value: string) => {
  if (!value || ABSOLUTE_URL_RE.test(value) || !isProjectMediaPath(value)) {
    return value
  }

  const base = getMediaBaseUrl()

  return `${trimTrailingSlash(base)}/${trimLeadingSlash(value)}`
}
