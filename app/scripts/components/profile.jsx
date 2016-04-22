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
          <a><img src={frameImage.url()} /></a>
          <p>{frameName}</p>
        </div>
      )
    })
    console.log("framsets", frames);

    //  var images = frames.get("Image");
    // var frameImage = images;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">

            <a href={"#frameselection"}>
              <h3 className="build-title">Build</h3>
              <img src="images/mechanic1.jpg" onClick={this.handleBuild} className="build-image" />
            </a>

            <div className="col-md-8 bikes-built">
              <h3>Your Built Bikes</h3>
              <a href="#bicycle">See Builds - {bikes.length}</a>
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
