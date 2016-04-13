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

var HandlebarFormComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],

  getInitialState: function(){
    return{
      name: "",
      price: 0,
      material: "",
      diameter: 0,
      drop: 0,
      reach: 0,
      width: [],
      type: "",
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
    var HandleBars = Parse.Object.extend("HandleBars");
    var handleBars = new HandleBars();
    var newHandleBarData = {
      name: this.state.name,
      price: parseInt(this.state.price),
      material: this.state.material,
      diameter: parseInt(this.state.diameter),
      drop: parseInt(this.state.drop),
      reach: parseInt(this.state.reach),
      width: parseInt(this.state.width),
      type: this.state.type,
      url: this.state.url
    };
    handleBars.set(newHandleBarData);
    handleBars.save(null, {
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
              <label className="form-label" htmlFor="add-headset-name">Handlebar Name</label>
              <input valueLink={this.linkState('name')} type="text" className="form-control" id="add-headset-name" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-headset-price">price</label>
              <input valueLink={this.linkState('price')} type="text" className="form-control" id="add-headset-price" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-headset-material">material</label>
              <input valueLink={this.linkState('material')} type="text" className="form-control" id="add-headset-material" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-headset-diameter">Diameter</label>
              <input valueLink={this.linkState('diameter')} type="text" className="form-control" id="add-headset-diameter" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-headset-drop">drop</label>
              <input valueLink={this.linkState('drop')} type="text" className="form-control" id="add-headset-drop" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-headset-reach">reach</label>
              <input valueLink={this.linkState('reach')} type="text" className="form-control" id="add-headset-reach" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-headset-width">width</label>
              <input valueLink={this.linkState('width')} type="text" className="form-control" id="add-headset-width" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-headset-type">type</label>
              <input valueLink={this.linkState('type')} type="text" className="form-control" id="add-headset-type" />
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
  'HandlebarFormComponent': HandlebarFormComponent
}
