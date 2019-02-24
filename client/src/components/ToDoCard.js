import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class ToDoCard extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      liked: 0
    };
  }

  renderName = taskName => {
    if (this.props.finished === true) {
      return taskName.concat(" ✔") 
    } else {
      return taskName
    }
  }

  // likeTask = () => {
  //   this.setState((prevState) => {
  //     return {
  //       liked: prevState.liked + 1       
  //     }
  // //   })

  //           <Button onClick={this.likeTask} style={{color: '#3f51b5'}} size="small">Like</Button>
  //         <span>{this.state.liked}</span>
  // }

  render() {
    const { classes, handleClickOpen, taskProgress, taskName, taskMonster, monsterLevel } = this.props;
    return (
    <div>
      <Card>
        <CardContent>
          <Typography color="textSecondary">
            Task Progress: {taskProgress}%
          </Typography>
          <Typography variant="headline" component="h2">
            {this.renderName(taskName)} 
          </Typography>
          <Typography color="textSecondary">
            {taskMonster.nickname} Level {taskMonster.level}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleClickOpen} style={{color: '#3f51b5'}} size="small">Work On</Button>
        </CardActions>
      </Card>
    </div>
  );
  }


}

ToDoCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default ToDoCard;