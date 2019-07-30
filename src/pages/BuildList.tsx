import React, { PureComponent } from 'react'
import { buildsHawk, BuildsProps } from '../redux/builds/hawk'
import BuildItemTile from '../components/BuildItemTile'
import { CircularProgress, GridList, Typography } from '@material-ui/core'
import styled from 'styled-components'

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
  padding-right: 8px;
`

class BuildList extends PureComponent<BuildsProps & Props> {

  render(): React.ReactNode {
    const { isStream, unsuccessfulBuildsList, mainBuildList, buildsModel } = this.props
    const list = isStream ? mainBuildList : unsuccessfulBuildsList
    const isEmpty = list.length === 0
    return <>
      {buildsModel.isLoading && isEmpty && <StyledBuildListLoadingContainer>
        <StyledTypography variant='h3'
                          component='p'>Loading Builds</StyledTypography>
        <CircularProgress size={50} />
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
                         isStream={this.props.isStream}
                         item={build} />)}
      </GridList>}
    </>
  }
}

export default buildsHawk(BuildList)
