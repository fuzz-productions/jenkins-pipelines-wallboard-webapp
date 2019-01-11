import React, { Component } from 'react'
import { BuildInfoWithJob } from '../../model'
import './styles.scss'
import { Card, CardContent, Chip, CircularProgress, GridListTile, Typography } from '@material-ui/core'
import ReactImageFallback from 'react-image-fallback'
import { userFriendlyFromLatestTime } from '../../model/build_utils'
import fallbackIcon from '../../assets/ic_launcher.png'
import { PersonOutline } from '@material-ui/icons'

// @ts-ignore

export interface BranchStatusCellProps {
  item: BuildInfoWithJob
  isStream: boolean
}

export default class BranchStatusCell extends Component<BranchStatusCellProps> {

  render() {
    let { item, isStream } = this.props
    let { buildInfo } = item
    let { result, building, displayName } = buildInfo
    const statusColorClass = `status-circle-${result && result.toLowerCase() || 'null'}`

    // filter by invalid name like noreply or cesar
    const filteredCulprits = buildInfo.culprits.filter((c) => c.fullName !== 'noreply' && c.fullName !== 'caguilar187')
    return <GridListTile className={!isStream ? 'status-card-grid' : 'status-card-list'}>
      <Card className="status-card">
        <CardContent className={`status-card-container ${statusColorClass}-outline`}>
          <div className="status-job-image-container">
            <ReactImageFallback
              className={`status-job-image ${building && 'status-job-image-opaque'}`}
              fallbackImage={fallbackIcon}
              src={BranchStatusCell.getIconImage(item)}
            />
          </div>
          <div className="status-info-chunk"
               style={{ flex: 1 }}>
            <Typography variant="h2"
                        className="status-job-name status-job-name-header"
                        component="p">{displayName} - {item.job.displayName}</Typography>
            {filteredCulprits.length > 0 && <div className="status-culprit-chip-container">
              <PersonOutline />
              {filteredCulprits.map((c) => (
                <Chip className="status-culprit-chip"
                      key={c.fullName}
                      label={c.fullName} />
              ))}
            </div>}
            <Typography
              className="status-build-timestamp"
              color="textSecondary">{userFriendlyFromLatestTime(buildInfo)}</Typography>
          </div>
          {building && <CircularProgress
            color="primary"
            size={75}
            className="status-progress" />}
        </CardContent>
      </Card>
    </GridListTile>
  }

  private static getIconImage = (item: BuildInfoWithJob) => `https://jenkins.fuzzhq.com/view/System/job/Job%20Icons/ws/${item.parentJobName}.png`
}