export interface FolderJob {
  displayName: string
  name: string
  jobs: Array<Job>
}

export interface Job {
  name: string,
  displayName: string,
  isInQueue: boolean,
  lastBuild?: BuildInfo
  buildable: boolean
}

export interface BuildInfo {
  timestamp: number
  result?: BuildResult
  displayName: string
  description: string
  building: boolean
  number: number
  culprits: Array<Culprit>
  actions: Array<BranchAction>
}

export interface BranchAction {
  causes?: Array<BranchEventCause>
}

export interface BranchEventCause {
  shortDescription: string
}

export interface Culprit {
  fullName: string
  absoluteUrl: string
}

export enum BuildResult {
  Failure = 'FAILURE',
  Success = 'SUCCESS',
  Unstable = 'UNSTABLE',
}

export interface BuildInfoWithJob {
  job: Job
  buildInfo: BuildInfo
  parentJobName: string
}

export interface OrganizationFolder {
  _class: string
  name: string
  url: string
}
