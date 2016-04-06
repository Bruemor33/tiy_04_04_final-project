var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
require('backbone-react-component');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');
var ParseReact = require('parse-react');




var HomePageComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin];

  login: function(username, password){
    Parse.User.logIn(username, password, {
      success: function(user){
        Backbone.history.navigate("profile", {trigger: true});
        this.props.setUser(user);
      }bind(this),
      error: function(user, error){

      }
    })
  },
  createUser: function(email, password){
    var user = new Parse.User();
    user.set({
      'username': email,
      'password': password
    });
    user.signUp(null, {
      success: function(user){
        Backbone.history.navigate("profile", {trigger: true});
      },
      error: function(user, error){
        alert("Error" + error.code + " " + error.message);
      }
    })
  },
  render: function(){
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6" id="signup-container">
            <SignupComponent createUser={this.createUser} />
          </div>
          <div className="col-md-6" id="login-container">
            <LoginComponent login={this.login} />
          </div>
        </div>
      </div>
    )
  }
});

var SignupComponent = React.createClass({
  getInitialState: function(){
    return {
      "email": "",
      "password": ""
    }
  },
  handlePassword: function(){

  },
})


module.exports = {
  'HomePageComponent': HomePageComponent
}
