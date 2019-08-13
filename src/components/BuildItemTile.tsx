import React from 'react'
import { BuildInfo, BuildInfoWithJob, Culprit, Job } from '../model'
import { Card, CardContent, Chip, GridListTile, LinearProgress, Theme, Typography, withStyles } from '@material-ui/core'
import { getCauses } from '../model/build_utils'
import fallbackIcon from '../assets/ic_launcher.png'
import { PersonOutline } from '@material-ui/icons'
import CauseChip from './CauseChip'
import { differenceInDays, distanceInWords, distanceInWordsToNow, format } from 'date-fns'
import styled, { css } from 'styled-components'
import { abortedColor, failureColor, unstableColor } from '../styles/colors'
import ReactImageFallback from 'react-image-fallback'

export interface BranchStatusCellProps {
  item: BuildInfoWithJob
  classes: any
  isStream: boolean
}

const StyledCauseChip = styled(CauseChip)`
  margin: 4px;
`

const StyledStatusCauseChipContainer = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-flow: wrap;
`

const StyledStatusCulpritChipContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-flow: wrap;
`

const StyledCulpritChip = styled(Chip)`
  margin: 4px;
`

const StyledStatusInfoChunk = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-content: stretch;
`

const StyledStatusBuildTimeStamp = styled(Typography)`
  text-align: left;
  padding-bottom: 4px;
`

const StyledLinearProgress = styled(LinearProgress)`
  align-self: center;
`

const StyledStatusJobImageContainer = styled.div`
  position: relative;
  display: flex;
  align-content: center;
  align-items: center;
  margin-right: 16px;
`

const StyledStatusJobName = styled(Typography)`
  text-align: left;
  padding-right: 16px;
  max-lines: 2;
  width: 100%;
  overflow: hidden;
  padding-bottom: 4px;
  overflow-wrap: break-word;
`

const StyledStatusCard = styled(Card)`
  margin: 8px 16px;
`

const StyledStatusCardContainer = styled<{ status: string } & any>(CardContent)`
  display: flex;
  flex-direction: row;
  ${props => props.status === 'unstable' && css`
  border-color: ${unstableColor};
    border-width: 5px;
    border-style: solid;
  `}
  ${props => props.status === 'failure' && css`
      border-color: ${failureColor};
      border-width: 10px;
      border-style: solid;
  `}
  ${props => props.status === 'aborted' && css`
    border-color: ${abortedColor};
    border-width: 5px;
    border-style: solid;
  `}
`

const StyledStatusJobImage = styled<{ building: boolean } & any>(ReactImageFallback)`
 width: 100px;
 height: 100px;
 opacity: ${props => props.building ? '0.6' : '1.0'};
`

const getIconImage = (item: BuildInfoWithJob) => `https://jenkins.fuzzhq.com/view/System/job/Job%20Icons/ws/${item.parentJobName}.png`

const renderCauseChips = (buildInfo: BuildInfo, job: Job) =>
  getCauses(buildInfo).map(c => <StyledCauseChip cause={c}
                                                 key={c.shortDescription}
                                                 jobName={job.name} />)

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
  <StyledStatusCulpritChipContainer>
    <PersonOutline />
    {filteredCulprits.map((c) => (
      <StyledCulpritChip
        key={c.fullName}
        label={c.fullName} />
    ))}
  </StyledStatusCulpritChipContainer>

const calculatePercentBuilt = (buildInfo: BuildInfo) => {
  const { estimatedDuration, timestamp } = buildInfo
  const timeSince = Date.now() - timestamp
  const percent = (timeSince) / estimatedDuration
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

const BranchStatusCell = ({ item, isStream, classes}: BranchStatusCellProps) => {
  const { buildInfo, job } = item
  const { result, building, displayName } = buildInfo

  // filter by invalid name like noreply or cesar
  const filteredCulprits = buildInfo.culprits.filter((c) => c.fullName !== 'noreply' && c.fullName !== 'caguilar187')
  return <GridListTile className={!isStream ? classes.statusContainerTile : ''}
                       style={isStream ? { width: '100%' } : {}}>
    <StyledStatusCard>
      {building && <StyledLinearProgress
        color='primary'
        value={calculatePercentBuilt(buildInfo)}
        variant='determinate' />}
      <StyledStatusCardContainer
        status={result && result.toLowerCase() || 'null'}>
        <StyledStatusJobImageContainer>
          <StyledStatusJobImage
            building={building}
            fallbackImage={fallbackIcon}
            src={getIconImage(item)}
          />
        </StyledStatusJobImageContainer>
        <StyledStatusInfoChunk
          style={{ flex: 1 }}>
          <StyledStatusJobName variant='h2'
                               component='p'>{displayName} {item.job.displayName}</StyledStatusJobName>
          {!building && <StyledStatusBuildTimeStamp
            color='textSecondary'>{userFriendlyFromLatestTime(buildInfo)}</StyledStatusBuildTimeStamp>}
          {building && <StyledStatusBuildTimeStamp
            color='textSecondary'>{activeBuildTime(buildInfo)}</StyledStatusBuildTimeStamp>}
          {renderCulpritChips(filteredCulprits)}
          <StyledStatusCauseChipContainer>
            {renderCauseChips(buildInfo, job)}
          </StyledStatusCauseChipContainer>
        </StyledStatusInfoChunk>
      </StyledStatusCardContainer>
    </StyledStatusCard>
  </GridListTile>
}

export default withStyles(styles)(BranchStatusCell)
