import { createSelector } from 'reselect'
import { selectAppState } from '../app.state.selectors'
import { AppState } from '../reducers'
import { OrganizationState } from './reducer'


export const selectOrganizationState = createSelector(selectAppState,
  (state: AppState) => state.orgs)

export const selectOrgModel = createSelector(selectOrganizationState,
  (state: OrganizationState) => state.folders)

export const selectSelectedFolder = createSelector(selectOrganizationState,
  (state: OrganizationState) => state.selectedFolder)
