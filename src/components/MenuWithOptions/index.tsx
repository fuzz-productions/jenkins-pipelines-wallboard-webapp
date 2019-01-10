import React, { Component } from 'react'
import './styles.scss'
import { Menu, MenuItem, Typography } from '@material-ui/core'

export interface MenuOption {
  display: string
  value: string
}

interface Props {
  options: Array<MenuOption>
}

interface State {
  selectedIndex: number
  anchorEl: any
}

export class MenuWithOptions extends Component<Props, State> {

  state: State = {
    selectedIndex: 0,
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

  handleMenuItemClick = (index: number) => {
    this.setState({
      anchorEl: null,
      selectedIndex: index,
    })
  }

  render(): React.ReactNode {
    let { options } = this.props
    let { selectedIndex, anchorEl } = this.state
    return <div className="menu-opts-container">
      <Typography onClick={this.handleClickText}>
        {options[selectedIndex] && options[selectedIndex].display}
      </Typography>
      <Menu open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={this.handleClose}>
        {options.map((opt, index) => (
          <MenuItem key={opt.value}
                    selected={index === selectedIndex}
                    onClick={() => this.handleMenuItemClick(index)}>
            {opt.display}
          </MenuItem>

        ))}
      </Menu>
    </div>
  }
}
