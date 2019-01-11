import React from 'react'
import { Typography } from '@material-ui/core'
import { MenuWithOptionProps, MenuWithOptions } from '../MenuWithOptions'
import './styles.scss'

interface Props extends MenuWithOptionProps {
  label: string
}

export function SettingsFilter({ label, ...props }: Props) {
  return <div className="settings-filter-line-item">
    <Typography component="p"
                variant="body1">{label}</Typography>
    <MenuWithOptions {...props} />
  </div>
}
