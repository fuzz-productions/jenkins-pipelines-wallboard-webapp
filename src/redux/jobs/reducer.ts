import { FolderJob } from '../../model'
import { JobActions, JobActionTypes } from './actions'
import { LoadingModel } from '../loading.model'
import { jobIsRoot } from '../../model/job_utils'

export interface JobsState {
  jobs: LoadingModel<Array<FolderJob>>
  folder: string
}

export const initialJobsState: JobsState = {
  jobs: LoadingModel.empty(),
  folder: '',
}

export function jobReducer(state: JobsState = initialJobsState, action: JobActions): JobsState {
  switch (action.type) {
    case JobActionTypes.LoadJobs:
      return {
        ...state,
        jobs: state.jobs.loading(),
        folder: action.jobFolder,
      }
    case JobActionTypes.LoadJobsFailed:
      return {
        ...state,
        jobs: LoadingModel.error(action.error),
      }
    case JobActionTypes.LoadJobsSucceeded:
      let { jobs } = action
      let projectList = []
      for (const key in jobs) {
        const value = jobs[key]
        value.jobs.sort((a, b) => {
          if (jobIsRoot(a)) {
            return -1
          } else if (jobIsRoot(b)) {
            return 1
          }
          const timeA = a.lastBuild && a.lastBuild.timestamp || 0
          const timeB = b.lastBuild && b.lastBuild.timestamp || 0
          if (timeA > timeB) {
            return -1
          }
          return 1
        })
        value.jobs = value.jobs.filter((job) => job.buildable)
        projectList.push(value)
      }
      projectList.sort((a, b) => {
        console.log(a.jobs.length)
        if (a.jobs.length > b.jobs.length) {
          return -1
        }
        return 1
      })
      return {
        ...state,
        jobs: LoadingModel.success(projectList),
      }
    default:
      return state
  }
}
