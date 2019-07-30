import React from 'react'
import { BranchEventCause } from '../model'
import { ArrowRightAlt, PlayArrow, Replay } from '@material-ui/icons'
import { Chip } from '@material-ui/core'
import PullRequestIcon from '../icons/PullRequestIcon'

interface Props {
  cause: BranchEventCause
  jobName: string
  className?: string
}

const EVENT_PUSH = 'Push event to branch'
const EVENT_STARTED_BY_USER = 'Started by user'
const EVENT_REPLAYED = 'Replayed'
const EVENT_PULL_REQUEST = 'Pull request'

const iconForCause = (cause: BranchEventCause) => {
  const desc = cause.shortDescription.trim()
  if (desc.startsWith(EVENT_PUSH)) {
    // push events
    return <ArrowRightAlt />
  } else if (desc.startsWith(EVENT_STARTED_BY_USER)) {
    // user trigger
    return <PlayArrow />
  } else if (desc.startsWith(EVENT_REPLAYED)) {
    return <Replay />
  } else if (desc.startsWith(EVENT_PULL_REQUEST)) {
    return <PullRequestIcon />
  }
}


const labelForCause = (cause: BranchEventCause, jobName: string) => {
  const desc = cause.shortDescription.trim()
  if (desc.startsWith(EVENT_PUSH)) {
    // push events
    return desc.replace(EVENT_PUSH, '').replace(jobName.toLowerCase(), 'push').trim()
  } else if (desc.startsWith(EVENT_STARTED_BY_USER)) {
    // user trigger
    return desc.replace(EVENT_STARTED_BY_USER, '').trim()
  } else if (desc.startsWith(EVENT_REPLAYED)) {
    return desc.replace(EVENT_REPLAYED, '').trim()
  } else if (desc.startsWith(EVENT_PULL_REQUEST)) {
    return 'New pull request'
  }

  return cause.shortDescription
}

export default function CauseChip({ cause, jobName, ...restProps }: Props) {
  const Icon = iconForCause(cause)
  const label = labelForCause(cause, jobName)
  return <Chip avatar={Icon}
               label={label}
               {...restProps}
  />
}
