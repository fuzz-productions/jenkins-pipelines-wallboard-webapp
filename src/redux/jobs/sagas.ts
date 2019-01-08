import { JobService } from './jobs_service'
import { call } from 'redux-saga/effects'
import { LoadJobsAction } from './actions'

export default class JobSagas {

  constructor(private service: JobService) {
  }

  loadJobs = function* loadJobs(self: JobSagas, action: LoadJobsAction) {
    yield call(self.service.fetchJobs, action.jobFolder)
  }
}
