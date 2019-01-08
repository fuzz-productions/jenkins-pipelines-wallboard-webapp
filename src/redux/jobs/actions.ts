import { Action } from 'redux'
import { FolderJob } from '../../model'

export enum JobActionTypes {
  LoadJobs = '[Jobs] Load Jobs',
  LoadJobsSucceeded = '[Jobs] Load Jobs Succeeded',
  LoadJobsFailed = '[Jobs] Load Jobs Failed',
}

export class LoadJobsAction implements Action {
  readonly type = JobActionTypes.LoadJobs
  constructor(public jobFolder: string) {}
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

export type JobActions =
  | LoadJobsAction
  | LoadJobsSucceeded
  | LoadJobsFailed

