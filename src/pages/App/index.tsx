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
    setInterval(() => this.props.loadJobs(), 10000)
  }

  render() {
    return (
      <div className="App">
        <div className="app-column-container">
          <MainColumn>
            <Typography variant="h1"
                        component="h1">Stream</Typography>
            <BuildList isStream={true} />
          </MainColumn>
          <MainColumn>
            <Typography variant="h1"
                        component="h1">Attention Zone</Typography>
            <BuildList isStream={false} />
          </MainColumn>
        </div>
      </div>
    )
  }
}

export default jobsHawk(AppPage)
