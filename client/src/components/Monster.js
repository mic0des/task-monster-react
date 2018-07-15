import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const Monster = props => {
	const { classes } = props;
	return (
		<div className={classes.root} >
			<Grid container spacing={24}>
				<Grid item xs={3}>
					<img src="/Neko-Breathing-Resize.gif" id="monster" alt="your monster" height= "220px" width="281px" onMouseOver={e => (e.currentTarget.src = "/Neko-Open.gif")} onMouseLeave={e => (e.currentTarget.src = "/Neko-Breathing-Resize.gif")} onMouseUp={e => (e.currentTarget.src = "/Neko-Breathing-Resize.gif")}/>
				</Grid>
				<Grid item xs={3}>
					<Paper>
					<ul className="stats">
						<li style={{listStyleType: "none"}}><h3>Schrödinger</h3></li>
						<li style={{listStyleType: "none"}}><h4>Level 1</h4></li>
						<li style={{listStyleType: "none"}}>HP: 100</li>
						<li style={{listStyleType: "none"}}>Attack: 49</li>
						<li style={{listStyleType: "none"}}>Defense: 49</li>
						<li style={{listStyleType: "none"}}>Sp. Attack: 65</li>
						<li style={{listStyleType: "none"}}>Sp. Defense: 65</li>
						<li style={{listStyleType: "none"}}>Speed: 45</li>
					</ul>
					</Paper>
				</Grid>      			
      		</Grid>
		</div>
	)
}

Monster.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Monster);