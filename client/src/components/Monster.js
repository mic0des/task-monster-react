import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ProgressBar from './ProgressBar';

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

const Monster = props => {
	const { classes, taskMonster, tasks } = props;
	const baseUrl = `/${taskMonster.nickname}-Normal.gif`
	return (
		<div className={classes.root} >
			<Grid container spacing={24} alignItems="center" direction="row" justify="center">
				<Grid item xs={2}>
					<img src={baseUrl} id="monster" alt="your monster" height="55px" width="70.25px" onMouseOver={e => (e.currentTarget.src=`/${taskMonster.nickname}-Happy.gif`)} onMouseLeave={e => (e.currentTarget.src=`/${taskMonster.nickname}-Normal.gif`)} onMouseUp={e => (e.currentTarget.src=`/${taskMonster.nickname}-Normal.gif`)}/>
				</Grid>
				<Grid item xs={7}>				
					<ul className="stats">
						<li style={{listStyleType: "none", fontFamily: "Roboto"}}><h3>{taskMonster.nickname} {taskMonster.gender} Level {taskMonster.level}</h3></li>
					</ul>					
				</Grid> 
				<ProgressBar taskMonster={taskMonster} lastSaved={tasks.taskProgress} />     			
      		</Grid>
		</div>
	)
}

Monster.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Monster);