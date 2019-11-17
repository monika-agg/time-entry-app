import React, { useState } from 'react'
import DatePicker from 'react-datetime'
import { loginContainer, loginBtn, errorStyle } from 'src/shared/components/style'

const getStartDate = () => {
  let startDate = new Date()
  startDate.setDate(startDate.getDate() - 7)
  startDate.setHours(0, 0, 0)
  return startDate
}

const ReportFilter = ({ submit }) => {
  const [{
    startDate, endDate, errorMessage
  }, setState] = useState({
    startDate: getStartDate(),
    endDate: new Date()
  })

  const setData = (field, value) => {
    setState(prev => ({ ...prev, [field]: value }))
  }

  const handleStartDateChange = (date) => {
    setData('startDate', date)
  }

  const handleEndDateChange = (date) => {
    setData('endDate', date)
  }

  const onClick = () => {
    if (endDate < startDate) {
      return setData('errorMessage', 'Please select valid date range')
    }
    setData('errorMessage', '')
    submit(startDate, endDate)
  }

  return (
    <div css={loginContainer}>
      <h2>View Your previous tasks</h2>
      <label>Start Date</label>
      <DatePicker
        defaultValue={startDate}
        onChange={(date) => handleStartDateChange(date.valueOf())}
      />
      <label>End Date</label>
      <DatePicker
        defaultValue={endDate}
        onChange={(date) => handleEndDateChange(date.valueOf())}
      />
      <button css={loginBtn} onClick={() => onClick()}>Show Tasks</button>
      {
        errorMessage && <span css={errorStyle}>{errorMessage}</span>
      }
    </div>
  )
}
export default ReportFilter
