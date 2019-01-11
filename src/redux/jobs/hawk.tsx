import { connect } from 'react-redux'
import React from 'react'
import { Dispatch } from 'redux'
import { FilterJobs, LoadJobsAction } from './actions'
import { State } from '../reducers'
import { selectSelectedFolder } from '../organizations/selectors'
import { selectJobFilter } from './job.state.selectors'

export type JobsProps = {
  loadJobs: Function
  selectJobFilter: (name: string) => void
  organizationFolder: string
  jobFilter: string
}

export function jobsHawk(WrappedComponent: any) {
  const jobsHoc = (props: any) => (
    <WrappedComponent
      {...props}
    />
  )
  const mapStateToProps = (state: State) => ({
    organizationFolder: selectSelectedFolder(state),
    jobFilter: selectJobFilter(state),
  })
  const mapDispatchToProps = (dispatch: Dispatch) => ({
    loadJobs: () => dispatch(new LoadJobsAction()),
    selectJobFilter: (name: string) => dispatch(new FilterJobs(name)),
  })

  return connect(mapStateToProps, mapDispatchToProps)(jobsHoc)
}
