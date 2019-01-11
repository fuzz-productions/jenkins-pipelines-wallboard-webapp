import React, { Component } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import './styles.scss'
import { MenuOption } from '../../components/MenuWithOptions'
import { SettingsFilter } from '../../components/SettingsFilter'
import { orgsHawk, OrgsProps } from '../../redux/organizations/orgs.hawk'

interface Props {
  open: boolean
  onClose: Function
}

interface State {
  selectedOrg?: MenuOption
  selectedProjectFilter?: MenuOption
}


class SettingsDialog extends Component<Props & OrgsProps, State> {

  state: State = {}

  onClose = () => {
    this.props.onClose()
  }

  onSave = () => {
    const { selectedOrg } = this.state
    const { selectFolder } = this.props

    // save options and close
    if (selectedOrg) {
      selectFolder(selectedOrg.value)
    }

    this.onClose()
  }

  componentDidMount(): void {
    this.props.loadOrgs()
  }

  selectOrgFolder = (option: MenuOption) => {
    this.setState({
      selectedOrg: option,
    })
  }

  selectProjectFilter = (option: MenuOption) => {
    this.setState({
      selectedProjectFilter: option,
    })
  }

  render(): React.ReactNode {
    const { open, orgModel, currentFolder } = this.props
    const { selectedOrg, selectedProjectFilter } = this.state
    let foldersListing: Array<MenuOption> = []
    if (orgModel.isSuccess()) {
      foldersListing = orgModel.success.map((org) => ({
        display: org.name,
        value: org.name,
      }))
    }
    let orgToSelect = selectedOrg
    if (!orgToSelect) {
      orgToSelect = foldersListing.find((org) => org.value === currentFolder)
      if (!orgToSelect) { // if all else fails
        orgToSelect = foldersListing[0]
      }
    }
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

export default orgsHawk(SettingsDialog)
