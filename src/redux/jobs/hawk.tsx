import { connect } from 'react-redux'
import React from 'react'
import { Dispatch } from 'redux'
import { LoadJobsAction } from './actions'
import { State } from '../reducers'
import { selectSelectedFolder } from '../organizations/selectors'

export type JobsProps = {
  loadJobs: Function
  jobFolder: string
}

export function jobsHawk(WrappedComponent: any) {
  const jobsHoc = (props: any) => (
    <WrappedComponent
      {...props}
    />
  )
  const mapStateToProps = (state: State) => ({
    jobFolder: selectSelectedFolder(state),
  })
  const mapDispatchToProps = (dispatch: Dispatch) => ({
    loadJobs: () => dispatch(new LoadJobsAction()),
  })

  return connect(mapStateToProps, mapDispatchToProps)(jobsHoc)
}
