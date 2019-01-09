/// project group cell
import React from 'react'
import { Card } from 'antd'
import { FolderJob, jobIsRoot, stableBranches } from '../../model'
import './styles.scss'
import StableBranchCell from '../StableBranchCell'
import BranchStatusCell from '../BranchStatusCell'

export default function ProjectCell({ item }: { item: FolderJob }) {
  const stableCount = stableBranches(item)
  return <Card title={item.displayName}
               style={{ minHeight: '290px' }}>
    {stableCount > 0 && <StableBranchCell stableBranchCount={stableCount}
                                          totalBranchCount={item.jobs.length} />}
    {item.jobs.map((job) => (jobIsRoot(job) || job.lastBuild && job.lastBuild.result != 'SUCCESS') && <BranchStatusCell item={job} />)}
  </Card>
}
