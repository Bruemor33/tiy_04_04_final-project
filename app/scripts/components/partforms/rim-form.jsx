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

var RimComponentForm = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],

  getInitialState: function(){
    return{
      name: "",
      price: 0,
      size: 0,
      width: 0,
      height: 0,
      tire: "",
      valve: "",
      beadSeatDiameter: 0,
      effectiveRimDiameter: 0,
      weight: 0,
      sidewallDrillings: 0,
      url: ""
    }
  },
  componentWillMount: function(){
    var self = this;
    var BottomBracket = Parse.Object.extend("BottomBracket");
    var query = new Parse.Query( BottomBracket );
    query.find().then(function(bottomBracket){
      console.log(bottomBracket);
      self.setState({"bottomBracket": bottomBracket});
    }, function(error){
      console.log(error);
    });

  },
  handleSubmit: function(e){
    e.preventDefault();
    var Rim = Parse.Object.extend("Rims");
    var rim = new Rim();
    var newRimData = {
      name: this.state.name,
      price: parseInt(this.state.price),
      size: parseInt(this.state.size),
      width: parseInt(this.state.width),
      height: parseInt(this.state.height),
      tire: this.state.tire,
      valve: this.state.valve,
      beadSeatDiameter: parseInt(this.state.beadSeatDiameter),
      effectiveRimDiameter: parseInt(this.state.effectiveRimDiameter),
      weight: parseInt(this.state.weight),
      sidewallDrillings: parseInt(this.state.sidewallDrillings),
      url: this.state.url
    };
    headSet.set(newRimData);
    headSet.save(null, {
      success: function(user){
        console.log("You pushed successfully");
      },
      error: function(user, error){
        alert("Error" + error.code + " " + error.message);
      }
    });
  },

  render: function(){

    return (
      <div className="container-fluid col-md-12">
        <h2 className="add-component-heading text-center">Add Comp Here</h2>
        <form id="add-component-form" onSubmit={this.handleSubmit}>
          <div className="col-md-4">
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-hub-name">Rim Name</label>
              <input valueLink={this.linkState('name')} type="text" className="form-control" id="add-hub-name" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-hub-price">price</label>
              <input valueLink={this.linkState('price')} type="text" className="form-control" id="add-hub-price" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-hub-size">size</label>
              <input valueLink={this.linkState('size')} type="text" className="form-control" id="add-hub-size" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-hub-width">width</label>
              <input valueLink={this.linkState('width')} type="text" className="form-control" id="add-hub-width" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-hub-height">height</label>
              <input valueLink={this.linkState('height')} type="text" className="form-control" id="add-hub-height" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-hub-tire">tire</label>
              <input valueLink={this.linkState('tire')} type="text" className="form-control" id="add-hub-tire" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-hub-valve">valve</label>
              <input valueLink={this.linkState('valve')} type="text" className="form-control" id="add-hub-valve" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-hub-beadSeatDiameter">beadSeatDiameter</label>
              <input valueLink={this.linkState('beadSeatDiameter')} type="text" className="form-control" id="add-hub-beadSeatDiameter" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-hub-effectiveRimDiameter">effectiveRimDiameter</label>
              <input valueLink={this.linkState('effectiveRimDiameter')} type="text" className="form-control" id="add-hub-effectiveRimDiameter" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-hub-weight">weight</label>
              <input valueLink={this.linkState('weight')} type="text" className="form-control" id="add-hub-weight" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-hub-sidewallDrillings">sidewallDrillings</label>
              <input valueLink={this.linkState('sidewallDrillings')} type="text" className="form-control" id="add-hub-sidewallDrillings" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-hub-url">url</label>
              <input valueLink={this.linkState('url')} type="text" className="form-control" id="add-hub-url" />
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
  'RimComponentForm': RimComponentForm
}
