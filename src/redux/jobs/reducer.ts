import { FolderJob } from '../../model'
import { JobActions, JobActionTypes } from './actions'
import { LoadingModel } from '../loading.model'
import { jobIsRoot } from '../../model/job_utils'
import { OrganizationActions, OrganizationActionTypes } from '../organizations/actions'

export interface JobsState {
  jobs: LoadingModel<Array<FolderJob>>
  jobFilter?: string
}

export const initialJobsState: JobsState = {
  jobs: LoadingModel.empty(),
}

export function jobReducer(state: JobsState = initialJobsState, action: JobActions | OrganizationActions): JobsState {
  switch (action.type) {
    case JobActionTypes.FilterJobs:
    case JobActionTypes.SetJobFilter:
      return {
        ...state,
        jobFilter: action.filter,
      }
    case OrganizationActionTypes.SelectOrganization:
      return {
        ...state,
        jobs: LoadingModel.empty(),
      }
    case JobActionTypes.LoadJobs:
      return {
        ...state,
        jobs: state.jobs.loading(),
      }
    case JobActionTypes.LoadJobsFailed:
      return {
        ...state,
        jobs: LoadingModel.error(action.error),
      }
    case JobActionTypes.LoadJobsSucceeded:
      const { jobs } = action
      const projectList = []
      for (const job of jobs) {
        const value = job
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
        value.jobs = value.jobs.filter(j => j.buildable)
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
