import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

export class ProgressBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      progress: 0
    };
  }

  componentWillReceiveProps(nextprops) {
    this.setState({
      progress: nextprops.tasks.filter(task => task.done === true).length
    })
  }
  
  eventHandler() {
    this.setState({
      progress: this.props.tasks.filter(task => task.done === true).length
    });
  }

  tasksChecked() {
    this.props.tasks.filter(task => task.done === true).length;
  }
  
  render() {
    let progress = {
      width: parseInt(((this.state.progress / this.props.tasks.length) * 100),10) + "%"
    }

    return (
      <div>
         <Grid style={{paddingTop: '0px'}} container spacing={24} alignItems="center" direction="row" justify="center">
           <Grid item xs={8.5}>
            <p>EXP to next Level:</p>
            <div className="shell">
              <div className="bar" style={ progress }><span>{ (parseInt(((this.state.progress / this.props.tasks.length) * 100),10)) + "%" }</span></div>
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return ({
    tasks: state.tasks
  })
}

export default connect(mapStateToProps)(ProgressBar);
