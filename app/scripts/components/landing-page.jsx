var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
var ParseReact = require('parse-react');
require('Backbone-React-Component');



var LandingPageComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],

  handleClick: function(e){
    e.preventDefault();
    Backbone.history.navigate("home", {trigger: true});
  },

  render: function(){
    return (
      <div className="container-fluid" id="landing" handleClick={this.handleClick}>
        <a href={"#home"}>
          <div>
            <h1 className="app-title">Fancy App Name</h1>
            <h5 className="landing-caption">Click anywhere to enter..</h5>
          </div>
        </a>
      </div>
    )
  }
})

//exports
module.exports = {
  'LandingPageComponent': LandingPageComponent
}
