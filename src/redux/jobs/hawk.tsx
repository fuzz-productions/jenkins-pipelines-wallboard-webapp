import { connect } from 'react-redux'
import React from 'react'
import { createStructuredSelector } from 'reselect'
import { selectJobModel } from './job.state.selectors'
import { Dispatch } from 'redux'
import { LoadJobsAction } from './actions'

export function jobsHawk(WrappedComponent: any) {
  const jobsHoc = (props: any) => (
    <WrappedComponent
      {...props}
    />
  )
  const mapStateToProps = createStructuredSelector({
    jobModel: selectJobModel,
  })
  const mapDispatchToProps = (dispatch: Dispatch) => ({
    loadJobs: () => dispatch(new LoadJobsAction('ios-projects')),
  })

  return connect(mapStateToProps, mapDispatchToProps)(jobsHoc)
}
