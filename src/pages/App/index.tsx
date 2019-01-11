import 'antd/dist/antd.css'
import dotenv from 'dotenv'
import React, { Component } from 'react'
import './style.scss'
import { jobsHawk, JobsProps } from '../../redux/jobs/hawk'
import MainColumn from '../../components/MainColumn'
import BuildList from '../BuildList'
import { AppBar, createMuiTheme, IconButton, MuiThemeProvider, Toolbar, Typography } from '@material-ui/core'
import { Settings } from '@material-ui/icons'
import SettingsDialog from '../SettingsDialog'
import { JobConstants } from '../../redux/jobs/constants'
import { orgsHawk, OrgsProps } from '../../redux/organizations/orgs.hawk'

interface State {
  showSettings: boolean
}

class AppPage extends Component<JobsProps & OrgsProps, State> {

  state: State = {
    showSettings: false,
  }

  componentDidMount() {
    dotenv.config()
    this.props.loadInitialOrganization()
    this.props.loadJobFilter()
    this.props.loadJobs()
    setInterval(() => this.props.loadJobs(), 10000)
  }

  theme = createMuiTheme({
    palette: {
      primary: { main: '#F54029' },
    },
  })

  showSettingsMenu = () => {
    this.setState({ showSettings: true })
  }

  hideSettingsMenu = () => {
    this.setState({ showSettings: false })
  }

  render() {
    return (
      <MuiThemeProvider theme={this.theme}>
        <div className="app-container">
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h2"
                          component="h2"
                          color="inherit"
                          className="app-toolbar-text">{this.props.organizationFolder}
                {this.props.jobFilter !== JobConstants.FilterViewAll && ` - ${this.props.jobFilter}`}</Typography>
              <IconButton color="inherit"
                          onClick={this.showSettingsMenu}>
                <Settings fontSize="large" />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div className="app-column-container">
            <MainColumn>
              <BuildList isStream={true} />
            </MainColumn>
            <MainColumn flex={2}>
              <Typography variant="h4"
                          component="h4"
                          className="app-header-text">Attention Zone</Typography>
              <BuildList isStream={false} />
            </MainColumn>
          </div>
        </div>
        <SettingsDialog open={this.state.showSettings}
                        onClose={this.hideSettingsMenu} />
      </MuiThemeProvider>
    )
  }
}

export default orgsHawk(jobsHawk(AppPage))
