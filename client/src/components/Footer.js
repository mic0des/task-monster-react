import React from 'react';
import Grid from '@material-ui/core/Grid';

const Footer = (props) =>
	<div>
		<Grid className="footer" container spacing={6} style={{position: "fixed", background: "white", bottom: "0"}} alignItems="left" direction="row" justify="flex-start">
			<Grid item xs={2}><a onClick={(e) => {e.preventDefault()}} style={{color: "#4054b2", marginLeft: "1em", textDecoration: "none"}} href=""><p style={{marginTop: "0px", marginLeft: "1em"}}>Code of Conduct</p></a></Grid>
			<Grid item xs={2}><a onClick={(e) => {e.preventDefault()}} style={{color: "#4054b2", marginLeft: "1em", textDecoration: "none"}} href=""><p style={{marginTop: "0px"}}>Press Coverage</p></a></Grid>
			<Grid item xs={2}><a onClick={(e) => {e.preventDefault()}} style={{color: "#4054b2", marginLeft: "1em", textDecoration: "none"}} href=""><p style={{marginTop: "0px"}}>Contact</p></a></Grid>
		</Grid>

	</div>


export default Footer;


