import React from 'react'
import { Job } from '../../model'
import './styles.scss'

export interface BranchStatusCellProps {
  item: Job
}

export default function BranchStatusCell({ item }: BranchStatusCellProps) {
  let result = item.lastBuild && item.lastBuild.result
  if (result != null) {
    result = result.toLowerCase()
  } else {
    result = 'null'
  }
  return <li className={result}><span>{item.name}</span>
    {(() => {
      if (item.lastBuild && item.lastBuild.number > 1) {
        return <span> #{item.lastBuild.number}</span>
      }
    })()}

  </li>
}
