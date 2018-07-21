import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

const Monster = props => {
	const { classes } = props;
	return (
		<div className={classes.root} >
			<Grid container spacing={24} alignItems="center" direction="row" justify="center">
				<Grid item xs={2}>
					<img src="/Neko-Breathing-Resize.gif" id="monster" alt="your monster" height= "55px" width="70.25px" onMouseOver={e => (e.currentTarget.src = "/Neko-Open.gif")} onMouseLeave={e => (e.currentTarget.src = "/Neko-Breathing-Resize.gif")} onMouseUp={e => (e.currentTarget.src = "/Neko-Breathing-Resize.gif")}/>
				</Grid>
				<Grid item xs={7}>				
					<ul className="stats">
						<li style={{listStyleType: "none", fontFamily: "Roboto"}}><h3>Schrödinger ♂ Level 1</h3></li>
					</ul>					
				</Grid>      			
      		</Grid>
		</div>
	)
}

Monster.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Monster);