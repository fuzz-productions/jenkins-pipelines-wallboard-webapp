import { JobService } from './jobs_service'
import { call, put, takeLatest } from 'redux-saga/effects'
import { JobActionTypes, LoadJobsAction, LoadJobsFailed, LoadJobsSucceeded } from './actions'

export default class JobSagas {

  constructor(private service: JobService) {
  }

  loadJobs = function* loadJobs(self: JobSagas) {
    yield takeLatest(JobActionTypes.LoadJobs, self._loadJobs.bind(null, self))
  }

  _loadJobs = function* (self: JobSagas, action: LoadJobsAction) {
    try {
      const response = yield call(self.service.fetchJobs, action.jobFolder)
      yield put(new LoadJobsSucceeded(response))
    } catch (e) {
      console.log(e)
      yield put(new LoadJobsFailed(e))
    }
  }
}
