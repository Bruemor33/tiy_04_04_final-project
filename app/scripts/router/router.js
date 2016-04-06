var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
var ParseReact = require('parse-react');
require('Backbone-React-Component')



var Router = Backbone.Router.extend({
  routes: {
    "": "index",
    "profile": "profile",
    "builder": "builder"
  },
  index: function(){
    this.current = "index";
  },
  profile: function(){
    this.current = "profile";
  },
  builder: function(){
    this.current = "profile";
  }
});

//Exports
module.exports = {
  'Router': Router
}
