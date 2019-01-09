import React, { PureComponent } from 'react'
import './style.scss'
import { buildsHawk, BuildsProps } from '../../redux/builds/hawk'
import BranchStatusCell from '../../components/BranchStatusCell'

type Props = {
  isStream: boolean
}

class BuildList extends PureComponent<BuildsProps & Props> {

  render(): React.ReactNode {
    const list = this.props.isStream ? this.props.mainBuildList : this.props.unsuccessfulBuildsList
    return <>
      {list.map((build) =>
        <BranchStatusCell key={`${build.parentJobName}-${build.job.name}-${build.buildInfo.displayName}`}
                          item={build} />)}
    </>
  }
}

export default buildsHawk(BuildList)
