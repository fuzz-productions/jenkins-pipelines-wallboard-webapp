import { Action } from 'redux'
import { BuildInfoWithJob } from '../../model'


export enum BuildActionTypes {
  BuildsReceived = '[Builds] Builds received'
}

export class BuildsReceived implements Action {
  readonly type = BuildActionTypes.BuildsReceived

  constructor(public buildInfo: Array<BuildInfoWithJob>) {
  }
}

export type BuildActions =
  | BuildsReceived
