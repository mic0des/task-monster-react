import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const ToDoCard = props => {

  const renderName = taskName => {
    if (props.finished === true) {
      return taskName.concat(" ✔") 
    } else {
      return taskName
    }
  }

  const { classes, handleClickOpen, taskProgress, taskName, taskMonster, monsterLevel } = props;

  return (
    <div>
      <Card>
        <CardContent>
          <Typography color="textSecondary">
            Task Progress: {taskProgress}%
          </Typography>
          <Typography variant="headline" component="h2">
            {renderName(taskName)} 
          </Typography>
          <Typography color="textSecondary">
            {taskMonster.nickname} Level {monsterLevel}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleClickOpen} style={{color: '#3f51b5'}} size="small">Work On</Button>
        </CardActions>
      </Card>
    </div>
  );

}

ToDoCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default ToDoCard;