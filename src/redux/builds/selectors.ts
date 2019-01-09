import { createSelector } from 'reselect'
import { selectAppState } from '../app.state.selectors'
import { AppState } from '../reducers'
import { BuildsState } from './reducer'

export const selectBuildState = createSelector(selectAppState,
  (state: AppState) => state.builds)

export const selectMainBuildList = createSelector(selectBuildState,
  (state: BuildsState) => state.mainBuildList)

export const selectUnsuccessfulBuildsList = createSelector(selectBuildState,
  (state: BuildsState) => state.unsuccessfulBuildsList)
