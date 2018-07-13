var React          = require('react');
var _              = require('lodash');
var Functions      = require('../../utils/Functions.js');
var $              = require('jquery');

export default class SignUpForm extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      name: ""
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
    const { email, password, password_confirmation, name } = this.state;

    if (!email || !password || !password_confirmation || !name) {
      return;
    }

    $.ajax({
      method: "POST",
      url: "/users.json",
      data: {
        user: {
          email: this.state.email,
          uid: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation,
          name: this.state.name,
          provider: "email"
        },
        authenticity_token: Functions.getMetaContent("csrf-token")
      }
    })
    .done(function(data){
      window.location.reload();
    }.bind(this));
  }

  render() {
    return (
          <form>
              <div>
                <input type='text'
                  name='name'
                  placeholder='name'
                  value={this.state.name}
                  onChange={this.handleChange} />
                </div>
 
              <div>
                <input type='email'
                  name='email'
                  placeholder='email'
                  value={this.state.email}
                  onChange={this.handleChange} />
              </div>
 
              <div>
                <input type='password'
                  name='password'
                  placeholder='password'
                  value={this.state.password}
                  onChange={this.handleChange} />
              </div>
              
              <div>
                <input type='password'
                  name='password_confirmation'
                  placeholder='re-type password'
                  value={this.state.password_confirmation}
                  onChange={this.handleChange} />
              </div>

            <input type="submit" onClick={this.handleSubmit} defaultValue="sign up"/>
          </form>
    );
  }

}