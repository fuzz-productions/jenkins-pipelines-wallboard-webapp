import React from 'react'
import { BuildInfo, BuildInfoWithJob, Culprit, Job } from '../../model'
import './styles.scss'
import { Card, CardContent, Chip, GridListTile, LinearProgress, Theme, Typography, withStyles } from '@material-ui/core'
import ReactImageFallback from 'react-image-fallback'
import { getCauses } from '../../model/build_utils'
import fallbackIcon from '../../assets/ic_launcher.png'
import { PersonOutline } from '@material-ui/icons'
import CauseChip from '../CauseChip'
import { differenceInDays, distanceInWords, distanceInWordsToNow, format } from 'date-fns'

// @ts-ignore

export interface BranchStatusCellProps {
  item: BuildInfoWithJob
  classes: any
  isStream: boolean
}

const getIconImage = (item: BuildInfoWithJob) => `https://jenkins.fuzzhq.com/view/System/job/Job%20Icons/ws/${item.parentJobName}.png`

const renderCauseChips = (buildInfo: BuildInfo, job: Job) => {
  const causes = getCauses(buildInfo)
  return causes.map(c => <CauseChip className="status-cause-chip"
                                    cause={c}
                                    key={c.shortDescription}
                                    jobName={job.name} />)
}

const styles = (theme: Theme) => ({
  statusContainerTile: {
    [theme.breakpoints.down('lg')]: {
      width: '100%',
    },
    [theme.breakpoints.up('xl')]: {
      width: '50%',
    },
  },
})

const renderCulpritChips = (filteredCulprits: Array<Culprit>) => filteredCulprits.length > 0 &&
  <div className="status-culprit-chip-container">
    <PersonOutline />
    {filteredCulprits.map((c) => (
      <Chip className="status-culprit-chip"
            key={c.fullName}
            label={c.fullName} />
    ))}
  </div>

const calculatePercentBuilt = (buildInfo: BuildInfo) => {
  let { estimatedDuration, timestamp } = buildInfo
  const timeSince = Date.now() - timestamp
  let percent = (timeSince) / estimatedDuration
  return percent * 100
}

const activeBuildTime = (buildInfo: BuildInfo) => {
  const buildDate = new Date(buildInfo.timestamp)
  const distance = distanceInWordsToNow(buildDate)
  const remaining = distanceInWords(new Date(buildInfo.timestamp + buildInfo.estimatedDuration), Date.now())
  return `Started ${distance} ago. Approx ${remaining} left.`
}

export const userFriendlyFromLatestTime = (build: BuildInfo) => {
  const buildDate = new Date(build.timestamp)
  const difference = Math.abs(differenceInDays(buildDate, new Date()))
  const durationText = distanceInWords(buildDate, new Date(build.timestamp + build.duration))
  if (difference <= 7) {
    return `Built ${distanceInWordsToNow(buildDate)} ago. Took ${durationText}`
  } else {
    return `Last Built ${format(buildDate, 'M/D/YYYY h:m A')}. Took ${durationText}`
  }
}

const BranchStatusCell = ({ item, isStream, classes }: BranchStatusCellProps) => {
  let { buildInfo, job } = item
  let { result, building, displayName } = buildInfo
  const statusColorClass = `status-circle-${result && result.toLowerCase() || 'null'}`

  // filter by invalid name like noreply or cesar
  const filteredCulprits = buildInfo.culprits.filter((c) => c.fullName !== 'noreply' && c.fullName !== 'caguilar187')
  return <GridListTile className={!isStream && classes.statusContainerTile}
                       style={isStream ? { width: '100%' } : {}}>
    <Card className="status-card">
      {building && <LinearProgress
        color="primary"
        value={calculatePercentBuilt(buildInfo)}
        variant="determinate"
        className="status-progress" />}
      <CardContent className={`status-card-container ${statusColorClass}-outline`}>
        <div className="status-job-image-container">
          <ReactImageFallback
            className={`status-job-image ${building && 'status-job-image-opaque'}`}
            fallbackImage={fallbackIcon}
            src={getIconImage(item)}
          />
        </div>
        <div className="status-info-chunk"
             style={{ flex: 1 }}>
          <Typography variant="h2"
                      className="status-job-name status-job-name-header"
                      component="p">{displayName} - {item.job.displayName}</Typography>
          {!building && <Typography
            className="status-build-timestamp"
            color="textSecondary">{userFriendlyFromLatestTime(buildInfo)}</Typography>}
          {building && <Typography
            className="status-build-timestamp"
            color="textSecondary">{activeBuildTime(buildInfo)}</Typography>}
          {renderCulpritChips(filteredCulprits)}
          <div className="status-cause-chip-container">
            {renderCauseChips(buildInfo, job)}
          </div>
        </div>
      </CardContent>
    </Card>
  </GridListTile>
}

export default withStyles(styles)(BranchStatusCell)
