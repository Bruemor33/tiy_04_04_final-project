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



var ChainFormComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],

  getInitialState: function(){
    return{
      name: "",
      price: 0,
      size: 0,
      material: "",
      links: 0,
      application: "",
      color: "",
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
    var Chain = Parse.Object.extend("Chains");
    var chain = new Chain();
    var newChainData = {
      name: this.state.name,
      price: parseInt(this.state.price),
      size: this.state.threading,
      material: parseInt(this.state.width),
      links: parseInt(this.state.links),
      application: this.state.application,
      color: this.state.color,
      url: this.state.url

    };
    chain.set(newChainData);
    chain.save(null, {
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
              <label className="form-label" htmlFor="add-chain-name">Chain name</label>
              <input valueLink={this.linkState('name')} type="text" className="form-control" id="add-chain-name" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-chain-price">price</label>
              <input valueLink={this.linkState('price')} type="text" className="form-control" id="add-chain-price" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-chain-size">size</label>
              <input valueLink={this.linkState('size')} type="text" className="form-control" id="add-chain-size" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-chain-material">material</label>
              <input valueLink={this.linkState('material')} type="text" className="form-control" id="add-chain-material" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-chain-links">links</label>
              <input valueLink={this.linkState('links')} type="text" className="form-control" id="add-chain-links" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-chain-application">application</label>
              <input valueLink={this.linkState('application')} type="text" className="form-control" id="add-chain-application" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-chain-color">color</label>
              <input valueLink={this.linkState('color')} type="text" className="form-control" id="add-chain-color" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-chain-url">url</label>
              <input valueLink={this.linkState('url')} type="text" className="form-control" id="add-chain-url" />
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
  'ChainFormComponent': ChainFormComponent
}
