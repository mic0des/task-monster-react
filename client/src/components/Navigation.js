import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
var $         = require('jquery');

export class Navigation extends Component {

  signOut = event => {
    localStorage.removeItem("id_token")
  };


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
          <Grid style={{padding: "20px", marginTop: "30px"}} item xs={4}>
            <Avatar alt="Jelo" src="https://avatars1.githubusercontent.com/u/4992682?s=460&v=4" className="avatar" />
            <Button className="nav">Jelo</Button>
            <Button variant="contained" color="primary" className="nav">New Task</Button>
            <Button className="nav">Monsters</Button>
            <Button className="nav" onClick={this.signOut}>Log Out</Button>
          </Grid>
        </Grid>
    );
  }
}

export default Navigation;