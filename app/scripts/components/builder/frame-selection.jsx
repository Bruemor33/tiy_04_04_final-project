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
var SelectedFrameComponent = require('./bike-builder.jsx').SelectedFrameComponent;


var BuilderComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],

  getInitialState: function(){
    return {
      FrameSets: [],
      frameset: {},
      selectedFrame: []
    }
  },

  componentWillMount: function(){
    var self = this;
    var FrameSets = Parse.Object.extend("frameSets");
    var queryFrames = new Parse.Query( FrameSets );
    queryFrames.find().then(function(FrameSets){
      // console.log(FrameSets);
      self.setState({"FrameSets": FrameSets});
    }, function(error){
      console.log(error);
    });
  },

  handleFrameSelection: function(FrameSets, selected){
    var selectedFrame = this.state.selectedFrame;
    if(selected){
      selectedFrame.push(FrameSets);
    }
    this.setState({'selectedFrame': selectedFrame});


  },

  render: function(){

    var newFrameDisplay = function(FrameSets){
      return (
        <div key={FrameSets.objectId}>
          <FrameDisplayComponent handleFrameSelection={this.handleFrameSelection} FrameSets={FrameSets}/>
        </div>
      )
    };
    //
    // var selectedFrameDisplay = function(selectedFrame){
    //   return (
    //     <div>
    //       <SelectedFrameComponent selectedFrame={selectedFrame} />
    //     </div>
    //   )
    // }
    //
    // var body;
    // if(this.state.selectedFrame == null){
    //   body = (
    //     <div>
    //       {this.state.FrameSets.map(newFrameDisplay.bind(this))}
    //     </div>
    //   )
    // }else{
    //   body = (
    //     <div>
    //       {this.props.selectedFrameDisplay}
    //     </div>
    //   )
    // };

    // console.log(selectedFrame);

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="bike-box"></div>
            <h1 className="frames">Frameset Selection</h1>
            <div className="frame-display">
              {this.state.FrameSets.map(newFrameDisplay.bind(this))}
            </div>
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
