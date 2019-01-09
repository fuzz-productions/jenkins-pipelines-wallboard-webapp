import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

export default function mainColumn({ children }: Props) {
  return <div className="app-column">
    {children}
  </div>
}
