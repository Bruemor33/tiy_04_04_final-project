var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
require('backbone-react-component');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');
var ParseReact = require('parse-react');
var Backbone = require('backbone');




var ProfileComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],

  getInitialState: function(){
    return {
      'frameSet': []
    }
  },

  componentWillMount: function(){
    var self = this
    var Bike = Parse.Object.extend("Bicycle");
    var bikeQuery = new Parse.Query( Bike );
    bikeQuery.find().then(function(Bike){
      bikeQuery.include(Bike.frame);
      self.setState({'Bikes': Bike});
    }, function(error){
      console.log(error);
    })

    var frameSetId = "kyyH8a27q5"
    var frameSet = Parse.Object.extend("frameSets");
    var query = new Parse.Query( frameSet );
    query.get(frameSetId).then(function(frameSet){
      self.setState({'frameSet': frameSet});
    })
  },

  handleBuild: function(event){
    event.preventDefault();
    Backbone.history.navigate("frameselection", {trigger: true});
  },

  render: function(){
    console.log(this.state.frameSet);


    var image = this.state.frameSet.get("Image");
    var frameImage = image;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <button type="button" onClick={this.handleBuild} className="btn btn-secondary">Build</button>
            <div className="col-md-4 profile-picture">

            </div>
            <div className="col-md-4 dummy-data">

            </div>
            <div className="col-md-8 bikes-built">
              <img className="frame-image" src={frameImage.url()} alt="" />
            </div>
          </div>
        </div>
      </div>
    )
  }
});


//Exports
module.exports = {
  'ProfileComponent': ProfileComponent
}
