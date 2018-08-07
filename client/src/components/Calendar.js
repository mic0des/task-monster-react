import React from 'react'
import { render } from 'react-dom'
import moment from 'moment'
import TaskModule from './TaskModule';

import BigCalendar from 'react-big-calendar'
BigCalendar.momentLocalizer(moment)

export default class Calendar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      events: 
        props.taskLists.map(taskList => ({
        start: taskList.deadline.split("T")[0],
        end: taskList.deadline.split("T")[0],
        title: taskList.name,
        id: taskList.id, 
        last_saved: taskList.last_saved,
        monster: taskList.monster
      }))
    }
  }

  componentWillReceiveProps(nextprops) {
    this.setState({
     events: 
        nextprops.taskLists.map(taskList => ({
        start: taskList.deadline.split("T")[0],
        end: taskList.deadline.split("T")[0],
        title: taskList.name,
        id: taskList.id, 
        last_saved: taskList.last_saved,
        monster: taskList.monster
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