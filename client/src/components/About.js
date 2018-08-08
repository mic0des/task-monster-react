import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import SignInForm from './auth/SignInForm';
import Typography from '@material-ui/core/Typography';

export default class About extends Component {
	render(){
		return (
			<Grid container spacing={24} alignItems="center" direction="row" justify="flex-start">
					
					<Grid item xs={6}>
						<img style={{margin: "1.5em 16.5em 0.5em"}} src="/lucky-egg.png" height="80px" width="80px" alt=""/>
						<SignInForm />
					</Grid>
					<Grid item xs={6}>
					 <h2><Typography style={{fontWeight: "700", color: "#3f51b5"}} variant="display2">Stay productive,</Typography></h2>
					 	  <h2><Typography style={{fontWeight: "700", color: "#3f51b5"}} variant="display2">Make monster friends,</Typography></h2>
					 		<h2><Typography style={{fontWeight: "700", color: "#3f51b5"}} variant="display2">Powered by the Ethereum blockchain!</Typography></h2>
					 		<Grid container spacing={12} alignItems="center" direction="row" justify="flex-start">
					 		<Grid item xs={6}>
					 		<img src="/Schrodinger-Normal.gif" height="110px" width="140.50px"/>
					 		</Grid>
					 		<Grid item xs={6}>
					 		<img src="/Leaflet-Happy.gif" height="130px" width="140.50px" style={{marginLeft: "-9em", marginTop: "0.2em"}} />
					 		</Grid>	
					 		</Grid>
					</Grid>
			</Grid>
		)
	}
}