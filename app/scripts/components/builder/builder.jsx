var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
var ParseReact = require('parse-react');
require('Backbone-React-Component');


//Local Imports
var FrameDisplayComponent = require('./frame.jsx').FrameDisplayComponent;


var BuilderComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],

  getInitialState: function(){
    return {
      FrameSets: []
    }
  },

  componentWillMount: function(){
    var self = this;
    var FrameSets = Parse.Object.extend("frameSets");
    var queryFrames = new Parse.Query( FrameSets );
    queryFrames.find().then(function(FrameSets){
      console.log(FrameSets);
      self.setState({"FrameSets": FrameSets});
    }, function(error){
      console.log(error);
    });
  },

  render: function(){


    var newFrameDisplay = function(FrameSets){
      return (
        <div key={FrameSets.objectId}>
          <FrameDisplayComponent FrameSets={FrameSets}/>
        </div>
      )
    }

    // console.log(frames);

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <div className="bike-box"></div>
            <h1>hello world</h1>
            <div>
              {this.state.FrameSets.map(newFrameDisplay.bind(this))}
            </div>
            <button type="button"></button>
          </div>
        </div>
      </div>
    )
  }
})


//Exports
module.exports = {
  'BuilderComponent': BuilderComponent
}
