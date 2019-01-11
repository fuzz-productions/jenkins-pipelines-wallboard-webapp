import { BuildResult, FolderJob, Job } from './index'

const nameStringRegex = new RegExp('( android | Android| ios| Ios)')

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
    .reduce((sum, current) => current.lastBuild && current.lastBuild.result === BuildResult.Success ? sum + 1 : sum, 0)
}

export const getUIName = (name: string): string => {
  return name.replace('-', ' ')
    .replace(nameStringRegex, ' ')
    .split(' ')
    .map((part) => capitalize(part))
    .join(' ')
    .trim()
}

///
export const capitalize = (string: string) => {
  if (string.length == 0) {
    return string
  }

  return string[0].toUpperCase() + string.substring(1)
}
