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
            <li className="part-item">
              <a href={"#chain"}>
                <p className="form-title">Chains</p>
                <p className="form-description">- add an additional chain to the collection.</p>
              </a>
            </li>
            <li className="part-item">
              <a href={"#chainring"}>
                <p className="form-title">Chainrings</p>
                <p className="form-description"> add additional ________ to the collection.</p>
              </a>
            </li>
            <li className="part-item">
              <a href={"#cranks"}>
                <p className="form-title">Cranksets</p>
                <p className="form-description"> add additional ________ to the collection.</p>
              </a>
            </li>
            <li className="part-item">
              <a href={"#bottombracket"}>
                <p className="form-title">Bottombrackets</p>
                <p className="form-description"> add additional ________ to the collection.</p>
              </a>
            </li>
            <li className="part-item">
              <a href={"#clip"}>
                <p className="form-title">Foot Retention</p>
                <p className="form-description"> add additional ________ to the collection.</p>
              </a>
            </li>
            <li className="part-item">
              <a href={"#pedal"}>
                <p className="form-title">Pedals</p>
                <p className="form-description"> add additional ________ to the collection.</p>
              </a>
            </li>
            <li className="part-item">
              <a href={"#saddle"}>
                <p className="form-title">Saddles</p>
                <p className="form-description"> add additional ________ to the collection.</p>
              </a>
            </li>
            <li className="part-item">
              <a href={"#seatpost"}>
                <p className="form-title">Seatposts</p>
                <p className="form-description"> add additional ________ to the collection.</p>
              </a>
            </li>
            <li className="part-item">
              <a href={"#headset"}>
                <p className="form-title">Headsets</p>
                <p className="form-description"> add additional ________ to the collection.</p>
              </a>
            </li>
            <li className="part-item">
              <a href={"#stem"}>
                <p className="form-title">Stems</p>
                <p className="form-description"> add additional ________ to the collection.</p>
              </a>
            </li>
            <li className="part-item">
              <a href={"#handle"}>
                <p className="form-title">Handlebars</p>
                <p className="form-description"> add additional ________ to the collection.</p>
              </a>
            </li>
            <li className="part-item">
              <a href={"#frame"}>
                <p className="form-title">Frames</p>
                <p className="form-description"> add additional ________ to the collection.</p>
              </a>
            </li>
            <li className="part-item">
              <a href={"#wheel"}>
                <p className="form-title">Wheelsets</p>
                <p className="form-description"> add additional ________ to the collection.</p>
              </a>
            </li>
            <li className="part-item">
              <a href={"#tire"}>
                <p className="form-title">Tires</p>
                <p className="form-description"> add additional ________ to the collection.</p>
              </a>
            </li>
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
