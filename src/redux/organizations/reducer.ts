import { OrganizationFolder } from '../../model'
import { OrganizationActions, OrganizationActionTypes } from './actions'
import { LoadingModel } from '../loading.model'


export interface OrganizationState {
  folders: LoadingModel<Array<OrganizationFolder>>
  selectedFolder: string
}

export const initialOrganizationState: OrganizationState = {
  folders: LoadingModel.empty(),
  selectedFolder: '',
}

export function organizationReducer(state: OrganizationState = initialOrganizationState, action: OrganizationActions): OrganizationState {
  switch (action.type) {
    case OrganizationActionTypes.SelectOrganization:
      console.log('Selecting org within org reducer', action.folder, state.selectedFolder)
      return {
        ...state,
        selectedFolder: action.folder,
      }
    case OrganizationActionTypes.LoadOrganizations:
      return {
        ...state,
        folders: state.folders.loading(),
      }
    case OrganizationActionTypes.LoadOrganizationsFailed:
      return {
        ...state,
        folders: LoadingModel.error(action.error, state.folders.optionalSuccess),
      }
    case OrganizationActionTypes.LoadOrganizationsSucceeded:
      return {
        ...state,
        folders: LoadingModel.success(action.orgs),
      }
    default:
      return state
  }
}
