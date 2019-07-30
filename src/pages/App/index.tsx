import dotenv from 'dotenv'
import React, { Component } from 'react'
import './style.scss'
import { jobsHawk, JobsProps } from '../../redux/jobs/hawk'
import BuildList from '../BuildList'
import { AppBar, createMuiTheme, IconButton, MuiThemeProvider, Toolbar, Typography } from '@material-ui/core'
import { Error, Settings } from '@material-ui/icons'
import SettingsDialog from '../SettingsDialog'
import { JobConstants } from '../../redux/jobs/constants'
import { orgsHawk, OrgsProps } from '../../redux/organizations/orgs.hawk'
import { getOrgUIName } from '../../model/organization_utils'
import { failedBuilds, getUIName } from '../../model/job_utils'
import { buildsHawk, BuildsProps } from '../../redux/builds/hawk'

interface State {
  showSettings: boolean
}

class AppPage extends Component<JobsProps & OrgsProps & BuildsProps, State> {

  // every 4 hours auto refresh the page.
  static PAGE_REFRESH = 1000 * 60 * 60 * 4

  state: State = {
    showSettings: false,
  }

  theme = createMuiTheme({
    palette: {
      primary: { main: '#F54029' },
    },
  })

  componentDidMount() {
    dotenv.config()
    this.props.loadInitialOrganization()
    this.props.loadJobFilter()
    this.props.loadJobs()
    setInterval(() => this.props.loadJobs(), 15000)
    setInterval(() => window.location.reload(), AppPage.PAGE_REFRESH)
  }

  showSettingsMenu = () => {
    this.setState({ showSettings: true })
  }

  hideSettingsMenu = () => {
    this.setState({ showSettings: false })
  }

  render() {
    const { jobFilter, unsuccessfulBuildsList } = this.props
    const failedBuildCount = failedBuilds(unsuccessfulBuildsList)
    return (
      <MuiThemeProvider theme={this.theme}>
        <div className='app-container'>
          <AppBar position='static'>
            <Toolbar>
              <Typography variant='h2'
                          component='h2'
                          color='inherit'
                          className='app-toolbar-text'>{getOrgUIName(this.props.organizationFolder)}
                {jobFilter && jobFilter !== JobConstants.FilterViewAll && ` - ${getUIName(jobFilter)}`}</Typography>
              <IconButton color='inherit'
                          onClick={this.showSettingsMenu}>
                <Settings fontSize='large' />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div className='app-column-container'>
            <div className='app-column app-column-small'
                 style={{ flex: 1 }}>
              <BuildList isStream={true} />
            </div>
            <div className='app-column'
                 style={{ flex: 3 }}>
              <div className='app-header-container'>
                <Error color='primary'
                       fontSize='large' />
                <Typography variant='h4'
                            component='h4'
                            className='app-header-text'>Attention Zone
                  {failedBuildCount > 0 && ` - ${failedBuildCount} Build${failedBuildCount > 1 ? 's' : ''} Need Attention`}
                </Typography>
              </div>
              <BuildList isStream={false} />
            </div>
          </div>
        </div>
        <SettingsDialog open={this.state.showSettings}
                        onClose={this.hideSettingsMenu} />
      </MuiThemeProvider>
    )
  }
}

export default buildsHawk(orgsHawk(jobsHawk(AppPage)))
