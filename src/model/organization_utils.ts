import { capitalize } from './job_utils'

export const getOrgUIName = (name: string) => name.replace('-', ' ')
  .split(' ')
  .map((part) => capitalize(part))
  .join(' ')
  .trim()
