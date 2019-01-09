import React from 'react'
import { BuildInfoWithJob } from '../../model'
import './styles.scss'
import { Card, CardContent, Typography } from '@material-ui/core'
import ReactImageFallback from 'react-image-fallback'

export interface BranchStatusCellProps {
  item: BuildInfoWithJob
}

export default function BranchStatusCell({ item }: BranchStatusCellProps) {
  let result = item.buildInfo.result
  return <Card className="status-card">
    <CardContent className="status-card-container">
      <ReactImageFallback
        className="status-job-image"
        fallbackImage={'./../../assets/ic_launcher.png'}
        src={`https://jenkins.fuzzhq.com/view/System/job/Job%20Icons/ws/${item.parentJobName}.png`} />
      <div className="status-info-chunk">
        <Typography component="h2"
                    className="status-job-name"
                    variant="h5">{item.parentJobName}</Typography>
        <div className="status-container">
          <div className={`status-circle ${result && result.toLowerCase() || 'null'}`} />
          <Typography variant="h6"
                      component="p">{item.job.name} - {item.buildInfo.displayName}</Typography>
        </div>
      </div>
    </CardContent>
  </Card>
}
