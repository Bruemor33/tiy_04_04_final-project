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
          <h1 className="part-selection">Component form Selection</h1>
          <ul className="part-list">
            <li className="part-item"><a href={"#chain"}>Chains</a></li>
            <li className="part-item"><a href={"#chainring"}>Chainrings</a></li>
            <li className="part-item"><a href={"#cranks"}>Cranksets</a></li>
            <li className="part-item"><a href={"#bottombracket"}>Bottombrackets</a></li>
            <li className="part-item"><a href={"#clip"}>Foot Retention</a></li>
            <li className="part-item"><a href={"#pedal"}>Pedals</a></li>
            <li className="part-item"><a href={"#saddle"}>Saddles</a></li>
            <li className="part-item"><a href={"#seatpost"}>Seatposts</a></li>
            <li className="part-item"><a href={"#headset"}>Headsets</a></li>
            <li className="part-item"><a href={"#stem"}>Stems</a></li>
            <li className="part-item"><a href={"#handle"}>Handlebars</a></li>
            <li className="part-item"><a href={"#frame"}>Frames</a></li>
            <li className="part-item"><a href={"#wheel"}>Wheelsets</a></li>
            <li className="part-item"><a href={"#tire"}>Tires</a></li>
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
