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
var ChainringSelectionComponent = require('../checkbox-comps/chainring-check.jsx').ChainringSelectionComponent;

var CranksetFormComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],

  getInitialState: function(){
    return{
      name: "",
      price: 0,
      material: "",
      armLength: [],
      url: "",
      ChainRings: [],
      addedChainRings: []
    }
  },
  componentWillMount: function(){
    var self = this;
    var ChainRings = Parse.Object.extend("ChainRings");
    var queryChainRing = new Parse.Query( ChainRings );
    queryChainRing.find().then(function(ChainRings){
      console.log(ChainRings);
      self.setState({"ChainRings": ChainRings});
    }, function(error){
      console.log(error);
    });

  },
  handleChainringSelection: function(chainrings, checked){
    var addedChainRings = this.state.addedChainRings;
    if(checked){
      addedChainRings.push(chainrings);
    }else{
      for(var i = 0; i < addedChainRings.length; i++){
        if(addedChainRings[i] == chainrings){
          addedChainRings.splice(i, 1);
        }
      }
    }
    this.setState({'addedChainRings': addedChainRings});
  },
  handleSubmit: function(e){
    e.preventDefault();
    var Crankset = Parse.Object.extend("Cranksets");
    var crankSets = new Crankset();
    var newCranksetData = {
      name: this.state.name,
      price: parseInt(this.state.price),
      material: this.state.material,
      armLength: this.state.armLength,
      url: this.state.url
    };
    crankSets.set(newCranksetData);
    crankSets.save(null, {
      success: function(user){
        console.log("You pushed successfully");
      },
      error: function(user, error){
        alert("Error" + error.code + " " + error.message);
      }
    });

    var chainRingRelation = crankSets.relation("ChainRings");
    this.state.addedChainRings.forEach(function(chainrings){
      chainRingRelation.add(chainrings);
      console.log(chainrings);
    });
  },

  render: function(){

    var newChainrings = function(chainrings){
      return (
        <div key={chainrings.objectId}>
          <ChainringSelectionComponent handleChainringSelection={this.handleChainringSelection} chainrings={chainrings}/>
        </div>
      )
    }

    // console.log(this.state.ChainRings);

    return (
      <div className="container-fluid col-md-12">
        <h2 className="add-component-heading text-center">Add Comp Here</h2>
        <form id="add-component-form" onSubmit={this.handleSubmit}>
          <div className="col-md-4">
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-headset-name">Crankset Name</label>
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
              <label className="form-label" htmlFor="add-headset-armlength">Arm Length</label>
              <input valueLink={this.linkState('armLength')} type="text" className="form-control" id="add-headset-armlength" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-headset-url">url</label>
              <input valueLink={this.linkState('url')} type="text" className="form-control" id="add-headset-url" />
            </fieldset>
          </div>
          <div className="col-md-4">
            <fieldset className="form-group add-comp-form">
              <h3 className="component-title">Chainrings</h3>
              <div className="col-md-12 add-comp-form-bottombracket-checklist">
                {this.state.ChainRings.map(newChainrings.bind(this))}
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
  'CranksetFormComponent': CranksetFormComponent
}
