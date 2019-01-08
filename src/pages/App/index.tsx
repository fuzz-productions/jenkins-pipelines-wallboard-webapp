import { List } from 'antd'
import 'antd/dist/antd.css'
import dotenv from 'dotenv'
import React, { PureComponent } from 'react'
import './style.scss'
import ProjectCell from '../../components/ProjectCell'
import { jobsHawk } from '../../redux/jobs/hawk'
import { LoadingModel } from '../../redux/loading.model'
import { FolderJob } from '../../model'

interface AppProps {
  loadJobs: Function
  jobModel: LoadingModel<Array<FolderJob>>
}

class AppPage extends PureComponent<AppProps> {

  componentDidMount() {
    dotenv.config()
    this.props.loadJobs()
  }

  render() {
    console.log('props', this.props.jobModel)
    return (
      <div className="App">
        <header className="App-header"> Fuzz {process.env.REACT_APP_GROUPNAME}
          <br />

          <List
            grid={{
              gutter: 16,
              column: 4,
              offset: 5,
            }}
            dataSource={this.props.jobModel.success}
            renderItem={(item: FolderJob) => (
              <List.Item><ProjectCell item={item} /></List.Item>
            )}
          />
        </header>
      </div>
    )
  }
}

export default jobsHawk(AppPage)
