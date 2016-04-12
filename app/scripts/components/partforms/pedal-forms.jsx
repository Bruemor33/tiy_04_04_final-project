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
var ClipSelectionComponent = require('../checkbox-comps/clips-check.jsx').ClipSelectionComponent;


var PedalFormComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],

  getInitialState: function(){
    return{
      name: "",
      price: 0,
      material: "",
      type: "",
      url: "",
      Clips: [],
      addedClips: []
    }
  },
  componentWillMount: function(){
    var self = this;
    var Clips = Parse.Object.extend("Clips");
    var queryClips = new Parse.Query( Clips );
    queryClips.find().then(function(Clips){
      // console.log(Clips);
      self.setState({"Clips": Clips});
    }, function(error){
      console.log(error);
    });

  },
  handleClipSelection: function(clips, checked){
    var addedClips = this.state.addedClips;
    if(checked){
      addedClips.push(clips);
    }else{
      for(var i = 0; i < addedClips.length; i++){
        if(addedClips[i] == clips){
          addedClips.splice(i, 1);
        }
      }
    }
    this.setState({'addedClips': addedClips});
  },
  handleSubmit: function(e){
    e.preventDefault();
    var Pedal = Parse.Object.extend("Pedals");
    var pedal = new Pedal();
    var newPedalData = {
      name: this.state.name,
      price: parseInt(this.state.price),
      material: this.state.material,
      type: this.state.type,
      url: this.state.url,
    };
    pedal.set(newPedalData);
    pedal.save(null, {
      success: function(user){
        console.log("You pushed successfully");
      },
      error: function(user, error){
        alert("Error" + error.code + " " + error.message);
      }
    });

    var clipsRelation = pedal.relation("Clips");
    this.state.addedClips.forEach(function(clips){
      clipsRelation.add(clips);
      console.log(clips);
    });
  },

  render: function(){

    var newClip = function(clips){
      return (
        <div key={clips.objectId}>
          <ClipSelectionComponent handleClipSelection={this.handleClipSelection} clips={clips}/>
        </div>
      )
    }

    // console.log(this.state.Clips);

    return (
      <div className="container-fluid col-md-12">
        <h2 className="add-component-heading text-center">Add Comp Here</h2>
        <form id="add-component-form" onSubmit={this.handleSubmit}>
          <div className="col-md-4">
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-headset-name">Pedal Name</label>
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
              <label className="form-label" htmlFor="add-headset-type">type</label>
              <input valueLink={this.linkState('type')} type="text" className="form-control" id="add-headset-type" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-headset-url">url</label>
              <input valueLink={this.linkState('url')} type="text" className="form-control" id="add-headset-url" />
            </fieldset>
          </div>
          <div className="col-md-4">
            <fieldset className="form-group add-comp-form">
              <h3 className="component-title">Foot Retention</h3>
              <div className="col-md-12 add-comp-form-bottombracket-checklist">
                {this.state.Clips.map(newClip.bind(this))}
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
  'PedalFormComponent': PedalFormComponent
}
