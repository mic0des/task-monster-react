import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

export default class Footer extends Component {

	render(){
		return (
			<Grid container spacing={12} alignItems="center" direction="row" justify="flex-start">
				<Grid container spacing={6} alignItems="left" direction="row" justify="flex-start">
					<Grid item xs={2}><a onClick={(e) => {e.preventDefault()}} style={{color: "#4054b2", marginLeft: "1em", textDecoration: "none"}} href=""><p style={{marginLeft: "1em"}}>Code of Conduct</p></a></Grid>
					<Grid item xs={2}><a onClick={(e) => {e.preventDefault()}} style={{color: "#4054b2", marginLeft: "1em", textDecoration: "none"}} href=""><p>Press Coverage</p></a></Grid>
					<Grid item xs={2}><a onClick={(e) => {e.preventDefault()}} style={{color: "#4054b2", marginLeft: "1em", textDecoration: "none"}} href=""><p>Contact</p></a></Grid>
				</Grid>
			</Grid>
		)
	}

}