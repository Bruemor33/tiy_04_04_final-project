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
    "chain": "chain",
    "chainring": "chainring",
    "hub": "hub",
    "rim": "rim",
    "tire": "tire",
    "clip": "clip",
    "pedal": "pedal",
    "stem": "stem",
    "handle": "handle",
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
  chain: function(){
    this.current = "chain"
  },
  chainring: function(){
    this.current = "chainring"
  },
  hub: function(){
    this.current = "hub"
  },
  rim: function(){
    this.current = "rim"
  },
  tire: function(){
    this.current = "tire"
  },
  clip: function(){
    this.current = "clip"
  },
  pedal: function(){
    this.current = "pedal"
  },
  stem: function(){
    this.current = "stem"
  },
  handle: function(){
    this.current = "handle"
  },
  notFound: function(){
    this.current = "notFound"
  }
});

//Exports
module.exports = new Router()
