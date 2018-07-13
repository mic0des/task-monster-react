var React     = require('react');
var $         = require('jquery');
var Functions = require('../../utils/Functions.js');

export default class SignOutLink extends React.Component {

  signOut = event => {
    event.preventDefault();
    $.ajax({
        method: "DELETE",
        url: "/users/sign_out.json",
        data: {
          authenticity_token: Functions.getMetaContent("csrf-token")
        }
      }).done(function(){
        window.location.reload();
    });
  }

  render(){
    return (
      <a href="#" onClick={this.signOut}>Sign out</a>
    )
  }
}

