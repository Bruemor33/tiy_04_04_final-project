var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
var ParseReact = require('parse-react');
require('Backbone-React-Component');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');



//This component needs to act as a render page for the selected Frame
//This is where the selected frame will be displayed with the list of relational parts to the right.
//When a relational part is selected it will update within a list under the frame.

var SelectedFrameComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],

//I need to grab the initial state from the selection.
  getInitialState: function(){
    return {
      // FrameSet: {}
    }
  },

//So now we have a query into the actual framesets.
  componentWillMount: function(){
    //Possibly have to query the components I want to be choosing.

    //frame query
    //use get() here in order to grab the single frame id.
    var self = this;
    var selectedFrame = this.props.framesetId;
    var FrameSet = Parse.Object.extend("frameSets");
    var queryFrames = new Parse.Query( FrameSet );
    queryFrames.get(selectedFrame).then(function(FrameSet){
      self.setState({'FrameSet': FrameSet})
      console.log(FrameSet);
    }, function(error){
      console.log(error);
    });

    //bottom bracket query
    var BottomBrackets = Parse.Object.extend("BottomBracket");
    var queryBottomBracket = new Parse.Query( BottomBrackets );
    queryBottomBracket.find().then(function(BottomBrackets){
      self.setState({'BottomBrackets': BottomBrackets})
    }, function(error){
      console.log(error);
    });

    //headset query
    var Headsets = Parse.Object.extend("HeadSet");
    var queryHeadsets = new Parse.Query( Headsets );
    queryHeadsets.find().then(function(Headsets){
      self.setState({'Headsets': Headsets})
    }, function(error){
      console.log(error);
    });

    //Seatpost query
    var Seatpost = Parse.Object.extend("SeatPost");
    var querySeatpost = new Parse.Query( Seatpost );
    querySeatpost.find().then(function(Seatpost){
      self.setState({'Seatpost': Seatpost})
    }, function(error){
      console.log(error);
    });
  },

  render: function(){

    // var FrameSet = this.props.framesetId;

    console.log(this.state.FrameSet);

    // var images = FrameSets.get("Image");
    // var frameImage = images;
    if(!this.state.FrameSet){
      return (<h1>Loading</h1>)
    }

    var image = this.state.FrameSet.get("Image");
    var frameImage = image;

    //I have to grab the relation on the frame. So I think I should just start with the three parts that have a relation to the frame
    //Once those parts have beed selected they will have relations on them and we will have to grab the parts they relate to.
    //Once all relational parts have been chosen the user will be allowed to choose global parts.
    return (
      <div className="checkbox col-md-8">
        <div className="add-frame-checkbox-labels">
          <img className="frame-image" src={frameImage.url()} alt="" />
          <p>{this.state.FrameSet.get("name")}</p>
        </div>
        <div className="compatible-parts">
          <p></p>
        </div>
      </div>
    )
  }
});


//Exports
module.exports = {
  'SelectedFrameComponent': SelectedFrameComponent
}
