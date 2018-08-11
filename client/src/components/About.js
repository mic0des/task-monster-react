import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import SignInForm from './auth/SignInForm';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

export default class About extends Component {

	constructor(){
		super()

		this.state = {
			currentScrollHeight: 0
		}
	}

	toTop(){
		window.scrollTo({
    		behavior: "smooth",
    		top: 0
		})
	}

	toAbout(){
		window.scrollTo({
			behavior: "smooth",
			top: 604
		})
	}

	componentDidMount () {      
   		window.onscroll =()=>{
    		const newScrollHeight = Math.ceil(window.scrollY / 50) *50;
    			if (this.state.currentScrollHeight != newScrollHeight){
        		this.setState({currentScrollHeight: newScrollHeight})
    		}
  		}
	}

	render(){
		const opacity = window.scrollY / 500
		return (
			<div>
				<Grid container spacing={24} alignItems="center" direction="row" justify="flex-start">					
					<Grid item xs={6}>
						<img style={{margin: "1.5em 16.5em 0.5em"}} src="/Egg.gif" height="80px" width="80px" alt=""/>
						<SignInForm />
					</Grid>
					<Grid item xs={6}>
					 <h2><Typography style={{fontWeight: "700", color: "#3f51b5"}} variant="display2">Stay productive,</Typography></h2>
					 	  <h2><Typography style={{fontWeight: "700", color: "#3f51b5"}} variant="display2">Make monster friends,</Typography></h2>
					 		<h2><Typography style={{fontWeight: "700", color: "#3f51b5"}} variant="display2">Collect 'em all!</Typography></h2>
					 		<h3><Typography style={{fontWeight: "700", color: "#3f51b5"}} variant="headline">Powered by the Ξthereum blockchain. ♦</Typography></h3>
					 		<Grid container spacing={12} alignItems="center" direction="row" justify="flex-start">
					 		<Grid item xs={6}>
					 		<img src="/Schrodinger-Normal.gif" height="110px" width="140.50px"/>
					 		</Grid>
					 		<Grid item xs={6}>
					 		<img src="/Leaflet-Happy.gif" height="130px" width="140.50px" style={{marginLeft: "-9em", marginTop: "0.2em"}} />
					 		</Grid>	
					 		</Grid>
					</Grid>

					<br/>
					<br/>
					<br/>

					<Grid style={{margin: "0 auto"}} item xs={1}>
						<div style={{margin: "1.5em"}} onClick={this.toAbout} className="arrow bounce">
  							<a className="down fa fa-arrow-down fa-2x" href="#"></a>
						</div>
					</Grid>
				</Grid>

				<Grid container spacing={24} alignItems="center" direction="row" justify="flex-start">
					<Grid item xs={6}>					
						<Grid container spacing={12} alignItems="center" direction="row" justify="flex-start">
							<Grid item xs={6}>
								<img style={{margin: "1.5em 0.5em 0em 12.5em"}} src="/blue-clipboard.png" height="300px" width="300px" alt=""/>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={6}>
						<Grid container spacing={12} alignItems="center" direction="row" justify="flex-start">
					 		<Grid item xs={8}>
					 			<h2><Typography style={{fontWeight: "700", color: "#3f51b5"}} variant="display2">Make to-do lists, and track progress!</Typography></h2>
					 		</Grid>
					 		<Grid item xs={4}>
					 			<img src="/blue-seed.png" style={{marginTop: "2em"}} height="50px" width="50px" alt=""/>
					 		</Grid>	
						</Grid>
						<Grid item xs={8}>	
							<Typography style={{color: "#3bbbfa"}} variant="subheading">Organize your tasks into multiple lists, set deadlines, then check off to-do items to track your progress in real-time!</Typography>
						</Grid>
					</Grid>
				</Grid>

				<br/>
				<br/>
				<br/>
				<br/>

				<Grid container spacing={24} alignItems="center" direction="row" justify="flex-start">
					<Grid item xs={6}>
					 	<Grid container spacing={12} alignItems="center" direction="row" justify="flex-start">
					 		<Grid item xs={3}>
					 		</Grid>
					 		<Grid item xs={8}>
					 			<h2><Typography style={{fontWeight: "700", color: "#128678"}} variant="display2">Check off tasks, and watch your monsters grow!</Typography></h2>
					 		</Grid>
					 		<Grid item xs={1}>
					 			<img src="/halloween.png" style={{marginTop: "5.5em", marginLeft: "-5em"}} height="50px" width="50px" alt=""/>
					 		</Grid>	
					 	</Grid>

						<Grid container spacing={12} alignItems="center" direction="row" justify="flex-start">	
							<Grid item xs={3}>
							</Grid>				 	
							<Grid item xs={8}>	
								<Typography style={{color: "#1ec17b"}} variant="subheading">With every to-do item checked off, your monsters get stronger! Don't miss deadlines to keep your monsters healthy and happy!
								</Typography>
							</Grid>
						</Grid>
					</Grid>

					<Grid item xs={6}>					
						<Grid container spacing={12} alignItems="center" direction="row" justify="flex-start">
							<Grid item xs={6}>
								<img style={{margin: "1.5em 0.5em 0em 3.5em"}} src="/checkmark.png" height="300px" width="300px" alt=""/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>

				<br/>
				<br/>
				<br/>
				<br/>

				<Grid container spacing={24} alignItems="center" direction="row" justify="flex-start">
					<Grid item xs={6}>					
						<Grid container spacing={12} alignItems="center" direction="row" justify="flex-start">
							<Grid item xs={6}>
								<img style={{margin: "1.5em 0.5em 0em 12.5em"}} src="/calendar.png" height="300px" width="300px" alt=""/>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={6}>
					 	<Grid container spacing={12} alignItems="center" direction="row" justify="flex-start">
					 		<Grid item xs={8}>
					 			<h2><Typography style={{fontWeight: "700", color: "#e8a13d"}} variant="display2">Keep track of task deadlines at a glance in Calendar!</Typography></h2>
					 		</Grid>
					 		<Grid item xs={4}>
					 			<img src="/fsm.png" style={{marginTop: "5em"}} height="50px" width="50px" alt=""/>
					 		</Grid>	
					 	</Grid>
						<Grid item xs={8}>	
							<Typography style={{color: "#fec536"}} variant="subheading">Using Calendar View, you can view your deadlines clearly for effective prioritizing, or export to Google Calendar!</Typography>
						</Grid>
						<a href="" style={{opacity}} onClick={this.toTop} id="return-to-top"><i className="fa fa-arrow-up fa-2x"></i></a>
					</Grid>
				</Grid>

				<br/>
				<br/>
				<br/>
				<br/>
				<br/>

				<Grid container spacing={12} alignItems="center" direction="row" justify="flex-start">

					<Grid item xs={3}>
					</Grid>
			
					<Grid item xs={6}>
						<h2><Typography style={{textAlign: "center", fontWeight: "700", color: "#3f51b5"}} variant="display2">So... Ready to get stuff done, AND collect digital pets on the blockchain?</Typography></h2>		
					</Grid>

					<Grid item xs={3}>
					</Grid> 

				</Grid>
			
				<br />
			
				<Grid container spacing={12} alignItems="center" direction="row" justify="flex-start">
					<Grid item xs={4}>
					</Grid>
					<Grid item xs={4}>
        				<Button style={{width: "100%"}}variant="outlined" size="large" color="primary">
          					<Link style={{textDecoration: "none", color: "rgba(0, 0, 0, 0.87)"}} to="/signup" exact>
          						SIGN UP NOW!
          					</Link>
        				</Button>
					</Grid>
					<Grid item xs={4}>
					</Grid>
				</Grid>

			</div>
		)
	}
}
