import { OrganizationService } from './service'
import { call, put, takeLatest } from 'redux-saga/effects'
import {
  LoadOrganizationsFailed,
  LoadOrganizationsSucceeded,
  OrganizationActionTypes,
  SelectOrganization,
} from './actions'
import { OrganizationStore } from './organization_store'


export class OrganizationSagas {

  constructor(private service: OrganizationService,
              private organizationStore: OrganizationStore) {
  }

  loadOrganizations = function* loadOrgs(self: OrganizationSagas) {
    yield takeLatest(OrganizationActionTypes.LoadOrganizations, self._loadOrganizations.bind(null, self))
  }

  _loadOrganizations = function* (self: OrganizationSagas) {
    try {
      const response = yield call(self.service.fetchOrganizationFolders)
      yield put(new LoadOrganizationsSucceeded(response))
    } catch (e) {
      console.log(e)
      yield put(new LoadOrganizationsFailed(e))
    }
  }

  saveOrganizationFolder = function* saveOrgs(self: OrganizationSagas) {
    yield takeLatest(OrganizationActionTypes.SelectOrganization, self._saveOrganizationFolder.bind(null, self))
  }

  _saveOrganizationFolder = (self: OrganizationSagas, action: SelectOrganization) => {
    self.organizationStore.setOrganization(action.folder)
  }

  loadOrganizationFolder = function* (self: OrganizationSagas) {
    yield takeLatest(OrganizationActionTypes.LoadOrganizationFolder, self._loadOrganizationFolder.bind(null, self))
  }

  _loadOrganizationFolder = function* (self: OrganizationSagas) {
    const organization = self.organizationStore.getOrganization()
    console.log('Loadiing initial organization', organization)
    yield put(new SelectOrganization(organization))
  }
}
