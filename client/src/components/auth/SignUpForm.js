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
var _              = require('lodash');
var Functions      = require('../../utils/Functions.js');
var $              = require('jquery');


class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      name: "",
      showPassword: false
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

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleSubmit = event => {
    event.preventDefault();
    const { email, password, password_confirmation, name } = this.state;

    if (!email || !password || !password_confirmation || !name) {
      return;
    }

    $.ajax({
      method: "POST",
      url: "http://localhost:3001/users.json",
      data: {
        user: {
          username: this.state.name,
          email: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation
          // name: this.state.name
        }
      }
    })
    // .done(function(data){
    //   window.location.reload();
    // }.bind(this));
    .done(function(data){
      localStorage.setItem('id_token', data.auth_token)
      if (!localStorage.id_token || localStorage.id_token === "undefined") {
        this.props.loginError(data)
      } else {
        this.props.receiveLogin(data.auth_token)        
      }
    }.bind(this))
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
        <Grid container spacing={24} alignItems="center" direction="row" justify="center">
          <Grid item xs={9.5}>
          <br/>         
            <Button className="nav">
              <Link style={{textDecoration: "none", color: "rgba(0, 0, 0, 0.87)"}} to="/" exact>Sign In Instead</Link>
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

// const mapStateToProps = (state) => {
//   return {
//     items: state.user
//   };
// };

// const mapDispatchToProps = () => {
//   return {
//     loginError: loginError,
//     receiveLogin: receiveLogin
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);