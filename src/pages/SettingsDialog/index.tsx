import React, { PureComponent } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import './styles.scss'
import { MenuOption } from '../../components/MenuWithOptions'
import { SettingsFilter } from '../../components/SettingsFilter'
import { orgsHawk, OrgsProps } from '../../redux/organizations/orgs.hawk'
import { LoadingModel } from '../../redux/loading.model'
import { OrganizationFolder } from '../../model'
import { settingsHawk, SettingsProps } from '../../redux/settings/settings.hawk'

interface Props {
  open: boolean
  onClose: Function
}

class SettingsDialog extends PureComponent<Props & OrgsProps & SettingsProps> {

  onClose = () => {
    this.props.onClose()
  }

  onSave = () => {
    const { selectFolder, currentOrg, currentProject } = this.props

    // save options and close
    if (currentOrg) {
      selectFolder(currentOrg.value)
    }

    this.onClose()
  }

  componentDidMount(): void {
    this.props.loadOrgs()
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

  extractSelectedOrganization = (selectedOrg: MenuOption | undefined, foldersListing: Array<MenuOption>, currentFolder: string) => {
    let orgToSelect = selectedOrg
    if (!orgToSelect) {
      orgToSelect = foldersListing.find((org) => org.value === currentFolder)
      if (!orgToSelect) { // if all else fails
        orgToSelect = foldersListing[0]
      }
    }
    return orgToSelect
  }

  render(): React.ReactNode {
    const { open, orgModel, currentFolder, currentOrg, currentProject } = this.props
    let foldersListing = this.extractFolderListing(orgModel)
    let orgToSelect = this.extractSelectedOrganization(currentOrg, foldersListing, currentFolder)
    return <Dialog open={open}
                   aria-labelledby="settings-dialog-title"
                   onClose={this.onClose}>
      <DialogTitle id="settings-dialog-title">Select Filters</DialogTitle>
      <DialogContent>
        <SettingsFilter
          selectedOption={orgToSelect}
          onSelected={this.selectOrgFolder}
          options={foldersListing}
          label="Projects Folder"
        />
        <SettingsFilter
          selectedOption={orgToSelect}
          onSelected={this.selectProjectFilter}
          options={foldersListing}
          label="Select Project"
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary"
                onClick={this.onSave}>
          Save
        </Button>
        <Button color="secondary"
                onClick={this.onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  }

}

export default settingsHawk(orgsHawk(SettingsDialog))
