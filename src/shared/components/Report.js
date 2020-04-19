import React, { Fragment, useState } from 'react'
import connect from 'shared/connect'
import TaskFilter from './TaskFilter'
import { fetchList } from 'shared/actions/task'
import PrintTask from './PrintTask'
import PageWrapper from './PageWapper'

const PageType = 'REPORT'

const Report = ({ fetchList }) => {
  const [task, setTask] = useState([])

  const onSubmit = (startTime, endTime) => {
    fetchList().then(entries => {
      let filteredList = Object.values(entries).map(item => {
        return {
          name: item.taskName,
          project: item.project,
          startTime: item.startTime && new Date(item.startTime).getTime(),
          endTime: item.endTime && new Date(item.endTime).getTime()
        }
      }).filter(item => {
        return item.startTime && item.startTime > startTime &&
          item.endTime && item.endTime < endTime
      })
      console.log("!!!!!!!!", filteredList)
      setTask(filteredList)
    })
  }
  return (
    <Fragment>
      <TaskFilter submit={(stateDate, endDate) => onSubmit(stateDate, endDate)} />
      {
        task && !!task.length && <PrintTask taskList={task} />
      }
    </Fragment>
  )

}

export default connect({ actions: { fetchList } })(PageWrapper(PageType)(Report))
