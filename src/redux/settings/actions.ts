import { Action } from 'redux'
import { FolderJob } from '../../model'
import { MenuOption } from '../../components/MenuWithOptions'


export enum SettingsActionTypes {
  // used for loading projects in settings when selecting an organization.
  SelectTempOrganizationSetting = '[Settings] Select Temporary Organization',
  LoadProjects = '[Settings] Load Projects',
  LoadProjectsFailed = '[Settings] Load Projects Failed',
  LoadProjectsSucceeded = '[Settings] Load Projects Succeeded',
  SelectProjectFilter = '[Settings] Select Project Filter',
}

export class SelectTempOrganizationSetting implements Action {
  readonly type = SettingsActionTypes.SelectTempOrganizationSetting

  constructor(public folder: MenuOption) {
  }
}

export class LoadProjects implements Action {
  readonly type = SettingsActionTypes.LoadProjects
}

export class LoadProjectsFailed implements Action {
  readonly type = SettingsActionTypes.LoadProjectsFailed

  constructor(public error: Error) {
  }
}

export class LoadProjectsSucceeded implements Action {
  readonly type = SettingsActionTypes.LoadProjectsSucceeded

  constructor(public jobs: Array<FolderJob>) {
  }
}

export class SelectProjectFilter implements Action {
  readonly type = SettingsActionTypes.SelectProjectFilter

  constructor(public selectedProject: MenuOption) {
  }
}

export type SettingsActions =
  | SelectTempOrganizationSetting
  | LoadProjects
  | LoadProjectsFailed
  | LoadProjectsSucceeded
  | SelectProjectFilter
