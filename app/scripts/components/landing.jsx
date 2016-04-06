var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
var ParseReact = require('parse-react');
require('Backbone-React-Component');

//I guess this will be more of a "controller" component?

//Local Inports
var Navigation = require('./header.jsx').Navigation;
var HomePageComponent = require('./signup.jsx').HomePageComponent;

$(function(){
Parse.initialize("bikebuilder");
Parse.serverURL = "http://bikebuilders3.herokuapp.com/";
});

var LandingComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],

  getInitialState: function(){
    return {
      router: this.props.router,
      userId: null
    };
  },
  setUser: function(user){
    this.setState({"userId": user.id});
  },
  render: function(){
    var body;
    if(this.state.router.current == "index"){
      body = <HomePageComponent setUser={this.setUser} />
      return body;
    }
    if(this.state.router.current == "profile"){
      body = <Navigation />
      return body;
    }
  }
});

//Exports
module.exports = {
  'LandingComponent': LandingComponent
}
