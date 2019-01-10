import React, { PureComponent } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import './styles.scss'
import { MenuOption } from '../../components/MenuWithOptions'
import { SettingsFilter } from '../../components/SettingsFilter'
import { orgsHawk, OrgsProps } from '../../redux/organizations/orgs.hawk'

interface Props {
  open: boolean
  onClose: Function
}

class SettingsDialog extends PureComponent<Props & OrgsProps> {

  onClose = () => {
    this.props.onClose()
  }

  onSave = () => {
    this.onClose()
  }


  componentDidMount(): void {
    this.props.loadOrgs()
  }

  render(): React.ReactNode {
    const { open, orgModel } = this.props
    let foldersListing: Array<MenuOption> = []
    if (orgModel.isSuccess()) {
      foldersListing = orgModel.success.map((org) => ({
        display: org.name,
        value: org.name,
      }))
    }
    return <Dialog open={open}
                   aria-labelledby="settings-dialog-title"
                   onClose={this.onClose}>
      <DialogTitle id="settings-dialog-title">Select Filters</DialogTitle>
      <DialogContent>
        <SettingsFilter options={foldersListing}
                        label="Projects Folder" />
        <SettingsFilter options={foldersListing}
                        label="Select Project" />
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
