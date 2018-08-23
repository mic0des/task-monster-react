import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { loginError } from '../../actions/auth';
import { receiveLogin } from '../../actions/auth';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      name: "",
      error: [""]
    }
  }

  handleChange = event => {
      event.preventDefault();
      const { name, value } = event.target;
      this.setState({
        [name]: value,
      })
  }

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleSubmit = event => {
    event.preventDefault();
    const { email, password, password_confirmation, name, error } = this.state;

    return fetch("http://localhost:3001/users.json", {
      method: 'POST',
      body: JSON.stringify({
          username: this.state.name,
          email: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation
      }), 
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        localStorage.setItem('id_token', data.auth_token)
        if (!localStorage.id_token || localStorage.id_token === "undefined") {
          this.props.loginError(data)
          this.setState({error: Object.entries(data)})
          console.log(Object.entries(data))
        } else {
          this.props.receiveLogin(data) 
          window.location.assign("/");       
        }
    });
  }

  render() {
    return (
      <div>
      <Grid container spacing={24} alignItems="center" direction="row" justify="center">
      <form className="signUp">
        <div>
          <TextField style={{width: "14em"}} autoComplete="off" id="username" className="username" name="name" placeholder="Username" value={this.state.name} onChange={this.handleChange} margin="normal" />
        </div>
 
        <div>
          <TextField style={{width: "14em"}} id="email" className="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} margin="normal" />
        </div>

        <div>
          <TextField style={{width: "14em"}} id="password" className="password" name="password" placeholder="Password" type="password" value={this.state.password} onChange={this.handleChange} margin="normal" />
        </div>

        <div>
          <TextField style={{width: "14em"}} id="password_confirmation" className="password_confirmation" name="password_confirmation" placeholder="Confirm Password" type="password" value={this.state.password_confirmation} onChange={this.handleChange} margin="normal" />
        </div>
        <br/>
        <div>
          <Button variant="contained" onClick={this.handleSubmit} color="primary" className="nav">Sign Up</Button>
        </div>        
      </form>
      </Grid>
      <br/>
        <Grid container spacing={24} alignItems="center" direction="row" justify="center">
          <Grid item xs={5}>
          </Grid>
          <Grid item xs={2}>
            {this.state.error.map(error => <p style={{color: "#e70b28", textAlign: "left", fontWeight: "light"}}>{error[0] === "password_confirmation" ? "password confirmation" : error[0]} {error[1]}</p>)}
          </Grid>
          <Grid item xs={5}>
          </Grid>
        </Grid>
        <Grid container spacing={24} alignItems="center" direction="row" justify="center">
          <Grid item xs={9.5}>        
            <Button className="nav">
              <Link style={{textDecoration: "none", color: "rgba(0, 0, 0, 0.87)"}} to="/signin" exact>Sign In Instead</Link>
            </Button>          
          </Grid>
        </Grid>
        </div>
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
    loginError: loginError,
    receiveLogin: receiveLogin
  }, dispatch);
};
 
export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);