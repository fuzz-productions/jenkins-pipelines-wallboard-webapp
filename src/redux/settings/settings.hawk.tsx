import { LoadingModel } from '../loading.model'
import { FolderJob } from '../../model'
import { State } from '../reducers'
import { selectOrgModel } from '../organizations/selectors'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import React from 'react'
import { LoadProjects, SelectProjectFilter, SelectTempOrganizationSetting } from './actions'
import { MenuOption } from '../../components/MenuWithOptions'
import { selectSelectedOrg, selectSelectedProjectFilter } from './selectors'

export type SettingsProps = {
  projectsModel: LoadingModel<Array<FolderJob>>
  currentOrg?: MenuOption
  currentProject?: MenuOption
  selectTempOrg: (folder: MenuOption) => void
  selectTempProject: (project: MenuOption) => void
  loadProjects: () => void
}

export function settingsHawk(WrappedComponent: any) {
  const settingsHoc = (props: any) => (
    <WrappedComponent
      {...props}
    />
  )
  const mapStateToProps = (state: State) => ({
    projectsModel: selectOrgModel(state),
    currentOrg: selectSelectedOrg(state),
    currentProject: selectSelectedProjectFilter(state),
  })
  const mapDispatchToProps = (dispatch: Dispatch) => ({
    selectTempOrg: (folder: MenuOption) => dispatch(new SelectTempOrganizationSetting(folder)),
    selectTempProject: (project: MenuOption) => dispatch(new SelectProjectFilter(project)),
    loadProjects: () => dispatch(new LoadProjects()),
  })

  return connect(mapStateToProps, mapDispatchToProps)(settingsHoc)
}
