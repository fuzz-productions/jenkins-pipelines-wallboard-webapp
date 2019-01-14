import { BranchEventCause, BuildInfo } from './index'

export const getCauses = (build: BuildInfo): Array<BranchEventCause> => {
  return build.actions.filter((a) => !!a.causes)
    .reduce((output, c) => output.concat(c.causes!), [] as Array<BranchEventCause>)
}
