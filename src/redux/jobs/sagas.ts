import { JobService } from './jobs_service'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import { JobActionTypes, LoadJobsFailed, LoadJobsSucceeded } from './actions'
import { selectSelectedFolder } from '../organizations/selectors'
import { OrganizationActionTypes, SelectOrganization } from '../organizations/actions'

export default class JobSagas {

  constructor(private service: JobService) {
  }

  loadJobs = function* loadJobs(self: JobSagas) {
    yield takeLatest(JobActionTypes.LoadJobs, self._loadJobs.bind(null, self))
  }

  _loadJobs = function* (self: JobSagas) {
    try {
      const folder = yield select(selectSelectedFolder)
      const response = yield call(self.service.fetchJobs, folder)
      yield put(new LoadJobsSucceeded(response))
    } catch (e) {
      console.log(e)
      yield put(new LoadJobsFailed(e))
    }
  }

  organizationFolderChanged = function* orgChanged(self: JobSagas) {
    yield takeLatest(OrganizationActionTypes.SelectOrganization, self._organizationFolderChanged.bind(null, self))
  }

  _organizationFolderChanged = function* (self: JobSagas, action: SelectOrganization) {
    try {
      const response = yield call(self.service.fetchJobs, action.folder)
      yield put(new LoadJobsSucceeded(response))
    } catch (e) {
      console.log(e)
      yield put(new LoadJobsFailed(e))
    }
  }

}
