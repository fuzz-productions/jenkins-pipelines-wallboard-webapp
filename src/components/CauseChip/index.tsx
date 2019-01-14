import React from 'react'
import { BranchEventCause } from '../../model'
import { ArrowRightAlt, PlayArrow, Replay } from '@material-ui/icons'
import { Chip } from '@material-ui/core'
import PullRequestIcon from '../../icons/PullRequestIcon'

interface Props {
  cause: BranchEventCause
  jobName: string
  className?: string
}

const EVENT_PUSH = 'push event to branch'
const EVENT_STARTED_BY_USER = 'started by user'
const EVENT_REPLAYED = 'replayed'
const EVENT_PULL_REQUEST = 'pull request'

const iconForCause = (cause: BranchEventCause) => {
  const desc = cause.shortDescription.toLowerCase().trim()
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
  const desc = cause.shortDescription.toLowerCase().trim()
  if (desc.startsWith(EVENT_PUSH)) {
    // push events
    const text = desc.replace(EVENT_PUSH, '').replace(jobName.toLowerCase(), 'push').trim()
    console.log('Text replace', text, jobName)
    return text
  } else if (desc.startsWith(EVENT_STARTED_BY_USER)) {
    // user trigger
    return desc.replace(EVENT_STARTED_BY_USER, '').trim()
  } else if (desc.startsWith(EVENT_REPLAYED)) {
    return desc.replace(EVENT_REPLAYED, '').trim()
  } else if (desc.startsWith(EVENT_PULL_REQUEST)) {
    return 'new pull request'
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
