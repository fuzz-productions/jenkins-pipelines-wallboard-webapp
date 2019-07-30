import { BuildInfo, BuildInfoWithJob, BuildResult, Job } from '../../model'
import { JobActions, JobActionTypes } from '../jobs/actions'
import { LoadingModel } from '../loading.model'
import { BuildActions, BuildActionTypes } from './actions'
import { OrganizationActions, OrganizationActionTypes } from '../organizations/actions'
import { jobIsRoot } from '../../model/job_utils'

export interface BuildsState {
  mainBuildList: Array<BuildInfoWithJob>
  unsuccessfulBuildsList: Array<BuildInfoWithJob>
  buildsStatus: LoadingModel<any>
}

export const initialBuildState: BuildsState = {
  mainBuildList: [],
  unsuccessfulBuildsList: [],
  buildsStatus: LoadingModel.empty(),
}

const buildInMainList = (job: Job, build: BuildInfo) => {
  return job.isInQueue || build.result === BuildResult.Success || build.building
}

export function buildsReducer(state: BuildsState = initialBuildState,
                              actions: JobActions | BuildActions | OrganizationActions): BuildsState {
  switch (actions.type) {
    case JobActionTypes.LoadJobs:
      return {
        ...state,
        buildsStatus: state.buildsStatus.loading(),
      }
    case JobActionTypes.LoadJobsFailed:
      return {
        ...state,
        buildsStatus: LoadingModel.error(actions.error),
      }
    case OrganizationActionTypes.SelectOrganization:
      return {
        ...state,
        ...initialBuildState,
      }
    case BuildActionTypes.BuildsReceived:
      const mainBuildList = actions.buildInfo.filter((job) => buildInMainList(job.job, job.job.lastBuild!))
        .sort((a, b) => {
          if (a.buildInfo.building && b.buildInfo.building) {
            return b.buildInfo.timestamp - a.buildInfo.timestamp
          } else if (a.buildInfo.building) {
            return -1
          } else if (b.buildInfo.building) {
            return 1
          }
          return b.buildInfo.timestamp - a.buildInfo.timestamp
        })
      const unsuccessfulBuildsList = actions.buildInfo.filter((job) => !buildInMainList(job.job, job.job.lastBuild!))
        .sort((a, b) => {
          if (a.buildInfo.result === BuildResult.Failure && b.buildInfo.result === BuildResult.Failure) {
            if (jobIsRoot(a.job) && !jobIsRoot(b.job)) {
              return -1
            } else if (jobIsRoot(b.job) && !jobIsRoot(a.job)) {
              return 1
            }
            return b.buildInfo.timestamp - a.buildInfo.timestamp
          } else if (a.buildInfo.result === BuildResult.Failure) {
            return -1
          } else if (b.buildInfo.result === BuildResult.Failure) {
            return 1
          } else if (a.buildInfo.result === BuildResult.Unstable && b.buildInfo.result === BuildResult.Unstable) {
            return b.buildInfo.timestamp - a.buildInfo.timestamp
          } else if (a.buildInfo.result === BuildResult.Unstable) {
            return -1
          } else if (b.buildInfo.result === BuildResult.Unstable) {
            return 1
          }
          return b.buildInfo.timestamp - a.buildInfo.timestamp
        })
      return {
        ...state,
        mainBuildList,
        unsuccessfulBuildsList,
        buildsStatus: LoadingModel.success(),
      }
    default:
      return state
  }
}
