import React, { PureComponent } from 'react'
import './style.scss'
import { buildsHawk, BuildsProps } from '../../redux/builds/hawk'
import BranchStatusCell from '../../components/BuildItemTile'
import { CircularProgress, GridList, Typography } from '@material-ui/core'

type Props = {
  isStream: boolean
}

class BuildList extends PureComponent<BuildsProps & Props> {

  render(): React.ReactNode {
    const { isStream, unsuccessfulBuildsList, mainBuildList, buildsModel } = this.props
    const list = isStream ? mainBuildList : unsuccessfulBuildsList
    const isEmpty = list.length === 0
    return <>
      {buildsModel.isLoading && isEmpty && <div className="build-list-loading-container">
        <Typography variant="h3"
                    className="build-list-loading-label"
                    component="p">Loading Builds</Typography>
        <CircularProgress size={50} />
      </div>}
      {isEmpty && !buildsModel.isLoading && <div>
        <Typography
          variant="h1"
          component="h1"
        >All Builds Clear!</Typography>
      </div>}
      {!isEmpty && <GridList
        cols={2}>
        {list.map((build) =>
          <BranchStatusCell key={`${build.parentJobName}-${build.job.name}-${build.buildInfo.displayName}`}
                            isStream={this.props.isStream}
                            item={build} />)}
      </GridList>}
    </>
  }
}

export default buildsHawk(BuildList)
