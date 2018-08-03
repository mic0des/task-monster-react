import React from 'react'
import { render } from 'react-dom'
import moment from 'moment'

import BigCalendar from 'react-big-calendar'
BigCalendar.momentLocalizer(moment)

export default class Calendar extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      events: []
    }
  }

  componentWillReceiveProps(nextprops) {
    this.setState({
     events: 
        nextprops.taskLists.map(taskList => ({
        start: taskList.deadline.split("T")[0],
        end: taskList.deadline.split("T")[0],
        title: taskList.name
      }))
      
    })
  }

  render () {
    return (
      <BigCalendar
        style={{height: '420px'}}
        events={this.state.events}
      />
    )
  }
}