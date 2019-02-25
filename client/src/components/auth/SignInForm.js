import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { loginError } from '../../actions/auth';
import { receiveLogin } from '../../actions/auth';
import { fetchTaskLists } from '../../actions/taskLists';
import { bindActionCreators } from 'redux';
import history from '../../history';
import { parseJwt } from '../../utils/Functions';
import { Link } from 'react-router-dom';

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
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

  handleSubmit = event => {
    event.preventDefault();

    return fetch("http://localhost:3001/auth_user", {
      method: 'POST',
      body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        localStorage.setItem('id_token', data.auth_token);
        if (!localStorage.id_token || localStorage.id_token === "undefined") {
          this.props.loginError(data.errors)
          this.setState({error: Object.entries(data)})
          console.log(data)
        } else {
          console.log(data)
          localStorage.setItem('gravatar', data.user.gravatar);
          this.props.receiveLogin(data);
          let url = `http://localhost:3001/users/${parseJwt(localStorage.id_token).user_id}/task_lists`
          this.props.fetchTaskLists(url);
          !!this.props.history ? this.props.history.push('/') : history.push('/');
        }
    });
  }

  render() {
    return (
      <div className="signInForm">
        <Grid container spacing={24} alignItems="center" direction="row" justify="center">
          <form className="signUp">
            <div>
              <TextField style={{width: "14em"}} id="email" className="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} margin="normal" />
            </div>
            <div>
              <TextField style={{width: "14em"}} id="password" className="password" name="password" placeholder="Password" type="password" value={this.state.password} onChange={this.handleChange} margin="normal" />
            </div>
            <br />
            <div>
              <Button variant="contained" onClick={this.handleSubmit} color="primary" className="signInButton">Log In</Button>
            </div>
          </form>
          <br />
        </Grid>
        <br />
        <Grid container spacing={24} alignItems="center" direction="row" justify="center">
          <Grid item xs={0} sm={3}>
          </Grid>
          <Grid item xs={12} sm={6}>
            {this.state.error.map((error, i) => <p key={i} style={{color: "#e70b28", textAlign: "center", fontWeight: "light"}}>{error[1]}</p>)}
          </Grid>
          <Grid item xs={0} sm={3}>
          </Grid>
        </Grid>
        <Grid container spacing={24} alignItems="center" direction="row" justify="center">
            <div><p>No account?
            <Button >
              <Link style={{textDecoration: "none", color: "rgba(0, 0, 0, 0.87)"}} to="/signup" exact>Sign Up</Link>
            </Button></p></div>
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
    receiveLogin: receiveLogin,
    fetchTaskLists: fetchTaskLists
  }, dispatch);
};
 
export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);

