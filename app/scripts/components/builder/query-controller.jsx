var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
var ParseReact = require('parse-react');
require('Backbone-React-Component');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');



//Creating this component in order to do some seperate queries for the build page.
//It may be better to seperate what relational parts I need into different file components.

var SecondTierComponents = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],

//I need to grab the initial state from the selection.


  componentWillMount: function(){
    //Possibly have to query the components I want to be choosing.

    //Crankset query
    var self = this;
    var Cranksets = Parse.Object.extend("Cranksets");
    var queryCranks = new Parse.Query( Cranksets );
    queryCranks.find().then(function(Cranksets){
      self.setState({'Cranksets': Cranksets})
    }, function(error){
      console.log(error);
    });

    var Chainrings = Parse.Object.extend("ChainRings");
    var queryChainrings = new Parse.Query( Chainrings );
    queryChainrings.find().then(function(Chainrings){
      self.setState({'Chainrings': Chainrings})
    }, function(error){
      console.log(error);
    });

    //Saddle query
    var Saddles = Parse.Object.extend("Saddles");
    var querySaddles = new Parse.Query( Saddles );
    querySaddles.find().then(function(Saddles){
      self.setState({'Saddles': Saddles})
    }, function(error){
      console.log(error);
    });

    //Stem query
    var Stems = Parse.Object.extend("Stems");
    var queryStems = new Parse.Query( Stems );
    queryStems.find().then(function(Stems){
      self.setState({'Stems': Stems})
    }, function(error){
      console.log(error);
    });

    //Handlebar query
    var Handlebars = Parse.Object.extend("HandleBars");
    var queryHandlebars = new Parse.Query( Handlebars );
    queryHandlebars.find().then(function(Handlebars){
      self.setState({'Handlebars': Handlebars})
    }, function(error){
      console.log(error);
    });
  },

  render: function(){

    console.log(this.props.FrameSets);
    var FrameSets = this.props.FrameSets;

    var images = FrameSets.get("Image");
    var frameImage = images;


    return (
      <div className="checkbox col-md-8">
        <div className="add-frame-checkbox-labels">
          <img className="frame-image" src={frameImage.url()} alt="" />
          <p value={this.props.FrameSets.id} />{this.props.FrameSets.get("name")}
        </div>
        <div className="compatible-parts">

        </div>
      </div>
    )
  }
});


//Exports
module.exports = {
  'SelectedFrameComponent': SelectedFrameComponent
}
