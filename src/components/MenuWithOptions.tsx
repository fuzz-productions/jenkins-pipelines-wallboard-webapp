import React, { Component } from 'react'
import { Menu, MenuItem, Typography } from '@material-ui/core'
import styled from 'styled-components'

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

const StyledMenuOptsContainer = styled.div`
  max-width: 360px;
`

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
    const { options, selectedOption } = this.props
    const { anchorEl } = this.state
    return <StyledMenuOptsContainer>
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
    </StyledMenuOptsContainer>
  }
}
