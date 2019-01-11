import {
  LoadProjectsFailed,
  LoadProjectsSucceeded,
  SelectTempOrganizationSetting,
  SettingsActionTypes,
} from './actions'
import { JobService } from '../jobs/jobs_service'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import { selectSelectedOrg } from './selectors'
import { selectSelectedFolder } from '../organizations/selectors'


export class SettingsSagas {

  constructor(private jobService: JobService) {
  }

  organizationFolderChanged = function* orgChanged(self: SettingsSagas) {
    yield takeLatest(SettingsActionTypes.SelectTempOrganizationSetting, self._organizationFolderChanged.bind(null, self))
  }

  _organizationFolderChanged = function* (self: SettingsSagas, action: SelectTempOrganizationSetting) {
    try {
      const response = yield call(self.jobService.fetchJobs, action.folder.value)
      yield put(new LoadProjectsSucceeded(response))
    } catch (e) {
      console.log(e)
      yield put(new LoadProjectsFailed(e))
    }
  }

  fetchProjects = function* (self: SettingsSagas) {
    yield takeLatest(SettingsActionTypes.LoadProjects, self._fetchProjects.bind(null, self))
  }

  _fetchProjects = function* (self: SettingsSagas) {
    console.log('Loading projects')
    const folder = yield select(selectSelectedOrg)
    let folderName = folder && folder.value
    if (!folderName) {
      // fall back on selected folder
      folderName = yield select(selectSelectedFolder)
    }
    console.log('Found folder name', folderName)
    try {
      const response = yield call(self.jobService.fetchJobs, folderName)
      yield put(new LoadProjectsSucceeded(response))
    } catch (e) {
      console.log(e)
      yield put(new LoadProjectsFailed(e))
    }
  }
}
