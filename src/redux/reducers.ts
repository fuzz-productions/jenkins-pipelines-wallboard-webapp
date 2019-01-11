import { combineReducers } from 'redux'
import { initialJobsState, jobReducer as jobs, JobsState } from './jobs/reducer'
import { buildsReducer as builds, BuildsState, initialBuildState } from './builds/reducer'
import { initialOrganizationState, organizationReducer as orgs, OrganizationState } from './organizations/reducer'
import { initialSettingsState, settingsReducer as settings, SettingsState } from './settings/reducer'

export interface State {
  app: AppState
}

export interface AppState {
  jobs: JobsState,
  builds: BuildsState
  orgs: OrganizationState
  settings: SettingsState
}

export const initialAppState: AppState = {
  jobs: initialJobsState,
  builds: initialBuildState,
  orgs: initialOrganizationState,
  settings: initialSettingsState,
}

export default combineReducers<State>({
  app: combineReducers<AppState>({
    jobs,
    builds,
    orgs,
    settings,
  }),
})
