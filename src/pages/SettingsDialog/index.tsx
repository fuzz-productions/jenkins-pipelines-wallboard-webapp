import React, { PureComponent } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import './styles.scss'
import { MenuOption } from '../../components/MenuWithOptions'
import { SettingsFilter } from '../../components/SettingsFilter'
import { orgsHawk, OrgsProps } from '../../redux/organizations/orgs.hawk'
import { LoadingModel } from '../../redux/loading.model'
import { FolderJob, OrganizationFolder } from '../../model'
import { settingsHawk, SettingsProps } from '../../redux/settings/settings.hawk'
import { getUIName } from '../../model/job_utils'
import { jobsHawk, JobsProps } from '../../redux/jobs/hawk'
import { JobConstants } from '../../redux/jobs/constants'

interface Props extends OrgsProps, SettingsProps, JobsProps {
  open: boolean
  onClose: Function
}

class SettingsDialog extends PureComponent<Props> {

  onClose = () => {
    this.props.onClose()
  }

  onSave = () => {
    const { selectFolder, currentOrg, currentProject, selectJobFilter } = this.props

    // save options and close
    if (currentOrg) {
      selectFolder(currentOrg.value)
    }
    if (currentProject) {
      selectJobFilter(currentProject.value)
    }

    this.onClose()
  }

  componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
    if (nextProps) {
      if (nextProps.open && !this.props.open) {
        this.props.loadOrgs()
        this.props.loadProjects()
      }
    }
  }

  selectOrgFolder = (option: MenuOption) => {
    this.props.selectTempOrg(option)
  }

  selectProjectFilter = (option: MenuOption) => {
    this.props.selectTempProject(option)
  }

  extractFolderListing = (orgModel: LoadingModel<Array<OrganizationFolder>>): Array<MenuOption> => {
    let foldersListing: Array<MenuOption> = []
    if (orgModel.isSuccess()) {
      foldersListing = orgModel.success.map((org) => ({
        display: org.name,
        value: org.name,
      }))
    }
    return foldersListing
  }

  extractSelectedOrganization = (selectedOrg: MenuOption | undefined,
                                 foldersListing: Array<MenuOption>,
                                 currentFolder: string): MenuOption | undefined => {
    let orgToSelect = selectedOrg
    if (!orgToSelect) {
      orgToSelect = foldersListing.find((org) => org.value === currentFolder)
      if (!orgToSelect) { // if all else fails
        orgToSelect = foldersListing[0]
      }
    }
    return orgToSelect
  }

  extractProjectListing = (projectModel: LoadingModel<Array<FolderJob>>): Array<MenuOption> => {
    let projectsListing: Array<MenuOption> = []
    projectsListing.push({
      display: 'View All',
      value: JobConstants.FilterViewAll,
    })
    if (projectModel.isSuccess()) {
      projectsListing = projectsListing.concat(projectModel.success.map((project) => ({
        display: getUIName(project.displayName),
        value: project.displayName,
      })))
    }
    return projectsListing
  }

  extractSelectedProjectFilter = (selectedProject: MenuOption | undefined,
                                  projects: Array<MenuOption>,
                                  currentProject?: string): MenuOption | undefined => {
    let projectToSelect = selectedProject
    if (!projectToSelect) {
      if (currentProject) {
        projectToSelect = projects.find((proj) => proj.value === currentProject)
      }
      if (!projectToSelect) {
        projectToSelect = projects[0]
      }
    }
    return projectToSelect
  }

  render(): React.ReactNode {
    const { open, orgModel, currentFolder, currentOrg, currentProject, projectsModel, jobFilter } = this.props
    const foldersListing = this.extractFolderListing(orgModel)
    const projectsListing = this.extractProjectListing(projectsModel)
    const orgToSelect = this.extractSelectedOrganization(currentOrg, foldersListing, currentFolder)
    const projectToSelect = this.extractSelectedProjectFilter(currentProject, projectsListing, jobFilter)
    return <Dialog open={open}
                   aria-labelledby='settings-dialog-title'
                   onClose={this.onClose}>
      <DialogTitle id='settings-dialog-title'>Select Filters</DialogTitle>
      <DialogContent>
        <SettingsFilter
          selectedOption={orgToSelect}
          onSelected={this.selectOrgFolder}
          options={foldersListing}
          label='Projects Folder'
        />
        <SettingsFilter
          selectedOption={projectToSelect}
          onSelected={this.selectProjectFilter}
          options={projectsListing}
          label='Select Project'
        />
      </DialogContent>
      <DialogActions>
        <Button color='primary'
                onClick={this.onSave}>
          Save
        </Button>
        <Button color='secondary'
                onClick={this.onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  }

}

export default jobsHawk(settingsHawk(orgsHawk(SettingsDialog)))
