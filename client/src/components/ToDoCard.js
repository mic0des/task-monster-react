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

function ToDoCard(props) {
  const { classes, handleClickOpen, taskProgress, taskName } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            Task Progress: {taskProgress}%
          </Typography>
          <Typography variant="headline" component="h2">
            {taskName}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Shrödinger Level 1
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={props.handleClickOpen} style={{color: '#3f51b5'}} size="small">Work On</Button>
        </CardActions>
      </Card>
    </div>
  );
}

ToDoCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToDoCard);