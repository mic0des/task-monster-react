import React from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import TaskModule from './TaskModule';

const TaskLists = (props) => {

  if (props.taskLists.length === 0) {
    return (
      <p style={{textAlign: "center"}}>Nothing to do yet...</p>
    )
  } else {
    return (
      <Grid container spacing={24} alignItems="center" direction="row" justify="flex-start">
        {props.taskLists.map((taskList, index)=> <Grid key={index} item xs={12}  md={3} > <TaskModule history={props.history} taskKey={index} style={{height: "65%"}} finished={taskList.finished} lastSaved={taskList.last_saved} taskName={taskList.name} taskMonster={taskList.monster} deadline={taskList.deadline} taskListId={taskList.id} /> </Grid>)}
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};
 
export default connect(mapStateToProps)(TaskLists);