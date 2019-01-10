import React from 'react'
import { Typography } from '@material-ui/core'
import { MenuOption, MenuWithOptions } from '../MenuWithOptions'
import './styles.scss'

interface Props {
  options: Array<MenuOption>
  label: string
}

export function SettingsFilter({ options, label }: Props) {
  return <div className="settings-filter-line-item">
    <Typography component="p"
                variant="body1">{label}</Typography>
    <MenuWithOptions options={options} />
  </div>
}
