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
      url: "/users/sign_in.json",
      data: {
        user: {
          email: this.state.email,
          password: this.state.password
        },
        authenticity_token: Functions.getMetaContent("csrf-token")
      }
    })
    .done(function(data){
      window.reload();
    }.bind(this));
  }

  render() {
    return (
      <form>
        <div>
          <label>
            Username
            <input id="test-email" name="email" type="text" value={this.state.email} onChange={this.handleChange} />
          </label>
        </div>
        <div>
          <label>
            Password
            <input id="test-password" name="password" type="password" value={this.state.password} onChange={this.handleChange} />
          </label>
        </div>
        <div>
          <input type="submit" onClick={this.handleSubmit} defaultValue='Log In' />
        </div>
      </form>
    );
  }

}