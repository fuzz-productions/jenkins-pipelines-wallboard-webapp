import { createSelector } from 'reselect'
import { selectAppState } from '../app.state.selectors'
import { AppState } from '../reducers'
import { SettingsState } from './reducer'

export const selectSettingsState = createSelector(selectAppState,
  (state: AppState) => state.settings)

export const selectProjectsModel = createSelector(selectSettingsState,
  (state: SettingsState) => state.projects)

export const selectSelectedOrg = createSelector(selectSettingsState,
  (state: SettingsState) => state.selectedOrg)

export const selectSelectedProjectFilter = createSelector(selectSettingsState,
  (state: SettingsState) => state.selectedProjectFilter)
