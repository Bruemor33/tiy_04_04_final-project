var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
var ParseReact = require('parse-react');

var router = require('./router/router.js');
var Interface = require('./components/interface-controller.jsx').ControllerComponent;

$(function(){
  ReactDOM.render(
    React.createElement(Interface, {
      router: router
    }),
    document.getElementById('main-container')
  );

  Backbone.history.start();
});
