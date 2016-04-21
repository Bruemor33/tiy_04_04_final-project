var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
var ParseReact = require('parse-react');
require('Backbone-React-Component');



var Navigation = React.createClass({
  mixins: [Backbone.React.Component.mixin],

  handleReturn: function(e){
    e.preventDefault();
    Backbone.history.navigate("home", {trigger: true});
  },

  render: function(){
    return (
      <div className="container-fluid">
        <nav className="row">
          <div className="top-navigation col-md-12">
            <span className="logo"></span>
            <a id="profile-nav" href={"#profile"}>
              <h3 className="title">Cycle</h3>
            </a>
            <a id="form-nav" href={"#components"}>Add Components</a>
            <a href="#logout">Logout</a>
          </div>
        </nav>
      </div>
    )
  }
})

//exports
module.exports = {
  'Navigation': Navigation
}
