import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
var $         = require('jquery');

class Navigation extends Component {

  signOut = event => {
    localStorage.removeItem("id_token")
  };

  renderNav(){
    if (this.props.auth.isAuthenticated === true) {
      return <Grid style={{padding: "20px", marginTop: "30px"}} item xs={4}>
        <Avatar alt="avatar" src="https://avatars1.githubusercontent.com/u/4992682?s=460&v=4" className="avatar" />
        <Button className="nav">
          <Link style={{textDecoration: "none", color: "rgba(0, 0, 0, 0.87)"}} to="/tasks" exact>Tasks</Link>
        </Button>
        <Button variant="contained" color="primary" className="nav">
          <Link style={{textDecoration: "none", color: "#fff"}} to="/newtask" exact>New Task</Link>
        </Button>
        <Button className="nav">
          <Link style={{textDecoration: "none", color: "rgba(0, 0, 0, 0.87)"}} to="/calendar" exact>Calendar</Link>
        </Button>
        <Button className="nav" onClick={this.signOut}>Log Out</Button>
      </Grid>            
    } else {
      return <Grid style={{padding: "20px", marginTop: "30px"}} item xs={3}>
        <Button className="nav">
          <Link style={{textDecoration: "none", color: "rgba(0, 0, 0, 0.87)"}} to="/" exact>About</Link>
        </Button>
        <Button className="nav">
          <Link style={{textDecoration: "none", color: "rgba(0, 0, 0, 0.87)"}} to="/" exact>Sign In</Link>
        </Button>
        <Button className="nav">
          <Link style={{textDecoration: "none", color: "rgba(0, 0, 0, 0.87)"}} to="/signup" exact>Sign Up</Link>
        </Button>
      </Grid>              
    }
  }

  render() {
    return (
        <Grid container spacing={24} alignItems="center" direction="row" justify="center">
          <Grid item xs={4}>
            <div className="row title justify-content-center" style={{ paddingTop: '12px' }}>
              <h1 className="title" >Task Monster</h1>
            </div>
          </Grid>
          <Grid style={{padding: "30px"}} item xs={3}>
          </Grid>
          {this.renderNav()}
        </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Navigation);