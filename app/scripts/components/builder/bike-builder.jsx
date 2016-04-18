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

//Local Imports
var BaseDisplayComponent = require('./base-display-render.jsx').BaseDisplayComponent;

var BottomBracketDisplayComponent = require('./bottombracket-relation.jsx').BottomBracketDisplayComponent;
var HeadsetDisplayComponent = require('./headset-relation.jsx').HeadsetDisplayComponent;
var SeatpostDisplayComponent = require('./seatpost-relation.jsx').SeatpostDisplayComponent;

var SelectedFrameComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],

//I need to grab the initial state from the selection.
  getInitialState: function(){
    return {
      // FrameSet: {}
      BottomBracket: [],
      relatedBottomBrackets: [],
      relatedHeadsets: [],
      relatedSeatposts: [],
      Tires: []
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
    //queryFrames.include("BottomBracket")
    queryFrames.get(selectedFrame).then(function(FrameSet){
      var relation = FrameSet.relation("BottomBracket");
      var query = relation.query();
      var headsetRelation = FrameSet.relation("HeadSet");
      var headsetQuery = headsetRelation.query();
      var seatpostRelation = FrameSet.relation("SeatPost");
      var seatpostQuery = seatpostRelation.query();
      var Stems = Parse.Object.extend("Stems");
      var queryStem = new Parse.Query( Stems );
      var WheelSets = Parse.Object.extend("WheelSets");
      var queryWheels = new Parse.Query( WheelSets );
      var Tires = Parse.Object.extend("Tires");
      var queryTires = new Parse.Query( Tires );

      var p1 = Parse.Promise.when([query.find(), headsetQuery.find(), seatpostQuery.find(),
                                   queryStem.find(), queryWheels.find(), queryTires.find()])
        .then(function(results){
          try {
            self.setState({
              "relatedBottomBrackets": results[0],
              "relatedHeadsets": results[1],
              "relatedSeatposts": results[2],
              "FrameSet": FrameSet,
              "Stems": results[3],
              "WheelSets": results[4],
              "Tires": results[5]
            });
          } catch(e) {
            console.log(e)
          }
          console.log("all promises fired!");
        });
    },function(error){
      console.log(error);
    })

  },

  render: function(){

    // var FrameSet = this.props.framesetId;

    // var images = FrameSets.get("Image");
    // var frameImage = images;
    console.log(this.state);
    if(!this.state.FrameSet){
      return (<h1>Loading</h1>)
    }

    var image = this.state.FrameSet.get("Image");
    var frameImage = image;

    var baseDisplay = function(item){
      return (
        <div key={item.objectId}>
          <BaseDisplayComponent item={item}/>
        </div>
      )
    }

    var newBottombracketDisplay = function(BottomBracket){
      return (
        <div key={BottomBracket.objectId}>
          <BottomBracketDisplayComponent BottomBracket={BottomBracket} />
        </div>
      )
    }

    var newHeadsetDisplay = function(HeadSet){
      return (
        <div key={HeadSet.objectId}>
          <HeadsetDisplayComponent HeadSet={HeadSet} />
        </div>
      )
    }

    var newSeatpostDisplay = function(SeatPost){
      return (
        <div key={SeatPost.objectId}>
          <SeatpostDisplayComponent SeatPost={SeatPost} />
        </div>
      )
    }

    //I have to grab the relation on the frame. So I think I should just start with the three parts that have a relation to the frame
    //Once those parts have beed selected they will have relations on them and we will have to grab the parts they relate to.
    //Once all relational parts have been chosen the user will be allowed to choose global parts.
    return (
      <div className="builder col-md-12">
        <div className="add-frame-checkbox-labels col-md-6">
          <img className="frame-image" src={frameImage.url()} alt="" />
          <p className="frame-name-caption">{this.state.FrameSet.get("name")}</p>
        </div>
        <div className="compatible-parts col-md-6">
          {this.state.relatedBottomBrackets.map(newBottombracketDisplay.bind(this))}
          {this.state.relatedHeadsets.map(newHeadsetDisplay.bind(this))}
          {this.state.relatedSeatposts.map(newSeatpostDisplay.bind(this))}
          {this.state.Stems.map(baseDisplay.bind(this))}
          {this.state.WheelSets.map(baseDisplay.bind(this))}
          {this.state.Tires.map(baseDisplay.bind(this))}
        </div>
      </div>
    )
  }
});


//Exports
module.exports = {
  'SelectedFrameComponent': SelectedFrameComponent
}
