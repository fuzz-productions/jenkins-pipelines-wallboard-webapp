import { Action } from 'redux'
import { OrganizationFolder } from '../../model'

export enum OrganizationActionTypes {
  LoadOrganizations = '[Organizations] Load Organizations',
  LoadOrganizationsSucceeded = '[Organizations] Load Organizations Succeeded',
  LoadOrganizationsFailed = '[Organizations] Load Organizations Failed',
  SelectOrganization = '[Organization] Select Organization',
}

export class LoadOrganizations implements Action {
  readonly type = OrganizationActionTypes.LoadOrganizations
}

export class LoadOrganizationsSucceeded implements Action {
  readonly type = OrganizationActionTypes.LoadOrganizationsSucceeded

  constructor(public orgs: Array<OrganizationFolder>) {
  }
}

export class LoadOrganizationsFailed implements Action {
  readonly type = OrganizationActionTypes.LoadOrganizationsFailed

  constructor(public error: Error) {
  }
}

export class SelectOrganization implements Action {
  readonly type = OrganizationActionTypes.SelectOrganization

  constructor(public folder: string) {
  }
}

export type OrganizationActions =
  | LoadOrganizations
  | LoadOrganizationsSucceeded
  | LoadOrganizationsFailed
  | SelectOrganization
