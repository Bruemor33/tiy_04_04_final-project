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
              <a href={"#chain"} className="link-container">
                <p className="form-title">Chains</p>
                <p className="chain-description">add additional chain to the collection.</p>
              </a>
            </li>
            <li className="part-item">
              <a href={"#chainring"} className="link-container">
                <p className="form-title">Chainrings</p>
                <p className="chainring-description"> add additional Chainrings to the collection.</p>
              </a>
            </li>
            <li className="part-item">
              <a href={"#cranks"} className="link-container">
                <p className="form-title">Cranksets</p>
                <p className="cranks-description"> add additional Cranksets to the collection.</p>
              </a>
            </li>
            <li className="part-item">
              <a href={"#bottombracket"} className="link-container">
                <p className="form-title">Bottombrackets</p>
                <p className="bottombracket-description"> add additional Bottombrackets to the collection.</p>
              </a>
            </li>
            <li className="part-item">
              <a href={"#clip"} className="link-container">
                <p className="form-title">Foot Retention</p>
                <p className="retention-description"> add additional Foot Retention to the collection.</p>
              </a>
            </li>
            <li className="part-item">
              <a href={"#pedal"} className="link-container">
                <p className="form-title">Pedals</p>
                <p className="pedals-description"> add additional Pedals to the collection.</p>
              </a>
            </li>
            <li className="part-item">
              <a href={"#saddle"} className="link-container">
                <p className="form-title">Saddles</p>
                <p className="saddles-description"> add additional Saddles to the collection.</p>
              </a>
            </li>
            <li className="part-item">
              <a href={"#seatpost"} className="link-container">
                <p className="form-title">Seatposts</p>
                <p className="seatposts-description"> add additional Seatposts to the collection.</p>
              </a>
            </li>
            <li className="part-item">
              <a href={"#headset"} className="link-container">
                <p className="form-title">Headsets</p>
                <p className="headset-description"> add additional Headsets to the collection.</p>
              </a>
            </li>
            <li className="part-item">
              <a href={"#stem"} className="link-container">
                <p className="form-title">Stems</p>
                <p className="stem-description"> add additional Stems to the collection.</p>
              </a>
            </li>
            <li className="part-item">
              <a href={"#handle"} className="link-container">
                <p className="form-title">Handlebars</p>
                <p className="handlebars-description"> add additional Handlebars to the collection.</p>
              </a>
            </li>
            <li className="part-item">
              <a href={"#frame"} className="link-container">
                <p className="form-title">Frames</p>
                <p className="frames-description"> add additional Frames to the collection.</p>
              </a>
            </li>
            <li className="part-item">
              <a href={"#wheel"} className="link-container">
                <p className="form-title">Wheelsets</p>
                <p className="wheels-description"> add additional Wheelsets to the collection.</p>
              </a>
            </li>
            <li className="part-item">
              <a href={"#tire"} className="link-container">
                <p className="form-title">Tires</p>
                <p className="tires-description"> add additional Tires to the collection.</p>
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
