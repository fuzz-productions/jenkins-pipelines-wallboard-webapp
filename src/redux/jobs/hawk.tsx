import { connect } from 'react-redux'
import React from 'react'
import { selectJobFolder, selectJobModel } from './job.state.selectors'
import { Dispatch } from 'redux'
import { LoadJobsAction } from './actions'
import { State } from '../reducers'
import { LoadingModel } from '../loading.model'
import { FolderJob } from '../../model'

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
    jobFolder: selectJobFolder(state),
  })
  const mapDispatchToProps = (dispatch: Dispatch) => ({
    loadJobs: () => dispatch(new LoadJobsAction('ios-projects')),
  })

  return connect(mapStateToProps, mapDispatchToProps)(jobsHoc)
}
