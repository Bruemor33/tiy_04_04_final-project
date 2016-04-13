var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
var ParseReact = require('parse-react');
require('Backbone-React-Component');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');

Parse.initialize("bikebuilder");
Parse.serverURL = "http://bikebuilders3.herokuapp.com/";

//Local Imports

var SaddleFormComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],

  getInitialState: function(){
    return{
      name: "",
      price: 0,
      size: [],
      color: "",
      padding: "",
      rails: "",
      url: ""
    }
  },
  componentWillMount: function(){
    var self = this;
    var ChainRings = Parse.Object.extend("ChainRings");
    var queryChainRing = new Parse.Query( ChainRings );
    queryChainRing.find().then(function(ChainRings){
      console.log(ChainRings);
      self.setState({"ChainRings": ChainRings});
    }, function(error){
      console.log(error);
    });

  },
  handleSubmit: function(e){
    e.preventDefault();
    var Saddles = Parse.Object.extend("Saddles");
    var saddle = new Saddles();
    var newSaddleData = {
      name: this.state.name,
      price: parseInt(this.state.price),
      size: this.state.size,
      color: this.state.color,
      padding: this.state.padding,
      rails: this.state.rails,
      url: this.state.url
    };
    saddle.set(newSaddleData);
    saddle.save(null, {
      success: function(user){
        console.log("You pushed successfully");
      },
      error: function(user, error){
        alert("Error" + error.code + " " + error.message);
      }
    });

  },

  render: function(){

    // console.log(this.state.ChainRings);

    return (
      <div className="container-fluid col-md-12">
        <h2 className="add-component-heading text-center">Add Comp Here</h2>
        <form id="add-component-form" onSubmit={this.handleSubmit}>
          <div className="col-md-4">
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-headset-name">Saddle Name</label>
              <input valueLink={this.linkState('name')} type="text" className="form-control" id="add-headset-name" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-headset-price">price</label>
              <input valueLink={this.linkState('price')} type="text" className="form-control" id="add-headset-price" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-headset-size">size</label>
              <input valueLink={this.linkState('size')} type="text" className="form-control" id="add-headset-size" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-headset-color">color</label>
              <input valueLink={this.linkState('color')} type="text" className="form-control" id="add-headset-color" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-headset-padding">padding</label>
              <input valueLink={this.linkState('padding')} type="text" className="form-control" id="add-headset-padding" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-headset-rails">rails</label>
              <input valueLink={this.linkState('rails')} type="text" className="form-control" id="add-headset-rails" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-headset-url">url</label>
              <input valueLink={this.linkState('url')} type="text" className="form-control" id="add-headset-url" />
            </fieldset>
          </div>
        </form>
        <button type="submit" form="add-component-form" id="add-frame-form-button" className="btn btn-primary ">Add</button>
      </div>
    )
  }
})

//Exports
module.exports = {
  'SaddleFormComponent': SaddleFormComponent
}
