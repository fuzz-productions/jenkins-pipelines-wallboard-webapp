import React from 'react'
import { BranchEventCause } from '../../model'
import { ArrowRightAlt } from '@material-ui/icons'
import { Chip } from '@material-ui/core'

interface Props {
  cause: BranchEventCause
}

const EVENT_PUSH = 'push event to branch'
const EVENT_STARTED_BY_USER = 'started by user'

const iconForCause = (cause: BranchEventCause) => {
  const desc = cause.shortDescription.toLowerCase().trim()
  if (desc.startsWith(EVENT_PUSH)) {
    // push events
    return <ArrowRightAlt />
  } else if (desc.startsWith(EVENT_STARTED_BY_USER)) {
    // user trigger

  }
}

const labelForCause = (cause: BranchEventCause) => {
  const desc = cause.shortDescription.toLowerCase().trim()
  if (desc.startsWith(EVENT_PUSH)) {
    // push events
    return desc.replace(EVENT_PUSH, '').trim()
  } else if (desc.startsWith(EVENT_STARTED_BY_USER)) {
    // user trigger
    return desc.replace(EVENT_STARTED_BY_USER, '').trim()
  }

  return cause.shortDescription
}

export default function CauseChip({ cause }: Props) {
  const Icon = iconForCause(cause)
  const label = labelForCause(cause)
  return <Chip avatar={Icon}
               label={label}
  />
}
