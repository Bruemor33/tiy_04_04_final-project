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

var CranksetSelectionComponent = require('../checkbox-comps/crankset-check.jsx').CranksetSelectionComponent;



var BottomBracketForm = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],

  getInitialState: function(){
    return{
      name: "",
      price: 0,
      threading: "",
      width: "",
      url: "",
      CrankSets: [],
      addedCrankSet: []
    }
  },
  componentWillMount: function(){
    var self = this;
    var CrankSets = Parse.Object.extend("Cranksets");
    var queryCrank = new Parse.Query( CrankSets );
    queryCrank.find().then(function(CrankSets){
      console.log(CrankSets);
      self.setState({"CrankSets": CrankSets});
    }, function(error){
      console.log(error);
    });

  },
  handleCranksetSelection: function(cranksets, checked){
    var addedCrankSet = this.state.addedCrankSet;
    if(checked){
      addedCrankSet.push(cranksets);
    }else{
      for(var i = 0; i < addedCrankSet.length; i++){
        if(addedCrankSet[i] == cranksets){
          addedCrankSet.splice(i, 1);
        }
      }
    }
    this.setState({'addedCrankSet': addedCrankSet});
  },
  handleSubmit: function(e){
    e.preventDefault();
    var BottomBracket = Parse.Object.extend("BottomBracket");
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

    var cranksetRelation = bb.relation("Cranksets");
    this.state.addedCrankSet.forEach(function(cranksets){
      cranksetRelation.add(cranksets);
      console.log(cranksets);
    });
  },

  render: function(){

    var newCrankset = function(cranksets){
      return (
        <div key={cranksets.objectId}>
          <CranksetSelectionComponent handleCranksetSelection={this.handleCranksetSelection} cranksets={cranksets}/>
        </div>
      )
    }

    // console.log(this.state.CrankSets);

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
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-bb-url">Url</label>
              <input valueLink={this.linkState('url')} type="text" className="form-control" id="add-bb-url" />
            </fieldset>
          </div>
          <div className="col-md-4">
            <fieldset className="form-group add-comp-form">
              <h3 className="component-title">CrankSets</h3>
              <div className="col-md-12 add-comp-form-bottombracket-checklist">
                {this.state.CrankSets.map(newCrankset.bind(this))}
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
  'BottomBracketForm': BottomBracketForm
}
