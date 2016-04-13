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

var WheelSetFormComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],

  getInitialState: function(){
    return{
      name: "",
      price: 0,
      weight: [],
      rimDepth: 0,
      spokeCount: [],
      lacing: "",
      rearHub: "",
      frontHub: "",
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
    var Wheelset = Parse.Object.extend("WheelSets");
    var wheelSet = new Wheelset();
    var newWheelsetData = {
      name: this.state.name,
      price: parseInt(this.state.price),
      weight: this.state.weight,
      rimDepth: parseInt(this.state.rimDepth),
      spokeCount: this.state.spokeCount,
      lacing: this.state.lacing,
      rearHub: this.state.rearHub,
      frontHub: this.state.frontHub,
      url: this.state.url
    };
    headSet.set(newWheelsetData);
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
              <label className="form-label" htmlFor="add-headset-name">Wheelset Name</label>
              <input valueLink={this.linkState('name')} type="text" className="form-control" id="add-headset-name" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-headset-price">price</label>
              <input valueLink={this.linkState('price')} type="text" className="form-control" id="add-headset-price" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-headset-weight">weight</label>
              <input valueLink={this.linkState('weight')} type="text" className="form-control" id="add-headset-weight" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-headset-rimDepth">rimDepth</label>
              <input valueLink={this.linkState('rimDepth')} type="text" className="form-control" id="add-headset-rimDepth" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-headset-spokeCount">spokeCount</label>
              <input valueLink={this.linkState('spokeCount')} type="text" className="form-control" id="add-headset-spokeCount" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-headset-lacing">lacing</label>
              <input valueLink={this.linkState('lacing')} type="text" className="form-control" id="add-headset-lacing" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-headset-rearHub">rearHub</label>
              <input valueLink={this.linkState('rearHub')} type="text" className="form-control" id="add-headset-rearHub" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-headset-frontHub">frontHub</label>
              <input valueLink={this.linkState('frontHub')} type="text" className="form-control" id="add-headset-frontHub" />
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
  'WheelSetFormComponent': WheelSetFormComponent
}
