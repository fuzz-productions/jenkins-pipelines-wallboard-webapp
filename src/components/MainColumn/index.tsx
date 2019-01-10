import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  flex?: number
}

export default function mainColumn({ flex = 1, children }: Props) {
  return <div className="app-column"
              style={{ flex }}>
    {children}
  </div>
}
