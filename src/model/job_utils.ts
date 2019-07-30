import { BuildInfoWithJob, BuildResult, FolderJob, Job } from './index'

const nameStringRegex = new RegExp('( android | Android| ios| Ios)')

export const jobIsRoot = (job: Job): boolean => {
  const names = ['dev',
    'develop',
    'development',
    'master',
    'production',
    'staging',
    'sandbox']
  return !!names.find((name) => name === job.name)
}
/**
 * Returns stable branches count
 */
export const stableBranches = (job: FolderJob): number => {
  return job.jobs
    .reduce((sum, current) => current.lastBuild && current.lastBuild.result === BuildResult.Success ? sum + 1 : sum, 0)
}

/**
 * Returns failed builds count
 */
export const failedBuilds = (jobs: BuildInfoWithJob[]): number => {
  return (jobs || [])
    .reduce((sum, current) => current.job.lastBuild && current.job.lastBuild.result === BuildResult.Failure ? sum + 1 : sum, 0)
}

export const capitalize = (string: string) => {
  if (string.length === 0) {
    return string
  }

  return string[0].toUpperCase() + string.substring(1)
}

export const getUIName = (name: string): string => {
  return name.replace('-', ' ')
    .replace(nameStringRegex, ' ')
    .split(' ')
    .map((part) => capitalize(part))
    .join(' ')
    .trim()
}
