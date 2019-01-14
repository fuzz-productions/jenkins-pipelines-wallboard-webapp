import { BranchEventCause, BuildInfo } from './index'
import { differenceInDays, distanceInWordsToNow, format } from 'date-fns'

export const userFriendlyFromLatestTime = (build: BuildInfo) => {
  const buildDate = new Date(build.timestamp)
  const difference = differenceInDays(buildDate, new Date())
  if (difference === 0) {
    return distanceInWordsToNow(buildDate)
  } else {
    return format(buildDate, 'MM/DD/YYYY hh:mm A')
  }
}

export const getCauses = (build: BuildInfo): Array<BranchEventCause> => {
  return build.actions.filter((a) => !!a.causes)
    .reduce((output, c) => output.concat(c.causes!), [] as Array<BranchEventCause>)
}
