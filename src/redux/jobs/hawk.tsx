import { connect } from 'react-redux'
import React from 'react'
import { selectJobModel } from './job.state.selectors'
import { Dispatch } from 'redux'
import { LoadJobsAction } from './actions'
import { State } from '../reducers'

export function jobsHawk(WrappedComponent: any) {
  const jobsHoc = (props: any) => (
    <WrappedComponent
      {...props}
    />
  )
  const mapStateToProps = (state: State) => ({
    jobModel: selectJobModel(state),
  })
  const mapDispatchToProps = (dispatch: Dispatch) => ({
    loadJobs: () => dispatch(new LoadJobsAction('ios-projects')),
  })

  return connect(mapStateToProps, mapDispatchToProps)(jobsHoc)
}
