var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
var ParseReact = require('parse-react');
require('Backbone-React-Component');

var FrameModel = Backbone.Model.extend({
  defaults: {
    name: "",
    price: 0,
    material: "",
    headset: "",
    seattube: 0,
    color: "",
    url: "",
    image: "",
    bottomBracket: [
      SramGxp: false,
      PhilWood: false
    ]
  }
})

var FrameCollection = Backbone.Collection.extend({
  model: FrameModel
})
