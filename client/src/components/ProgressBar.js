import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const ProgressBar = (props) => {

  let tasksChecked = () => props.tasks.filter(task => task.done === true).length;
  
  let progress = {
    width: parseInt((((props.tasks.filter(task => task.done === true).length) / props.tasks.length) * 100),10) + "%"
  }

  if (props.finished === true) {
    return <p>CONGRATS! TASK FINISHED!</p>
  } else {
    return (
      <div>
        <Grid style={{paddingTop: '0px'}} container spacing={24} alignItems="center" direction="row" justify="center">
          <Grid item xs={8.5}>
            <p>EXP to next Level:</p>            
            {(parseInt((((props.tasks.filter(task => task.done === true).length) / props.tasks.length) * 100),10)) === 100 ? <div style={{visibility: "hidden"}} className="shell"><Button style={{visibility: "visible", marginTop: "-10px"}} onClick={props.levelUp} variant="contained" color="secondary">Finished?</Button></div> : <div className="shell"><div className="bar" style={ progress }><span>{ (parseInt((((props.tasks.filter(task => task.done === true).length) / props.tasks.length) * 100),10)) + "%" }</span></div></div>}             
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return ({
    // taskProgress: state.taskProgress
  })
}

export default connect(mapStateToProps)(ProgressBar);
