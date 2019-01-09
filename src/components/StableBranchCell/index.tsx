import React from 'react'
import './styles.scss'

export interface StableBranchCellProps {
  stableBranchCount: number
  totalBranchCount: number
}

export default function stableBranchCell({ stableBranchCount, totalBranchCount }: StableBranchCellProps) {
  return <div className='stable-branch-main-container'>
    {stableBranchCount == totalBranchCount && <span>All Branches Are Stable</span>}
    {stableBranchCount != totalBranchCount && <span>{stableBranchCount} Stable Branches</span>}
  </div>
}
