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

var HubFormComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],

  getInitialState: function(){
    return{
      name: "",
      price: 0,
      holeCount: 0,
      color: "",
      spacing: 0,
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
    var Hub = Parse.Object.extend("Hubs");
    var hub = new Hub();
    var newHubData = {
      name: this.state.name,
      price: parseInt(this.state.price),
      holeCount: parseInt(this.state.holeCount),
      color: this.state.color,
      spacing: parseInt(this.state.spacing),
      url: this.state.url
    };
    hub.set(newHubData);
    hub.save(null, {
      success: function(user){
        console.log("You pushed successfully");
        Backbone.history.navigate("components", {trigger: true});
      },
      error: function(user, error){
        alert("Error" + error.code + " " + error.message);
      }
    });
  },

  render: function(){

    return (
      <div className="container-fluid col-md-12">
        <h2 className="add-component-heading text-center">Add a Hub</h2>
        <form id="add-component-form" onSubmit={this.handleSubmit}>
          <div className="col-md-4">
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-hub-name">Hub Name</label>
              <input valueLink={this.linkState('name')} type="text" className="form-control" id="add-hub-name" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-hub-price">price</label>
              <input valueLink={this.linkState('price')} type="text" className="form-control" id="add-hub-price" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-hub-holecount">hole count</label>
              <input valueLink={this.linkState('holeCount')} type="text" className="form-control" id="add-hub-holecount" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-hub-color">color</label>
              <input valueLink={this.linkState('color')} type="text" className="form-control" id="add-hub-color" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-hub-spacing">spacing</label>
              <input valueLink={this.linkState('spacing')} type="text" className="form-control" id="add-hub-spacing" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-hub-url">url</label>
              <input valueLink={this.linkState('url')} type="text" className="form-control" id="add-hub-url" />
            </fieldset>
            <button type="submit" form="add-component-form" id="add-frame-form-button" className="btn btn-primary ">Add</button>

          </div>
        </form>
      </div>
    )
  }
})

//Exports
module.exports = {
  'HubFormComponent': HubFormComponent
}
