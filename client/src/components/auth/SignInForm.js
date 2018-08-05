import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { loginError } from '../../actions/auth';
import { receiveLogin } from '../../actions/auth';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
var React          = require('react');
var Functions      = require('../../utils/Functions.js');
var $              = require('jquery');
 
class SignInForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
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
    const { email, password } = this.state;

    if (!email || !password) {
      return;
    }

    $.ajax({
      method: "POST",
      url: "http://localhost:3001/auth_user",
      data: {
        user: {
          email: this.state.email,
          password: this.state.password
        }
      }
    })
    .done(function(data){
      localStorage.setItem('id_token', data.auth_token)
      if (!localStorage.id_token || localStorage.id_token === "undefined") {
        this.props.loginError(data.errors)
      } else {
        this.props.receiveLogin(data.auth_token);
        window.location.reload();         
      }
      // window.reload();
    }.bind(this));
  }
  //   .done(data => {
  //     localStorage.setItem('id_token', data.auth_token)
  //     if (!localStorage.id_token || localStorage.id_token === "undefined") {
  //       this.store.dispatch(loginError(data.errors))
  //     } else {
  //       receiveLogin(data.auth_token)       
  //     }
  //     console.log(data)
  //   })
  // }

  render() {
    return (
      <div>
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
              <Button variant="contained" onClick={this.handleSubmit} color="primary" className="nav">Log In</Button>
            </div> 
          </form>
          <br />
        </Grid>
        <br />
        <Grid container spacing={24} alignItems="center" direction="row" justify="center">
          <Grid item xs={9.5}>
            <div><p>No account?  
            <Button className="nav">
              <Link style={{textDecoration: "none", color: "rgba(0, 0, 0, 0.87)"}} to="/signup" exact>Sign Up</Link>
            </Button></p></div>
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
 
export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);

