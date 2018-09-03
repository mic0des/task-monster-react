import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ProgressBar from './ProgressBar';

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

class Monster extends React.Component {

  monsterState(baseUrl, happyUrl, koUrl, taskMonster, daysLeft) {
    if (this.props.finished === true) {
      return <img src={happyUrl} id="monster" alt="your monster" height="55px" width="70.25px" />
    } else if (daysLeft <= 0){
      return <img src={koUrl} id="monster" alt="your monster" height="55px" width="70.25px" />
    } else {
      return <img src={baseUrl} id="monster" alt="your monster" height="55px" width="70.25px" onMouseOver={e => (e.currentTarget.src=`/${taskMonster.nickname}-Happy.gif`)} onMouseLeave={e => (e.currentTarget.src=`/${taskMonster.nickname}-Normal.gif`)} onMouseUp={e => (e.currentTarget.src=`/${taskMonster.nickname}-Normal.gif`)}/>      
    }
  }

	render() {
		const { classes, taskMonster, tasks, levelUp, monsterLevel, daysLeft } = this.props;
		const baseUrl = `/${taskMonster.nickname}-Normal.gif`;
    	const happyUrl = `/${taskMonster.nickname}-Happy.gif`;
    	const koUrl = `/${taskMonster.nickname}-KO.png`;

		return (
			<div className={classes.root} >
				<Grid container spacing={24} alignItems="center" direction="row" justify="center">
					<Grid item xs={2}>
            			{this.monsterState(baseUrl, happyUrl, koUrl, taskMonster, daysLeft)}
					</Grid>
					<Grid item xs={7}>				
						<ul className="stats">
							<li style={{listStyleType: "none", fontFamily: "Roboto"}}><h3>{taskMonster.nickname} {taskMonster.gender} Level {monsterLevel}</h3></li>
						</ul>					
					</Grid> 
					<ProgressBar levelUp={levelUp} finished={this.props.finished} taskMonster={taskMonster} lastSaved={tasks.taskProgress} />     			
      			</Grid>
			</div>
		)
	}
}

Monster.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Monster);