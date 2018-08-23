import React from 'react';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import TaskModule from './TaskModule';


class TaskLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskLists: props.taskLists
    }
  }

  render() {
    return (
        <Grid container spacing={24} alignItems="center" direction="row" justify="flex-start">
        {this.props.taskLists.map((taskList, index)=> <Grid key={index} item xs={3}> <TaskModule style={{height: "65%"}} finished={taskList.finished} lastSaved={taskList.last_saved} taskName={taskList.name} taskMonster={taskList.monster} deadline={taskList.deadline} taskListId={taskList.id} /> </Grid>)}
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