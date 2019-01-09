import { combineReducers } from 'redux'
import { initialJobsState, jobReducer as jobs, JobsState } from './jobs/reducer'
import { buildsReducer as builds, BuildsState, initialBuildState } from './builds/reducer'

export interface State {
  app: AppState
}

export interface AppState {
  jobs: JobsState,
  builds: BuildsState
}

export const initialAppState: AppState = {
  jobs: initialJobsState,
  builds: initialBuildState,
}

export default combineReducers<State>({
  app: combineReducers<AppState>({
    jobs,
    builds,
  }),
})
