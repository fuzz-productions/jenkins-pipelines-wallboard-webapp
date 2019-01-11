import React, { Component } from 'react'
import './styles.scss'
import { Menu, MenuItem, Typography } from '@material-ui/core'

export interface MenuOption {
  display: string
  value: string
}

export interface MenuWithOptionProps {
  options: Array<MenuOption>
  selectedOption?: MenuOption
  onSelected: (option: MenuOption) => void
}

interface State {
  anchorEl: any
}

export class MenuWithOptions extends Component<MenuWithOptionProps, State> {

  state: State = {
    anchorEl: null,
  }

  handleClickText = (event: any) => {
    this.setState({
      anchorEl: event.currentTarget,
    })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  handleMenuItemClick = (opt: MenuOption) => {
    this.setState({
      anchorEl: null,
    }, () => this.props.onSelected(opt))
  }

  render(): React.ReactNode {
    let { options, selectedOption } = this.props
    let { anchorEl } = this.state
    return <div className="menu-opts-container">
      <Typography onClick={this.handleClickText}>
        {selectedOption && selectedOption.display}
        {!selectedOption && 'Choose An Option'}
      </Typography>
      <Menu open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={this.handleClose}>
        {options.map((opt) => (
          <MenuItem key={opt.value}
                    selected={opt === selectedOption}
                    onClick={() => this.handleMenuItemClick(opt)}>
            {opt.display}
          </MenuItem>

        ))}
      </Menu>
    </div>
  }
}
