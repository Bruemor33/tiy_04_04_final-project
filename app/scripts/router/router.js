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
    "home": "home",
    "profile": "profile",
    "builder": "builder",
    "admin": "admin",
    "bb": "bb",
    "headset": "headset",
    "seatpost": "seatpost",
    "*notFound": "notFound"
  },
  index: function(){
    this.current = "index";
  },
  home: function(){
    this.current = "home";
  },
  profile: function(){
    this.current = "profile";
  },
  builder: function(){
    this.current = "builder";
  },
  admin: function(){
    this.current = "admin";
  },
  bb: function(){
    this.current = "bb";
  },
  headset: function(){
    this.current = "headset"
  },
  seatpost: function(){
    this.current = "seatpost"
  },
  notFound: function(){
    this.current = "notFound"
  }
});

//Exports
module.exports = new Router()
