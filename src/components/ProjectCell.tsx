/// project group cell
import React from 'react'
import { Card, List } from 'antd'
import { FolderJob, Job } from '../model'


export default function ProjectCell({ item }: { item: FolderJob }) {
  return <Card title={item.displayName}
               style={{ minHeight: '290px' }}>
    <List

      dataSource={item.jobs}
      renderItem={(item: Job) => {
        let result = item.lastBuild && item.lastBuild.result
        if (result != null) {
          result = result.toLowerCase()
        } else {
          result = 'null'
        }
        return <li className={result}><span>{item.name}</span>
          {(() => {
            if (item.lastBuild && item.lastBuild.number > 1) {
              return <span> #{item.lastBuild.number}</span>
            }
          })()}

        </li>
      }}
    />
  </Card>
}
