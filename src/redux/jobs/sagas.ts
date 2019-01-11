import { JobService } from './jobs_service'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import { FilterJobs, JobActionTypes, LoadJobsFailed, LoadJobsSucceeded } from './actions'
import { selectSelectedFolder } from '../organizations/selectors'
import { OrganizationActionTypes, SelectOrganization } from '../organizations/actions'
import { OrganizationStore } from '../organizations/organization_store'
import { BuildInfoWithJob, FolderJob } from '../../model'
import { BuildsReceived } from '../builds/actions'
import { selectJobFilter, selectJobModel } from './job.state.selectors'
import { LoadingModel } from '../loading.model'
import { JobConstants } from './constants'

export default class JobSagas {

  constructor(private service: JobService,
              private organizationStore: OrganizationStore) {
  }

  loadJobs = function* loadJobs(self: JobSagas) {
    yield takeLatest(JobActionTypes.LoadJobs, self._loadJobs.bind(null, self))
  }

  _loadJobs = function* (self: JobSagas) {
    try {
      const folder = yield select(selectSelectedFolder)
      if (folder === '') { // missing folder on initial load.
        // selecting a new one will already trigger jobs to load.
        const newFolder = self.organizationStore.getOrganization()
        yield put(new SelectOrganization(newFolder))
      } else {
        const response: Array<FolderJob> = yield call(self.service.fetchJobs, folder)
        yield put(new LoadJobsSucceeded(response))
        yield self.sendBuildsReceivedWithFilter(self, response)
      }
    } catch (e) {
      console.log(e)
      yield put(new LoadJobsFailed(e))
    }
  }

  private sendBuildsReceivedWithFilter = function* (self: JobSagas, response: Array<FolderJob>) {
    const filteredJob = yield select(selectJobFilter)
    yield self.sendBuildsReceived(response, filteredJob)
  }

  private sendBuildsReceived = function* (response: Array<FolderJob>, filter: string | undefined) {
    let filteredJob = filter
    if (filteredJob === '' || filteredJob === JobConstants.FilterViewAll) {
      filteredJob = undefined
    }
    let flattenJobs: Array<BuildInfoWithJob> = []
    flattenJobs = flattenJobs.concat.apply([], response.map((folderJob) => folderJob.jobs.map((job) => ({
      job: job,
      buildInfo: job.lastBuild!,
      parentJobName: folderJob.displayName,
    } as BuildInfoWithJob))))
      .filter((job) => job.job.lastBuild && (!filteredJob || filteredJob === job.parentJobName))
    yield put(new BuildsReceived(flattenJobs))
  }

  organizationFolderChanged = function* orgChanged(self: JobSagas) {
    yield takeLatest(OrganizationActionTypes.SelectOrganization, self._organizationFolderChanged.bind(null, self))
  }

  _organizationFolderChanged = function* (self: JobSagas, action: SelectOrganization) {
    try {
      const response = yield call(self.service.fetchJobs, action.folder)
      yield put(new LoadJobsSucceeded(response))
      yield self.sendBuildsReceivedWithFilter(self, response)
    } catch (e) {
      console.log(e)
      yield put(new LoadJobsFailed(e))
    }
  }

  jobsFiltered = function* (self: JobSagas) {
    yield takeLatest(JobActionTypes.FilterJobs, self._jobsFiltered.bind(null, self))
  }

  _jobsFiltered = function* (self: JobSagas, action: FilterJobs) {
    const response: LoadingModel<Array<FolderJob>> = yield select(selectJobModel)
    const jobs = response.optionalSuccess || []
    console.log('Jobs filtered', action.filter)
    yield self.sendBuildsReceived(jobs, action.filter)
  }
}
