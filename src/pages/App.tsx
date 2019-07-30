import dotenv from 'dotenv'
import React, { Component } from 'react'
import { jobsHawk, JobsProps } from '../redux/jobs/hawk'
import BuildList from './BuildList'
import { AppBar, createMuiTheme, IconButton, MuiThemeProvider, Toolbar, Typography } from '@material-ui/core'
import { Error, Settings } from '@material-ui/icons'
import SettingsDialog from './SettingsDialog'
import { JobConstants } from '../redux/jobs/constants'
import { orgsHawk, OrgsProps } from '../redux/organizations/orgs.hawk'
import { getOrgUIName } from '../model/organization_utils'
import { failedBuilds, getUIName } from '../model/job_utils'
import { buildsHawk, BuildsProps } from '../redux/builds/hawk'
import styled from 'styled-components'
import { bgColor, failureColor } from '../styles/colors'

interface State {
  showSettings: boolean
}

const StyledAppContainer = styled.div`
  text-align: center;
  background-color: ${bgColor};
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const StyledAppToolbarText = styled(Typography)`
  flex: 1;
  padding: 32px;
`

const StyledAppColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`

const StyledAppColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

const StyledAppColumnSmall = styled(StyledAppColumn)`
  max-width: 33%;
`

const StyledAppHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 16px;
  margin-top: 16px;
  margin-bottom: 16px;
`

const StyledAppHeaderText = styled(Typography)`
  padding-left: 16px;
  padding-right: 16px;
  color: ${failureColor} !important;
`

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
        <StyledAppContainer>
          <AppBar position='static'>
            <Toolbar>
              <StyledAppToolbarText variant='h2'
                                    component='h2'
                                    color='inherit'>{getOrgUIName(this.props.organizationFolder)}
                {jobFilter && jobFilter !== JobConstants.FilterViewAll && ` - ${getUIName(jobFilter)}`}</StyledAppToolbarText>
              <IconButton color='inherit'
                          onClick={this.showSettingsMenu}>
                <Settings fontSize='large' />
              </IconButton>
            </Toolbar>
          </AppBar>
          <StyledAppColumnContainer>
            <StyledAppColumnSmall
              style={{ flex: 1 }}>
              <BuildList isStream={true} />
            </StyledAppColumnSmall>
            <StyledAppColumn
              style={{ flex: 3 }}>
              <StyledAppHeaderContainer>
                <Error color='primary'
                       fontSize='large' />
                <StyledAppHeaderText variant='h4'
                                     component='h4'>Attention Zone
                  {failedBuildCount > 0 && ` - ${failedBuildCount} Build${failedBuildCount > 1 ? 's' : ''} Need Attention`}
                </StyledAppHeaderText>
              </StyledAppHeaderContainer>
              <BuildList isStream={false} />
            </StyledAppColumn>
          </StyledAppColumnContainer>
        </StyledAppContainer>
        <SettingsDialog open={this.state.showSettings}
                        onClose={this.hideSettingsMenu} />
      </MuiThemeProvider>
    )
  }
}

export default buildsHawk(orgsHawk(jobsHawk(AppPage)))
