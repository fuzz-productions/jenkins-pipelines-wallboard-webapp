import { Action } from 'redux'
import { FolderJob } from '../../model'

export enum JobActionTypes {
  LoadJobs = '[Jobs] Load Jobs',
  LoadJobsSucceeded = '[Jobs] Load Jobs Succeeded',
  LoadJobsFailed = '[Jobs] Load Jobs Failed',
  FilterJobs = '[Jobs] Filter Jobs',
  SetJobFilter = '[Jobs] Set Job Filter',
  LoadJobFilter = '[Jobs] Load Job Filter'
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

export class SetJobFilter implements Action {
  readonly type = JobActionTypes.SetJobFilter

  constructor(public filter: string) {
  }
}

export class LoadJobFilter implements Action {
  readonly type = JobActionTypes.LoadJobFilter
}

export type JobActions =
  | LoadJobsAction
  | LoadJobsSucceeded
  | LoadJobsFailed
  | FilterJobs
  | SetJobFilter
  | LoadJobFilter

