import { combineReducers } from 'redux'
import { initialJobsState, jobReducer as jobs, JobsState } from './jobs/reducer'
import { buildsReducer as builds, BuildsState, initialBuildState } from './builds/reducer'
import { initialOrganizationState, organizationReducer as orgs, OrganizationState } from './organizations/reducer'

export interface State {
  app: AppState
}

export interface AppState {
  jobs: JobsState,
  builds: BuildsState
  orgs: OrganizationState
}

export const initialAppState: AppState = {
  jobs: initialJobsState,
  builds: initialBuildState,
  orgs: initialOrganizationState,
}

export default combineReducers<State>({
  app: combineReducers<AppState>({
    jobs,
    builds,
    orgs,
  }),
})
