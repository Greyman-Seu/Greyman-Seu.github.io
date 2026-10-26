type TimelineEntry = {
  title: string
  date: string
  subtitle: string
  detail: string
}

type Project = {
  title: string
  date: string
  role: string
  link: string
  bullets: string[]
}

type Publication = {
  title: string
  venue: string
  url: string
}

type ResumeSection =
  | { title: string; kind: 'summary'; text: string }
  | { title: string; kind: 'timeline'; items: TimelineEntry[] }
  | { title: string; kind: 'skills'; items: { label: string; text: string }[] }
  | { title: string; kind: 'projects'; items: Project[] }
  | { title: string; kind: 'publications'; note: string; items: Publication[] }

export type InterviewResume = {
  name: string
  englishName: string
  headline: string
  email: string
  location: string
  website: string
  github: string
  scholar: string
  updated: string
  pdfUrl: string
  pages: { label: string; sections: ResumeSection[] }[]
}
