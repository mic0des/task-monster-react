import React from 'react'
import { render } from 'react-dom'
import moment from 'moment'
import TaskModule from './TaskModule';
import Button from '@material-ui/core/Button';

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


  //  BEGIN:VCALENDAR
  //  VERSION:2.0
  //  CALSCALE:GREGORIAN
  //  PRODID:adamgibbons/ics
  //  BEGIN:VEVENT
  //  UID:070bbdd0-a6de-11e7-9552-4faa901a846b
  //  SUMMARY:Bolder Boulder
  //  DTSTAMP:20171002T012300Z
  //  DTSTART:20180530T125000Z
  //  DESCRIPTION:Annual 10-kilometer run in Boulder, Colorado
  //  URL:http://www.bolderboulder.com/
  //  GEO:40.0095;105.2669
  //  LOCATION:Folsom Field, University of Colorado (finish line)
  //  STATUS:CONFIRMED
  //  CATEGORIES:10k races,Memorial Day Weekend,Boulder CO
  //  ATTENDEE;RSVP=TRUE;CN=Adam Gibbons:mailto:adam@example.com
  //  ATTENDEE;RSVP=FALSE;CN=Brittany Seaton:mailto:brittany@example2.org
  //  BEGIN:VALARM
  //  ACTION:DISPLAY
  //  DESCRIPTION:Reminder
  //  TRIGGER;VALUE=DATE-TIME:20180530T020000Z
  //  END:VALARM
  //  DURATION:PT5H
  //  END:VEVENT
  //  END:VCALENDAR

  downloadIcsFile = () => {
    let element = document.createElement("a");
    let events = "BEGIN:VCALENDAR\nVERSION:2.0\n".concat(this.state.events.map(event => `BEGIN:VEVENT\nURL:https://github.com/jelocodes/task-monster-react\nDTSTART: ${event.start.split("-").join("")}T000000Z\nDTEND: ${event.end.split("-").join("")}T000000Z\nSUMMARY:${event.title}\nDESCRIPTION:TaskMonster task\nLOCATION:Planet Earth\nEND:VEVENT`).join("\n")).concat("\nEND:VCALENDAR")
    let file = new Blob([events.replace(/\n/g, "\r\n")], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "taskMonster.ics";
    element.click();
    window.open("https://calendar.google.com/calendar/r/settings/export")
  }

  render () {
    return (
      <div>
      <Button onClick={this.downloadIcsFile} variant="outlined" color="primary">Export .ICS to Google Calendar</Button>
      <br/>
      <br/>
      <BigCalendar
        style={{height: '420px'}}
        events={this.state.events}
      />
      <br/>
      </div>
    )
  }
}