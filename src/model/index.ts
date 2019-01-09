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

/**
 * Returns stable branches count
 */
export const stableBranches = (job: FolderJob): number => {
  return job.jobs
    .reduce((sum, current) => current.lastBuild && current.lastBuild.result == 'SUCCESS' ? sum + 1 : sum, 0)
}
