var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
var ParseReact = require('parse-react');
require('Backbone-React-Component');



var ComponentForms = React.createClass({
  mixins: [Backbone.React.Component.mixin],

  render: function(){
    return (
      <div className="container-fluid">
        <div className="component-form-list col-md-12">
          <h1>Component form Selection</h1>
          <ul>
            <li><a href={"#chain"}>Chains</a></li>
            <li><a href={"#chainring"}>Chainrings</a></li>
            <li><a href={"#cranks"}>Cranksets</a></li>
            <li><a href={"#bottombracket"}>Bottombrackets</a></li>
            <li><a href={"#clip"}>Foot Retention</a></li>
            <li><a href={"#pedal"}>Pedals</a></li>
            <li><a href={"#saddle"}>Saddles</a></li>
            <li><a href={"#seatpost"}>Seatposts</a></li>
            <li><a href={"#headset"}>Headsets</a></li>
            <li><a href={"#stem"}>Stems</a></li>
            <li><a href={"#handle"}>Handlebars</a></li>
            <li><a href={"#frame"}>Frames</a></li>
            <li><a href={"#wheel"}>Wheelsets</a></li>
            <li><a href={"#tire"}>Tires</a></li>
          </ul>
        </div>
      </div>
    )
  }
})

//exports
module.exports = {
  'ComponentForms': ComponentForms
}
