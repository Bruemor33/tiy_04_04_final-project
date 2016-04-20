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
    "components": "components",
    "frameselection": "frameselection",
    "bicycle/:id": "bicycle",
    "frame": "frame",
    "bottombracket": "bottombracket",
    "headset": "headset",
    "seatpost": "seatpost",
    "chain": "chain",
    "chainring": "chainring",
    "hub": "hub",
    "rim": "rim",
    "wheel": "wheel",
    "tire": "tire",
    "clip": "clip",
    "pedal": "pedal",
    "stem": "stem",
    "handle": "handle",
    "cranks": "cranks",
    "saddle": "saddle",
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
  components: function(){
    this.current = "components";
  }
  frameselection: function(){
    this.current = "frameselection";
  },
  bicycle: function(id){
    console.log(id);
    this.current = "bicycle";
    this.framesetId = id;
  },
  frame: function(){
    this.current = "frame";
  },
  bottombracket: function(){
    this.current = "bottombracket";
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
  wheel: function(){
    this.current = "wheel"
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
  cranks: function(){
    this.current = "cranks"
  },
  saddle: function(){
    this.current = "saddle"
  },
  notFound: function(){
    this.current = "notFound"
  }
});

//Exports
module.exports = new Router()
