import React from 'react'
import { Typography } from '@material-ui/core'
import { MenuWithOptionProps, MenuWithOptions } from './MenuWithOptions'
import styled from 'styled-components'

interface Props extends MenuWithOptionProps {
  label: string
}

const StyledSettingsFilterLineItem = styled.div`
  display: flex;
  flex-direction: row;
  width: 500px;
  justify-content: space-between;
`

export function SettingsFilter({ label, ...props }: Props) {
  return <StyledSettingsFilterLineItem>
    <Typography component='p'
                variant='body1'>{label}</Typography>
    <MenuWithOptions {...props} />
  </StyledSettingsFilterLineItem>
}
