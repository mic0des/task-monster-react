import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class ToDoCard extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      percent: props.taskProgress,
      monsterLevel: props.monsterLevel
    };
  }

  // componentWillReceiveProps(nextProps) {
  //  this.setState({
  //    percent: nextProps.taskProgress
  //  })
  // }

renderName(taskName){
  if (this.props.finished === true) {
    return taskName.concat(" ✓") 
  } else {
    return taskName
  }
}

render() {
  const { classes, handleClickOpen, taskProgress, taskName, taskMonster, monsterLevel } = this.props;
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            Task Progress: {taskProgress}%
          </Typography>
          <Typography variant="headline" component="h2">
            {this.renderName(taskName)} 
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
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
}

ToDoCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return ({
    tasks: state.tasks,
    taskProgress: state.taskProgress
  })
}

export default withStyles(styles)(ToDoCard);
// export default connect(mapStateToProps)(ToDoCard);