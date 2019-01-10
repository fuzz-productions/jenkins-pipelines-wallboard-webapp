import 'antd/dist/antd.css'
import dotenv from 'dotenv'
import React, { PureComponent } from 'react'
import './style.scss'
import { jobsHawk, JobsProps } from '../../redux/jobs/hawk'
import MainColumn from '../../components/MainColumn'
import BuildList from '../BuildList'
import { createMuiTheme, IconButton, MuiThemeProvider, Typography } from '@material-ui/core'
import { Settings } from '@material-ui/icons'

class AppPage extends PureComponent<JobsProps> {

  componentDidMount() {
    dotenv.config()
    this.props.loadJobs()
    setInterval(() => this.props.loadJobs(), 10000)
  }

  theme = createMuiTheme({
    palette: {
      primary: { main: '#F54029' },
    },
  })

  render() {
    return (
      <MuiThemeProvider theme={this.theme}>
        <div className="app-container">
          <div className="app-header-container">
            <Typography variant="h1"
                        component="h1"
                        className="app-header-text">{this.props.jobFolder}</Typography>
            <div
              className="app-settings-icon">
              <IconButton>
                <Settings fontSize="large" />
              </IconButton>
            </div>
          </div>
          <div className="app-column-container">
            <MainColumn>
              <BuildList isStream={true} />
            </MainColumn>
            <MainColumn flex={2}>
              <BuildList isStream={false} />
            </MainColumn>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default jobsHawk(AppPage)
