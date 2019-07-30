import { connect } from 'react-redux'
import React from 'react'
import { Dispatch } from 'redux'
import { FilterJobs, LoadJobFilter, LoadJobsAction } from './actions'
import { State } from '../reducers'
import { selectSelectedFolder } from '../organizations/selectors'
import { selectJobFilter } from './job.state.selectors'

export interface JobsProps {
  loadJobs: Function
  selectJobFilter: (name: string) => void
  organizationFolder: string
  jobFilter?: string
  loadJobFilter: () => void
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
    loadJobFilter: () => dispatch(new LoadJobFilter()),
  })

  return connect(mapStateToProps, mapDispatchToProps)(jobsHoc)
}
