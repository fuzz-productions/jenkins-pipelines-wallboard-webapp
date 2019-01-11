import { LoadingModel } from '../loading.model'
import { FolderJob } from '../../model'
import { SettingsActions, SettingsActionTypes } from './actions'
import { MenuOption } from '../../components/MenuWithOptions'


export interface SettingsState {
  projects: LoadingModel<Array<FolderJob>>
  selectedOrg?: MenuOption
  selectedProjectFilter?: MenuOption
}

export const initialSettingsState: SettingsState = {
  projects: LoadingModel.empty(),
}

export function settingsReducer(state: SettingsState = initialSettingsState, action: SettingsActions): SettingsState {
  switch (action.type) {
    case SettingsActionTypes.LoadProjects:
      return {
        ...state,
        projects: state.projects.loading(),
      }
    case SettingsActionTypes.LoadProjectsSucceeded:
      return {
        ...state,
        projects: LoadingModel.success(action.jobs),
      }
    case SettingsActionTypes.LoadProjectsFailed:
      return {
        ...state,
        projects: LoadingModel.error(action.error),
      }
    case SettingsActionTypes.SelectTempOrganizationSetting:
      return {
        ...state,
        selectedOrg: action.folder,
      }
    case SettingsActionTypes.SelectProjectFilter:
      return {
        ...state,
        selectedProjectFilter: action.selectedProject,
      }
    default:
      return state
  }
}
