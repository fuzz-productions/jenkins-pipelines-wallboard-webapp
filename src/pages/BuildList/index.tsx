import React, { PureComponent } from 'react'
import './style.scss'
import { buildsHawk, BuildsProps } from '../../redux/builds/hawk'
import BranchStatusCell from '../../components/BranchStatusCell'
import { GridList } from '@material-ui/core'

type Props = {
  isStream: boolean
}

class BuildList extends PureComponent<BuildsProps & Props> {

  render(): React.ReactNode {
    const list = this.props.isStream ? this.props.mainBuildList : this.props.unsuccessfulBuildsList
    return <>
      <GridList
        cols={2}>
        {list.map((build) =>
          <BranchStatusCell key={`${build.parentJobName}-${build.job.name}-${build.buildInfo.displayName}`}
                            isStream={this.props.isStream}
                            item={build} />)}
      </GridList>
    </>
  }
}

export default buildsHawk(BuildList)
