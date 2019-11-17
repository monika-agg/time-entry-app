import React, { Fragment } from 'react'
import { table } from 'src/shared/components/style'

const PrintTask = ({ taskList, title = 'Your Task List' }) => {
  return (
    <Fragment>
      <h2>{title}</h2>
      <table css={table}>
        <tbody>
          <tr>
            <th>Task Name</th>
            <th>Project Name</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
          {taskList.map(({ name, project, startTime, endTime }) =>
            <tr key={startTime}>
              <td>{name}</td>
              <td>{project}</td>
              <td>{new Date(startTime).toLocaleString()}</td>
              <td>{new Date(endTime).toLocaleString()}</td>
            </tr>)}
        </tbody>
      </table>
    </Fragment>
  )
}

export default PrintTask
