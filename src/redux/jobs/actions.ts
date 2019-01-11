import { Action } from 'redux'
import { FolderJob } from '../../model'

export enum JobActionTypes {
  LoadJobs = '[Jobs] Load Jobs',
  LoadJobsSucceeded = '[Jobs] Load Jobs Succeeded',
  LoadJobsFailed = '[Jobs] Load Jobs Failed',
  FilterJobs = '[Jobs] Filter Jobs',
}

export class LoadJobsAction implements Action {
  readonly type = JobActionTypes.LoadJobs
}

export class LoadJobsSucceeded implements Action {
  readonly type = JobActionTypes.LoadJobsSucceeded

  constructor(public jobs: Array<FolderJob>) {
  }
}

export class LoadJobsFailed implements Action {
  readonly type = JobActionTypes.LoadJobsFailed

  constructor(public error: Error) {
  }
}

export class FilterJobs implements Action {
  readonly type = JobActionTypes.FilterJobs

  constructor(public filter: string) {
  }
}

export type JobActions =
  | LoadJobsAction
  | LoadJobsSucceeded
  | LoadJobsFailed
  | FilterJobs

