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
  mixins: [Backbone.React.Component.mixin],

  login: function(username, password){
    Parse.User.logIn(username, password, {
      success: function(user){
        Backbone.history.navigate("profile", {trigger: true});
        this.props.setUser(user);
      }.bind(this),
      error: function(user, error){

      }
    })
  },
  createUser: function(email, password){
    var user = new Parse.User();
    console.log(email, password);
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
  mixins: [Backbone.React.Component.mixin],
  getInitialState: function(){
    return {
      username: '',
      password: ''
    }
  },
  handlePassword: function(event){
    this.setState({'password': event.target.value});
  },
  handleEmail: function(event){
    this.setState({'email': event.target.value});
  },
  handleSubmit: function(event){
    event.preventDefault();
    this.props.createUser(this.state.email, this.state.password);
  },
  render: function(){
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="signup">
          <input name="email" onChange={this.handleEmail} value={this.state.email} id="email" placeholder="example@email.com" /><br/>
          <input name="password" onChange={this.handlePassword} value={this.state.password} id="password" placeholder="password" /><br/>
          <input type="submit" value="Signup!" />
        </form>
      </div>
    )
  }
});

var LoginComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],

  getInitialState: function(){
    return{
      "username": '',
      "password": ''
    }
  },
  handlePassword: function(event){
    this.setState({'password': event.target.value});
  },
  handleUsername: function(event){
    this.setState({'username': event.target.value});
  },
  handleSubmit: function(event){
    event.preventDefault();
    this.props.login(this.state.username, this.state.password)
  },
  render: function(){
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="login">
          <input name="username" onChange={this.handleUsername} value={this.state.username} id="username" placeholder="username" /><br/>
          <input type="password" name="password" onChange={this.handlePassword} value={this.state.password} id="login-password" placeholder="pw" /><br/>
          <input type="submit" value="Login!" />
        </form>
      </div>
    )
  }

})


module.exports = {
  'HomePageComponent': HomePageComponent
}
