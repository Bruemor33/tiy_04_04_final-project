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

var TireComponentForm = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],

  getInitialState: function(){
    return{
      name: "",
      price: 0,
      size: [],
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
    var Tire = Parse.Object.extend("Tires");
    var tire = new Tire();
    var newTireData = {
      name: this.state.name,
      price: parseInt(this.state.price),
      size: parseInt(this.state.size),
      tube: parseInt(this.state.tube)
    };
    tire.set(newTireData);
    tire.save(null, {
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
        <h2 className="add-component-heading text-center">Add a Tireset</h2>
        <form id="add-component-form" onSubmit={this.handleSubmit}>
          <div className="col-md-4">
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-headset-name">Tire Name</label>
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
  'TireComponentForm': TireComponentForm
}
