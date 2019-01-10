import { AppState } from '../reducers'
import { createSelector } from 'reselect'
import { selectAppState } from '../app.state.selectors'
import { JobsState } from './reducer'

export const selectJobsState = createSelector(selectAppState,
  (state: AppState) => state.jobs)

export const selectJobModel = createSelector(selectJobsState,
  (state: JobsState) => state.jobs)

export const selectJobFolder = createSelector(selectJobsState,
  (state: JobsState) => state.folder)
