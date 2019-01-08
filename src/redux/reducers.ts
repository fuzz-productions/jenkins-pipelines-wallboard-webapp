import { combineReducers } from 'redux'
import { initialJobsState, jobReducer as jobs, JobsState } from './jobs/reducer'

export interface State {
  app: AppState
}

export interface AppState {
  jobs: JobsState,
}

export const initialAppState: AppState = {
  jobs: initialJobsState,
}

export default combineReducers<State>({
  app: combineReducers<AppState>({
    jobs,
  }),
})
