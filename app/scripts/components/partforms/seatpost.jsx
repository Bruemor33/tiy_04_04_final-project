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

//Local Imports
var SaddleSelectionComponent = require('../checkbox-comps/saddle-check.jsx').SaddleSelectionComponent;

var SeatpostForm = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],

  getInitialState: function(){
    return{
      name: "",
      price: 0,
      size: 0,
      url: "",
      Saddles: [],
      addedSaddles: []
    }
  },
  componentWillMount: function(){
    var self = this;
    var Saddles = Parse.Object.extend("Saddles");
    var querySaddles = new Parse.Query( Saddles );
    querySaddles.find().then(function(Saddles){
      console.log(Saddles);
      self.setState({"Saddles": Saddles});
    }, function(error){
      console.log(error);
    });

  },
  handleSaddleSelection: function(saddles, checked){
    var addedSaddles = this.state.addedSaddles;
    if(checked){
      addedSaddles.push(saddles);
    }else{
      for(var i = 0; i < addedSaddles.length; i++){
        if(addedSaddles[i] == saddles){
          addedSaddles.splice(i, 1);
        }
      }
    }
    this.setState({'addedSaddles': addedSaddles});
  },
  handleSubmit: function(e){
    e.preventDefault();
    var Seatpost = Parse.Object.extend("SeatPost");
    var seatPost = new Seatpost();
    var newSeatpostData = {
      name: this.state.name,
      price: parseInt(this.state.price),
      size: parseInt(this.state.size),
      url: parseInt(this.state.url)
    };
    seatPost.set(newSeatpostData);
    seatPost.save(null, {
      success: function(user){
        console.log("You pushed successfully");
      },
      error: function(user, error){
        alert("Error" + error.code + " " + error.message);
      }
    });

    var saddleRelation = seatPost.relation("Saddles");
    this.state.addedSaddles.forEach(function(saddles){
      saddleRelation.add(saddles);
      console.log(saddles);
    });
  },

  render: function(){

    var newSaddles = function(saddles){
      return (
        <div key={saddles.objectId}>
          <SaddleSelectionComponent handleSaddleSelection={this.handleSaddleSelection} saddles={saddles}/>
        </div>
      )
    }

    return (
      <div className="container-fluid col-md-12">
        <h2 className="add-component-heading text-center">Add Comp Here</h2>
        <form id="add-component-form" onSubmit={this.handleSubmit}>
          <div className="col-md-4">
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-seatpost-name">Seatpost Name</label>
              <input valueLink={this.linkState('name')} type="text" className="form-control" id="add-seatpost-name" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-seatpost-price">price</label>
              <input valueLink={this.linkState('price')} type="text" className="form-control" id="add-seatpost-price" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-seatpost-size">size</label>
              <input valueLink={this.linkState('size')} type="text" className="form-control" id="add-seatpost-size" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-seatpost-tube">url</label>
              <input valueLink={this.linkState('url')} type="text" className="form-control" id="add-seatpost-tube" />
            </fieldset>
          </div>
          <div className="col-md-4">
            <fieldset className="form-group add-comp-form">
              <h3 className="component-title">Chainrings</h3>
              <div className="col-md-12 add-comp-form-bottombracket-checklist">
                {this.state.Saddles.map(newSaddles.bind(this))}
              </div>
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
  'SeatpostForm': SeatpostForm
}
