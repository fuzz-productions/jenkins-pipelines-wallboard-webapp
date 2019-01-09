export interface FolderJob {
  displayName: string
  name: string
  jobs: Array<Job>
}

export interface Job {
  name: string,
  isInQueue: boolean,
  lastBuild?: BuildInfo
  buildable: boolean
}

export interface BuildInfo {
  timestamp: number
  result?: string
  displayName: string
  description: string
  building: boolean
  number: number
}

export interface BuildInfoWithJob {
  job: Job
  buildInfo: BuildInfo
  parentJobName: string
}

