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

//Testing Parse Data.
// var Frames = Parse.Object.extend("Frames");
// var frameSet = new Parse.Query( Frames );
// frameSet.find().then(function(mod){
//   console.log(mod);
//   self.setState({"frameSet": mod});
// }, function(error){
//   console.log(error);
// });



var ChainRingFormComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],

  getInitialState: function(){
    return{
      name: "",
      price: 0,
      material: "",
      chainSize: 0,
      teeth: 0,
      url: ""
    }
  },
  componentWillMount: function(){
    var self = this;
    var BottomBracket = Parse.Object.extend("BottomBracket");
    var query = new Parse.Query( BottomBracket );
    query.find().then(function(BottomBracket){
      console.log(BottomBracket);
      self.setState({"BottomBracket": BottomBracket});
    }, function(error){
      console.log(error);
    });

  },
  handleSubmit: function(e){
    e.preventDefault();
    var ChainRing = Parse.Object.extend("ChainRings");
    var chainRing = new ChainRing();
    var newChainRingData = {
      name: this.state.name,
      price: parseInt(this.state.price),
      material: this.state.material,
      chainSize: parseInt(this.state.chainSize),
      teeth: parseInt(this.state.teeth),
      url: this.state.url

    };
    chainRing.set(newChainRingData);
    chainRing.save(null, {
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
              <label className="form-label" htmlFor="add-chainring-name">Chainring name</label>
              <input valueLink={this.linkState('name')} type="text" className="form-control" id="add-chainring-name" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-chainring-price">price</label>
              <input valueLink={this.linkState('price')} type="text" className="form-control" id="add-chainring-price" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-chainring-material">material</label>
              <input valueLink={this.linkState('material')} type="text" className="form-control" id="add-chainring-size" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-chainring-chainsize">chain size</label>
              <input valueLink={this.linkState('chainSize')} type="text" className="form-control" id="add-chainring-chainsize" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-chainring-teeth">teeth</label>
              <input valueLink={this.linkState('teeth')} type="text" className="form-control" id="add-chainring-teeth" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-chainring-url">url</label>
              <input valueLink={this.linkState('url')} type="text" className="form-control" id="add-chainring-url" />
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
  'ChainRingFormComponent': ChainRingFormComponent
}
