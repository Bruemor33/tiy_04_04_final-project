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
    "login": "home",
    "logout": "logout",
    "profile": "profile",
    "components": "components",
    "frameselection": "frameselection",
    "bicycle": "bicycleList",
    "bicycledetail/:id": "bicycledetail",
    "bicycle/:id/add": "bicycle", // Add/Create a bike build
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
  initialize: function(){
    Parse.initialize("bikebuilder");
    Parse.serverURL = "http://bikebuilders3.herokuapp.com/";
  },
  logout: function(){
    var self = this;

    Parse.User.logOut().then(function(){
        localStorage.removeItem('Parse/bikebuilder/currentUser');
        window.location = '/';
    }, function(error){
      console.log(error);
    });
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
  bicycleList: function(){
    this.current = "bicycleList";
  },
  bicycleDetail: function(id){
    this.current = "bicycledetail";
    this.framesetId = id;
  },
  components: function(){
    this.current = "components";
  },
  frameselection: function(){
    this.current = "frameselection";
  },
  bicycle: function(id){
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
