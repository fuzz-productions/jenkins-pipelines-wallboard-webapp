import 'antd/dist/antd.css'
import dotenv from 'dotenv'
import React, { PureComponent } from 'react'
import './style.scss'
import { jobsHawk, JobsProps } from '../../redux/jobs/hawk'
import MainColumn from '../../components/MainColumn'
import BuildList from '../BuildList'
import { Typography } from '@material-ui/core'

class AppPage extends PureComponent<JobsProps> {

  componentDidMount() {
    dotenv.config()
    this.props.loadJobs()
  }

  render() {
    return (
      <div className="App">
        <div className="app-column-container">
          <MainColumn>
            <Typography variant="h1"
                        component="h1">Stream</Typography>
            <BuildList />
          </MainColumn>
          <MainColumn>

          </MainColumn>
        </div>
        {/*  <header className="App-header"> Fuzz {process.env.REACT_APP_GROUPNAME}
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
        </header>*/}
      </div>
    )
  }
}

export default jobsHawk(AppPage)
