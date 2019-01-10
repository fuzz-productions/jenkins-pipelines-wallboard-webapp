import { connect } from 'react-redux'
import React from 'react'
import { selectJobModel } from './job.state.selectors'
import { Dispatch } from 'redux'
import { LoadJobsAction } from './actions'
import { State } from '../reducers'
import { LoadingModel } from '../loading.model'
import { FolderJob } from '../../model'
import { selectSelectedFolder } from '../organizations/selectors'

export type JobsProps = {
  loadJobs: Function
  jobModel: LoadingModel<Array<FolderJob>>
  jobFolder: string
}

export function jobsHawk(WrappedComponent: any) {
  const jobsHoc = (props: any) => (
    <WrappedComponent
      {...props}
    />
  )
  const mapStateToProps = (state: State) => ({
    jobModel: selectJobModel(state),
    jobFolder: selectSelectedFolder(state),
  })
  const mapDispatchToProps = (dispatch: Dispatch) => ({
    loadJobs: () => dispatch(new LoadJobsAction()),
  })

  return connect(mapStateToProps, mapDispatchToProps)(jobsHoc)
}
