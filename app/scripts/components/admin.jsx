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



var AdminFormComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],

  getInitialState: function(){
    return{
      name: "",
      price: 0,
      material: "",
      headset: "",
      seattube: 0,
      color: "",
      url: "",
      image: "",
      bottomBracket: []
    }
  },
  componentWillMount: function(){
    var self = this;
    var BottomBracket = Parse.Object.extend("BottomBracket");
    var query = new Parse.Query( BottomBracket );
    query.find().then(function(bottombracket){
      self.setState({"bottomBracket": bottombracket});
    }, function(error){
      console.log(error);
    });
  },
  handleSubmit: function(e){
    e.preventDefault();
  }

  render: function(){
    return (
      <div className="container-fluid col-md-12">
        <h2 className="add-component-heading text-center">Add Comp Here</h2>
        <form id="add-component-form" onSubmit={this.handleSubmit}>
          <div className="col-md-4">
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-frame-name">frame name</label>
              <input valueLink={this.linkState('name')} type="text" className="form-control" id="add-frame-name" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-frame-price">price</label>
              <input valueLink={this.linkState('price')} type="text" className="form-control" id="add-frame-price" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-frame-material">material</label>
              <input valueLink={this.linkState('material')} type="text" className="form-control" id="add-frame-material" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-frame-headset">headset</label>
              <input valueLink={this.linkState('headset')} type="text" className="form-control" id="add-frame-headset" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-frame-seatpost">seatpost</label>
              <input valueLink={this.linkState('seatpost')} type="text" className="form-control" id="add-frame-seatpost" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-frame-color">color</label>
              <input valueLink={this.linkState('color')} type="text" className="form-control" id="add-frame-color" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-frame-url">url</label>
              <input valueLink={this.linkState('url')} type="text" className="form-control" id="add-frame-url" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-frame-image">image</label>
              <input valueLink={this.linkState('image')} type="img" className="form-control" id="add-frame-image" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-frame-bottombracket">bb</label>
              <input valueLink={this.linkState('bottomBracket')} type="array" className="form-control" id="add-frame-bottombracket" />
            </fieldset>
          </div>
        </form>
      </div>
    )
  }
})

//Exports
module.exports = {
  'AdminFormComponent': AdminFormComponent
}
