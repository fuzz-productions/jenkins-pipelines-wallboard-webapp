import React from 'react'
import { State } from '../reducers'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { selectMainBuildList, selectUnsuccessfulBuildsList } from './selectors'
import { BuildInfoWithJob } from '../../model'

export type BuildsProps = {
  mainBuildList: Array<BuildInfoWithJob>
  unsuccessfulBuildsList: Array<BuildInfoWithJob>
}

export function buildsHawk(WrappedComponent: any) {
  const buildsHoc = (props: any) => (
    <WrappedComponent
      {...props}
    />
  )
  const mapStateToProps = (state: State) => ({
    mainBuildList: selectMainBuildList(state),
    unsuccessfulBuildsList: selectUnsuccessfulBuildsList(state),
  })
  const mapDispatchToProps = (dispatch: Dispatch) => ({})

  return connect(mapStateToProps, mapDispatchToProps)(buildsHoc)
}
