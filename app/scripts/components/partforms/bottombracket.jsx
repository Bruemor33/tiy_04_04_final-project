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



var BottomBracketForm = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],

  getInitialState: function(){
    return{
      name: "",
      price: 0,
      threading: "",
      width: 0,
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
    var BottomBracket = Parse.Object.extend("bottomBracket");
    var bb = new BottomBracket();
    var newBracketData = {
      name: this.state.name,
      price: parseInt(this.state.price),
      threading: this.state.threading,
      width: parseInt(this.state.width)
    };
    bb.set(newBracketData);
    bb.save(null, {
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
              <label className="form-label" htmlFor="add-bb-name">Bracket name</label>
              <input valueLink={this.linkState('name')} type="text" className="form-control" id="add-bb-name" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-bb-price">price</label>
              <input valueLink={this.linkState('price')} type="text" className="form-control" id="add-bb-price" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-bb-threading">threading</label>
              <input valueLink={this.linkState('threading')} type="text" className="form-control" id="add-bb-threading" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-bb-width">Width</label>
              <input valueLink={this.linkState('width')} type="text" className="form-control" id="add-bb-width" />
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
  'BottomBracketForm': BottomBracketForm
}
