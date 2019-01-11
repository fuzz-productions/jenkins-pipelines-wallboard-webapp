import { BuildInfo, BuildInfoWithJob, BuildResult, Job } from '../../model'
import { JobActions, JobActionTypes } from '../jobs/actions'
import { LoadingModel } from '../loading.model'

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

export function buildsReducer(state: BuildsState = initialBuildState, actions: JobActions): BuildsState {
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
    case JobActionTypes.LoadJobsSucceeded:
      let flattenJobs: Array<BuildInfoWithJob> = []
      flattenJobs = flattenJobs.concat.apply([], actions.jobs.map((folderJob) => folderJob.jobs.map((job) => ({
        job: job,
        buildInfo: job.lastBuild!,
        parentJobName: folderJob.displayName,
      } as BuildInfoWithJob))))
        .filter((job) => job.job.lastBuild)
      const mainBuildList = flattenJobs.filter((job) => buildInMainList(job.job, job.job.lastBuild!))
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
      const unsuccessfulBuildsList = flattenJobs.filter((job) => !buildInMainList(job.job, job.job.lastBuild!))
        .sort((a, b) => {
          if (a.buildInfo.result === BuildResult.Failure && b.buildInfo.result === BuildResult.Failure) {
            return b.buildInfo.timestamp - a.buildInfo.timestamp
          } else if (a.buildInfo.result === BuildResult.Failure) {
            return -1
          } else if (b.buildInfo.result === BuildResult.Failure) {
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
