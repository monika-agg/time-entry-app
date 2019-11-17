import React, { useState, useRef, Fragment } from 'react'
import { createEntry } from 'shared/actions/task'
import connect from 'shared/connect'
import PrintTask from './PrintTask'
import {timer, loginContainer, loginBtn} from 'src/shared/components/style'

const AddItem = ({ createEntry, projectList }) => {
  const [{ name = '', project = '', started = false }, set] = useState({})
  const [{ startTime, count = 0 }, setTime] = useState({})
  const [taskList, setTaskList] = useState([])
  const ref = useRef(null)

  const setTaskData = (field, value) => {
    set(prev => ({ ...prev, [field]: value }))
  }
  const start = () => {
    setTaskData('started', true)
    setTime({ startTime: new Date().getTime(), count: 0 })
    ref.current = setInterval(() => {
      setTime(({ startTime, count = 0 }) => ({ startTime, count: count + 1 }))
    }, 1000)
  }

  const makeEntry = (task) => {
    setTaskList(prev => [...prev, task])
    createEntry(task)
  }

  const formatTimer = (count) => {
    const hours = Math.floor(count / 3600)
    const minutes = Math.floor((count - hours * 3600) / 60)
    const seconds = count - hours * 3600 - minutes * 60
    return `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`
  }

  const stop = () => {
    const endTime = new Date().getTime()
    setTaskData('started', false)
    clearInterval(ref.current)
    makeEntry({ name, project, startTime, endTime })
  }
  return (
    <Fragment>
      <div css={loginContainer}>
        <h2>Record your tasks here</h2>
        <label>What are you up to?</label>
        <input
          type='text'
          onChange={({ target: { value } }) => setTaskData('name', value)}
          value={name} />
        <label>Tag your task to a project</label>
        <select
          value={project}
          onChange={({ target: { value } }) => setTaskData('project', value)}>
          <option value=''>Select</option>
          {
            projectList.map(({ key, label }) => (<option value={key} key={key}>{label}</option>))
          }
        </select>

        {started && <div css={timer}>Time Elapsed: {formatTimer(count)}</div>}

        <button css={loginBtn} onClick={started ? stop : start}>{started ? 'End Task' : 'Start'}</button>
      </div>
      {
        taskList && !!taskList.length && <PrintTask taskList={taskList} title='Recent Tasks' />
      }
    </Fragment>
  )
}

const props = () => ({})
export default connect({ props, actions: { createEntry } })(AddItem)
