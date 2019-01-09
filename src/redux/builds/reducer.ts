import { BuildInfo, BuildInfoWithJob, Job } from '../../model'
import { JobActions, JobActionTypes } from '../jobs/actions'

export interface BuildsState {
  mainBuildList: Array<BuildInfoWithJob>
  unsuccessfulBuildsList: Array<BuildInfoWithJob>
}

export const initialBuildState: BuildsState = {
  mainBuildList: [],
  unsuccessfulBuildsList: [],
}

const buildInMainList = (job: Job, build: BuildInfo) => {
  return job.isInQueue || build.result == 'SUCCESS' || build.building
}

export function buildsReducer(state: BuildsState = initialBuildState, actions: JobActions): BuildsState {
  switch (actions.type) {
    case JobActionTypes.LoadJobsSucceeded:
      let flattenJobs: Array<BuildInfoWithJob> = []
      flattenJobs = flattenJobs.concat.apply([], actions.jobs.map((folderJob) => folderJob.jobs.map((job) => ({
        job: job,
        buildInfo: job.lastBuild!,
        parentJobName: folderJob.displayName,
      } as BuildInfoWithJob))))
        .filter((job) => job.job.lastBuild)
      // TODO: keep around successful builds from previous that do not match updated list.
      const mainBuildList = flattenJobs.filter((job) => buildInMainList(job.job, job.job.lastBuild!))
        .sort((a, b) => {
          if (a.buildInfo!.building) {
            return -1
          }
          if (b.buildInfo.building) {
            return 1
          }
          return a.buildInfo.timestamp - b.buildInfo.timestamp
        })
      const unsuccessfulBuildsList = flattenJobs.filter((job) => !buildInMainList(job.job, job.job.lastBuild!))
      return {
        ...state,
        mainBuildList,
        unsuccessfulBuildsList,
      }
    default:
      return state
  }
}
