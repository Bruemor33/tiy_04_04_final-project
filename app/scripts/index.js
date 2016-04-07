var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
var ParseReact = require('parse-react');

console.log("Hello World!");

var router = require('./router/router.js');
var HomePageComponent = require('./components/signup.jsx').HomePageComponent;
var ProfileComponent = require('./components/profile.jsx').ProfileComponent;
var Interface = require('./components/interface-controller.jsx').ControllerComponent;
$(function(){
  Backbone.history.start();
  // console.log(router);
  ReactDOM.render(
    React.createElement(Interface, {
      router: router
    }),
    document.getElementById('main-container')
  );
  // ReactDOM.render(
  //   React.createElement(ProfileComponent, {
  //     router: router
  //   }),
  //   document.getElementById('main-container')
  // );

});
