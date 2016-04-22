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
      'frameSets': [],
      'bikes': []
    }
  },
  componentWillMount: function(){
    var self = this;
    var FrameSets = Parse.Object.extend("frameSets");
    var queryFrames = new Parse.Query( FrameSets );
    queryFrames.find().then(function(FrameSets){
      // console.log(FrameSets);
      self.setState({"frameSets": FrameSets});
    }, function(error){
      console.log(error);
    });
  },
  handleBuild: function(event){
    event.preventDefault();
    Backbone.history.navigate("frameselection", {trigger: true});
  },
  render: function(){
    var bikes = []; //Parse.User.current().get('userBikes');
    var frames = this.state.frameSets;
    var currentFrames = frames.map(function(frame, index){
      var images = frame.get("Image");
      var frameName = frame.get("name");
      var frameImage = images

      return (
        <div className="col-md-6">
          <a className="frame-button"><img className="frame-image" src={frameImage.url()} /></a>
          <p className="image-caption">{frameName}</p>
        </div>
      )
    })
    console.log("framsets", frames);

    //  var images = frames.get("Image");
    // var frameImage = images;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="navigation-links col-md-12">

            <div className="col-md-4">

              <a href={"#components"}>
                <div className="bike-components"></div>
                <h3 className="components-link">Components</h3>
              </a>
            </div>

            <div className="col-md-4">

              <a href={"#frameselection"}>
                <div className="build-bike"></div>
                <h3 className="build-title">Build</h3>
              </a>
            </div>

            <div className="col-md-4">

              <a href="#bicycle">
                <div className="bike-builds"></div>
                <h3 className="builds-link">Builds</h3>
              </a>
            </div>

          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="bike-box"></div>
              <h1 className="frames">Frame Catalog</h1>
              <div className="frame-display">
                {currentFrames}
              </div>
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
