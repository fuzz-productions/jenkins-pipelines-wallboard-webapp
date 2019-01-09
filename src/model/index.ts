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
  result: string
  displayName: string
  description: string
  building: boolean
  number: number
}


export const jobIsRoot = (job: Job): boolean => {
  const names = ['dev',
    'develop',
    'development',
    'master']
  return !!names.find((name) => name == job.name)
}
