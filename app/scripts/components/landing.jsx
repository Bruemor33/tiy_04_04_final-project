var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
var ParseReact = require('parse-react');
require('Backbone-React-Component');

//Local Inports
var Navigation = require('./header.jsx').Navigation;
var HomePageComponent = require('./signup.jsx').HomePageComponent;

$(function(){
Parse.initialize("bikebuilder");
Parse.serverURL = "http://bikebuilders3.herokuapp.com/";
});

var LandingComponent = React.createClass({

});
