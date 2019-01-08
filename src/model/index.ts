export interface FolderJob {
  displayName: string
  name: string
  jobs: Array<Job>
}

export interface Job {
  name: string,
  isInQueue: boolean,
  lastBuild?: BuildInfo
  color: string
}

export interface BuildInfo {
  timestamp: number
  result: string
  displayName: string
  description: string
  building: boolean
  number: number
}
