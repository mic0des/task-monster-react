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
var React          = require('react');
var Functions      = require('../../utils/Functions.js');
var $              = require('jquery');
 
export default class SignInForm extends React.Component {
  constructor() {
    super();

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
    // .done(function(data){
    //   window.reload();
    // }.bind(this));
    .done(function(data){
      localStorage.setItem('id_token', data.auth_token)
      console.log(data)
    })
  }

  render() {
    return (
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
      </Grid>
    );
  }
}
