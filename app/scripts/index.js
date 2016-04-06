var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
var ParseReact = require('parse-react');

console.log("Hello World!");

var Router = require('./router/router.js').Router;
var MainComponent = require('./components/mainpage.jsx').MainComponent;

$(function(){
  Backbone.history.start();

  ReactDOM.render(
    React.createElement(MainComponent, {
      Router: Router
    }),
    document.getElementById('main-container')
  );

});
