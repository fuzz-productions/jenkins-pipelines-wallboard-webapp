import { OrganizationService } from './service'
import { call, put, takeLatest } from 'redux-saga/effects'
import {
  LoadOrganizations,
  LoadOrganizationsFailed,
  LoadOrganizationsSucceeded,
  OrganizationActionTypes,
} from './actions'


export class OrganizationSagas {

  constructor(private service: OrganizationService) {
  }

  loadOrganizations = function* loadOrgs(self: OrganizationSagas) {
    yield takeLatest(OrganizationActionTypes.LoadOrganizations, self._loadOrganizations.bind(null, self))
  }

  _loadOrganizations = function* (self: OrganizationSagas, action: LoadOrganizations) {
    try {
      const response = yield call(self.service.fetchOrganizationFolders)
      yield put(new LoadOrganizationsSucceeded(response))
    } catch (e) {
      console.log(e)
      yield put(new LoadOrganizationsFailed(e))
    }
  }
}
