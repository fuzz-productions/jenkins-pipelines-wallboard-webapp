import React from 'react'
import { BuildInfoWithJob } from '../../model'
import './styles.scss'
import { Card, CardContent, CircularProgress, GridListTile, Typography, withStyles } from '@material-ui/core'
import ReactImageFallback from 'react-image-fallback'
import { getUIName } from '../../model/job_utils'
import { userFriendlyFromLatestTime } from '../../model/build_utils'
import fallbackIcon from '../../assets/ic_launcher.png'

// @ts-ignore

export interface BranchStatusCellProps {
  item: BuildInfoWithJob
  isStream: boolean
}

export default function BranchStatusCell({ item, isStream }: BranchStatusCellProps) {
  let result = item.buildInfo.result
  const statusColorClass = `status-circle-${result && result.toLowerCase() || 'null'}`
  const Progress = withStyles({
    colorPrimary: {
      color: '#FFFFFF',
    },
  })(CircularProgress)
  return <GridListTile className={!isStream ? 'status-card-grid' : 'status-card-list'}>
    <Card className="status-card">
      <CardContent className={`status-card-container ${statusColorClass}-outline`}>
        <div className="status-job-image-container">
          <ReactImageFallback
            className={`status-job-image ${item.buildInfo.building && 'status-job-image-opaque'}`}
            fallbackImage={fallbackIcon}
            src={`https://jenkins.fuzzhq.com/view/System/job/Job%20Icons/ws/${item.parentJobName}.png`} />
          {item.buildInfo.building && <div className="status-job-image-loading">
            <Progress color="primary" />
          </div>}
        </div>
        <div className="status-info-chunk"
             style={{ flex: 1 }}>
          <Typography variant="h2"
                      className="status-job-name status-job-name-header"
                      component="p">{item.job.displayName}</Typography>
          <Typography component="h6"
                      className="status-job-name"
                      variant="h5">{item.buildInfo.displayName} - {getUIName(item.parentJobName)}</Typography>
          <Typography
            className="status-build-timestamp"
            color="textSecondary">{userFriendlyFromLatestTime(item.buildInfo)}</Typography>
        </div>
      </CardContent>
    </Card>
  </GridListTile>
}
