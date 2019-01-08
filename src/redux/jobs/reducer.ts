import { FolderJob } from '../../model'
import { JobActions, JobActionTypes } from './actions'
import { LoadingModel } from '../loading.model'

export interface JobsState {
  jobs: LoadingModel<Array<FolderJob>>
}

export const initialJobsState: JobsState = {
  jobs: LoadingModel.empty(),
}

export function jobReducer(state: JobsState = initialJobsState, action: JobActions): JobsState {
  switch (action.type) {
    case JobActionTypes.LoadJobs:
      return { jobs: state.jobs.loading() }
    case JobActionTypes.LoadJobsFailed:
      return { jobs: LoadingModel.error(action.error) }
    case JobActionTypes.LoadJobsSucceeded:
      let { jobs } = action
      let projectList = []
      console.log(jobs)
      for (const key in jobs) {
        const value = jobs[key]
        projectList.push(value)
      }
      projectList = projectList.sort(function (a, b) {
        console.log(a.jobs.length)
        if (a.jobs.length > b.jobs.length) {
          return -1
        }
        return 1
      })
      return { jobs: LoadingModel.success(projectList) }
    default:
      return state
  }
}
