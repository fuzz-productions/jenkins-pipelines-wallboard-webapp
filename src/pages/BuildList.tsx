import React from 'react'
import { buildsHawk, BuildsProps } from '../redux/builds/hawk'
import BuildItemTile from '../components/BuildItemTile'
import { CircularProgress, GridList, Typography } from '@material-ui/core'
import styled from 'styled-components'
import { failureColor } from '../styles/colors'

interface Props {
  isStream: boolean
}

const StyledBuildListLoadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 16px;
`

const StyledTypography = styled(Typography)`
  padding: 16px;
  color: ${failureColor} !important;
`

const BuildList = ({ isStream, unsuccessfulBuildsList, mainBuildList, buildsModel }: BuildsProps & Props) => {
  const list = isStream ? mainBuildList : unsuccessfulBuildsList
  const isEmpty = list.length === 0
  return <>
    {buildsModel.isLoading && isEmpty && <StyledBuildListLoadingContainer>
      <CircularProgress size={50} />
      <StyledTypography variant='h3'
                        component='p'>Loading Builds</StyledTypography>
    </StyledBuildListLoadingContainer>}
    {isEmpty && !buildsModel.isLoading && <div>
      <Typography
        variant='h1'
        component='h1'
      >All Builds Clear!</Typography>
    </div>}
    {!isEmpty && <GridList
      cols={2}>
      {list.map((build) =>
        <BuildItemTile key={`${build.parentJobName}-${build.job.name}-${build.buildInfo.displayName}`}
                       isStream={isStream}
                       item={build} />)}
    </GridList>}
  </>
}

export default buildsHawk(BuildList)
