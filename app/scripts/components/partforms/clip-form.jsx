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

//This form will handle clips as well as straps. It will have a checkbox component tied to it for the pedal form.

var ClipFormComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],

  getInitialState: function(){
    return{
      name: "",
      price: 0,
      material: "",
      url: "",
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
    var Clip = Parse.Object.extend("Clips");
    var clip = new Clip();
    var newClipData = {
      name: this.state.name,
      price: parseInt(this.state.price),
      material: this.state.material,
      url: this.state.url
    };
    clip.set(newClipData);
    clip.save(null, {
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
        <h2 className="add-component-heading text-center">Add Foot Retention</h2>
        <form id="add-component-form" onSubmit={this.handleSubmit}>
          <div className="col-md-4">
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-headset-name">Clip Name</label>
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
              <label className="form-label" htmlFor="add-headset-url">url</label>
              <input valueLink={this.linkState('url')} type="text" className="form-control" id="add-headset-url" />
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
  'ClipFormComponent': ClipFormComponent
}
