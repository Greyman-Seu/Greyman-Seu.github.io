const ABSOLUTE_URL_RE = /^(?:[a-z]+:)?\/\//i

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '')
const trimLeadingSlash = (value: string) => value.replace(/^\/+/, '')

const isProjectMediaPath = (value: string) =>
  value.startsWith('/project-media/') || value.startsWith('project-media/')

export const mediaUrl = (value: string) => {
  if (!value || ABSOLUTE_URL_RE.test(value) || !isProjectMediaPath(value)) {
    return value
  }

  const base = import.meta.env.PUBLIC_R2_MEDIA_BASE_URL
  if (!base) {
    return value
  }

  return `${trimTrailingSlash(base)}/${trimLeadingSlash(value)}`
}
