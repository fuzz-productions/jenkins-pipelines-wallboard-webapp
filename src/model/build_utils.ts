import { BranchEventCause, BuildInfo } from './index'
import { differenceInDays, distanceInWordsToNow, format } from 'date-fns'

export const userFriendlyFromLatestTime = (build: BuildInfo) => {
  const buildDate = new Date(build.timestamp)
  const difference = Math.abs(differenceInDays(buildDate, new Date()))
  if (difference <= 7) {
    return `Built ${distanceInWordsToNow(buildDate)} ago`
  } else {
    return `Last Built ${format(buildDate, 'MM/DD/YYYY hh:mm A')}`
  }
}

export const getCauses = (build: BuildInfo): Array<BranchEventCause> => {
  return build.actions.filter((a) => !!a.causes)
    .reduce((output, c) => output.concat(c.causes!), [] as Array<BranchEventCause>)
}
