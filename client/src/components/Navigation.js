import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { logout } from '../actions/auth';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Navigation extends Component {

  signOut = event => {
    localStorage.removeItem("id_token");
    localStorage.removeItem("gravatar");
    this.props.logout();
    this.props.history.push('/');
  };

  renderNav(){
    if (this.props.auth.isAuthenticated === true) {
      return <Grid style={{padding: "20px", marginTop: "30px"}} item xs={4}>
        <Avatar alt="avatar" src={this.props.auth.gravatar} className="avatar" />
        <Button className="nav">
          <Link style={{textDecoration: "none", color: "rgba(0, 0, 0, 0.87)"}} to="/" exact>Tasks</Link>
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
          <Link style={{textDecoration: "none", color: "rgba(0, 0, 0, 0.87)"}} to="/signin" exact>Sign In</Link>
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    logout: logout
  }, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));