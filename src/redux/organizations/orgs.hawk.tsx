import { LoadingModel } from '../loading.model'
import { OrganizationFolder } from '../../model'
import { State } from '../reducers'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import React from 'react'
import { selectOrgModel, selectSelectedFolder } from './selectors'
import { LoadOrganizationFolder, LoadOrganizations, SelectOrganization } from './actions'

export type OrgsProps = {
  orgModel: LoadingModel<Array<OrganizationFolder>>
  currentFolder: string
  selectFolder: (folder: string) => void
  loadOrgs: () => void
  loadInitialOrganization: () => void
}

export function orgsHawk(WrappedComponent: any) {
  const orgsHoc = (props: any) => (
    <WrappedComponent
      {...props}
    />
  )
  const mapStateToProps = (state: State) => ({
    orgModel: selectOrgModel(state),
    currentFolder: selectSelectedFolder(state),
  })
  const mapDispatchToProps = (dispatch: Dispatch) => ({
    selectFolder: (folderName: string) => dispatch(new SelectOrganization(folderName)),
    loadOrgs: () => dispatch(new LoadOrganizations()),
    loadInitialOrganization: () => dispatch(new LoadOrganizationFolder()),
  })

  return connect(mapStateToProps, mapDispatchToProps)(orgsHoc)
}
