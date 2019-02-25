import React from 'react';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { logout } from '../actions/auth';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Menu from './Menu';

const Navigation = (props) => {

  const showSettings = (event) => {
    event.preventDefault();
  };

  const signOut = event => {
    localStorage.removeItem("id_token");
    localStorage.removeItem("gravatar");
    props.logout();
    props.history.push('/');
  };

  const renderNav = () => {
    if (props.auth.isAuthenticated === true) {
      return <Grid style={{padding: "20px", marginTop: "-3px"}} item xs={4}>
        <Avatar alt="avatar" src={props.auth.gravatar} className="avatar" />
        <Button className="nav">
          <Link style={{textDecoration: "none", color: "rgba(0, 0, 0, 0.87)"}} to="/" exact>Tasks</Link>
        </Button>
        <Button variant="contained" color="primary" className="nav">
          <Link style={{textDecoration: "none", color: "#fff"}} to="/newtask" exact>New Task</Link>
        </Button>
        <Button className="nav">
          <Link style={{textDecoration: "none", color: "rgba(0, 0, 0, 0.87)"}} to="/calendar" exact>Calendar</Link>
        </Button>
        <Button className="nav" onClick={signOut}>Log Out</Button>
        <Menu className="responsiveMenu" right width={'20%'} onClick={() => this.closeMenu()} customBurgerIcon={ <img src="https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-512.png" width="128"/> }>
          <a href="/">Tasks</a>
          <a href="/newtask">New Task</a>
          <a href="/calendar">📅</a>
          <a href="/" onClick={signOut}>LogOut</a>
        </Menu>
      </Grid>
    } else {
      return <Grid style={{padding: "20px", marginTop: "-21px"}} item xs={3}>
        <Button className="nav">
          <Link style={{textDecoration: "none", color: "rgba(0, 0, 0, 0.87)"}} to="/" exact>About</Link>
        </Button>
        <Button className="nav">
          <Link style={{textDecoration: "none", color: "rgba(0, 0, 0, 0.87)"}} to="/signin" exact>Sign In</Link>
        </Button>
        <Button className="nav">
          <Link style={{textDecoration: "none", color: "rgba(0, 0, 0, 0.87)"}} to="/signup" exact>Sign Up</Link>
        </Button>
        <Menu className="responsiveMenu" right width={'20%'} customBurgerIcon={ <img className="burger" src="https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-512.png"  width="128"/> }>
          <a href="/">About</a>
          <a href="/signin">Sign In</a>
          <a href="/signup">Sign Up</a>
        </Menu>
      </Grid>
    }
  }

  return (
    <div className="wrapper">
    <Grid className="navigationBar" container spacing={24} alignItems="center" direction="row" justify="center">
      <Grid item xs={4}>
        <div className="row title justify-content-center" style={{ paddingTop: '12px' }}>
          <h1 className="title" >Task Monster</h1>
        </div>
      </Grid>
      <Grid style={{padding: "30px"}} item xs={3}>
      </Grid>
      {renderNav()}
    </Grid>
    </div>
  );

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