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
var HandlebarSelectionComponent = require('../checkbox-comps/handlebar-check.jsx').HandlebarSelectionComponent;


var StemFormComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],

  getInitialState: function(){
    return{
      name: "",
      price: 0,
      material: "",
      length: [],
      rise: 0,
      clampDiameter: 0,
      url: "",
      HandleBars: [],
      addedHandleBars: []
    }
  },
  componentWillMount: function(){
    var self = this;
    var HandleBars = Parse.Object.extend("HandleBars");
    var queryHandlebars = new Parse.Query( HandleBars );
    queryHandlebars.find().then(function(HandleBars){
      // console.log(Clips);
      self.setState({"HandleBars": HandleBars});
    }, function(error){
      console.log(error);
    });

  },
  handleHandlebarsSelection: function(handlebars, checked){
    var addedHandleBars = this.state.addedHandleBars;
    if(checked){
      addedHandleBars.push(handlebars);
    }else{
      for(var i = 0; i < addedHandleBars.length; i++){
        if(addedHandleBars[i] == handlebars){
          addedHandleBars.splice(i, 1);
        }
      }
    }
    this.setState({'addedHandleBars': addedHandleBars});
  },
  handleSubmit: function(e){
    e.preventDefault();
    var Stem = Parse.Object.extend("Stems");
    var stem = new Stem();
    var newStemData = {
      name: this.state.name,
      price: parseInt(this.state.price),
      material: this.state.material,
      length: parseInt(this.state.length),
      rise: parseInt(this.state.rise),
      clampDiameter: parseInt(this.state.clampDiameter),
      url: this.state.url,
    };
    stem.set(newStemData);
    stem.save(null, {
      success: function(user){
        console.log("You pushed successfully");
        Backbone.history.navigate("components", {trigger: true});
      },
      error: function(user, error){
        alert("Error" + error.code + " " + error.message);
      }
    });

    var handlebarsRelation = stem.relation("HandleBars");
    this.state.addedHandleBars.forEach(function(handlebars){
      handlebarsRelation.add(handlebars);
      console.log(handlebars);
    });
  },

  render: function(){

    var newHandleBars = function(handlebars){
      return (
        <div key={handlebars.objectId}>
          <HandlebarSelectionComponent handleHandlebarsSelection={this.handleHandlebarsSelection} handlebars={handlebars}/>
        </div>
      )
    }

    // console.log(this.state.Clips);

    return (
      <div className="container-fluid col-md-12">
        <h2 className="add-component-heading text-center">Add a Stem</h2>
        <form id="add-component-form" onSubmit={this.handleSubmit}>
          <div className="col-md-4">
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-headset-name">Stem Name</label>
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
              <label className="form-label" htmlFor="add-headset-length">length</label>
              <input valueLink={this.linkState('length')} type="text" className="form-control" id="add-headset-length" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-headset-rise">rise</label>
              <input valueLink={this.linkState('rise')} type="text" className="form-control" id="add-headset-rise" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-headset-clampdiameter">clamp diameter</label>
              <input valueLink={this.linkState('clampDiameter')} type="text" className="form-control" id="add-headset-clampdiameter" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-headset-url">url</label>
              <input valueLink={this.linkState('url')} type="text" className="form-control" id="add-headset-url" />
            </fieldset>
            <button type="submit" form="add-component-form" id="add-frame-form-button" className="btn btn-primary ">Add</button>

          </div>
          <div className="col-md-4">
            <fieldset className="form-group add-comp-form">
              <h3 className="component-title">Handlebars</h3>
              <div className="col-md-12 add-comp-form-bottombracket-checklist">
                {this.state.HandleBars.map(newHandleBars.bind(this))}
              </div>
            </fieldset>
          </div>
        </form>
      </div>
    )
  }
})

//Exports
module.exports = {
  'StemFormComponent': StemFormComponent
}
