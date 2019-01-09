import React, { PureComponent } from 'react'
import './style.scss'
import { buildsHawk, BuildsProps } from '../../redux/builds/hawk'
import BranchStatusCell from '../../components/BranchStatusCell'

class BuildList extends PureComponent<BuildsProps> {

  render(): React.ReactNode {
    return <div className="build-list">
      {this.props.mainBuildList.map((build) =>
        <BranchStatusCell key={`${build.parentJobName}-${build.job.name}-${build.buildInfo.displayName}`}
                          item={build} />)}
    </div>
  }
}

export default buildsHawk(BuildList)
