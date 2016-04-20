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
      Tires: [],
      Pedals: [],
      'selectedItem': []
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
      var Pedals = Parse.Object.extend("Pedals");
      var queryPedals = new Parse.Query( Pedals );
      var Cranksets = Parse.Object.extend("Cranksets");
      var queryCranks = new Parse.Query( Cranksets );
      var Chainrings = Parse.Object.extend("ChainRings");
      var queryChainrings = new Parse.Query( Chainrings );
      var Handlebars = Parse.Object.extend("HandleBars");
      var queryBars = new Parse.Query( Handlebars );
      var Saddles = Parse.Object.extend("Saddles");
      var querySaddles = new Parse.Query( Saddles );

      var p1 = Parse.Promise.when([query.find(), headsetQuery.find(), seatpostQuery.find(),
      queryStem.find(), queryWheels.find(), queryTires.find(), queryPedals.find(), queryCranks.find(),
      queryChainrings.find(), queryBars.find(), querySaddles.find(), queryFrames.get(selectedFrame)])
        .then(function(results){

          try {
            self.setState({
              "relatedBottomBrackets": results[0],
              "relatedHeadsets": results[1],
              "relatedSeatposts": results[2],
              "FrameSet": FrameSet,
              "Stems": results[3],
              "WheelSets": results[4],
              "Tires": results[5],
              "Pedals": results[6],
              "Cranksets": results[7],
              "Chainrings": results[8],
              "Handlebars": results[9],
              "Saddles": results[10]
            });
          } catch(e) {
            // console.log(e)
          }
          console.log("all promises fired!");
        });
    },function(error){
      console.log(error);
    })

  },

  filterSelectedItems: function(){
    var selectedResults = _find(selectedItem, function(item){
      return item.selectedItem.id;
    })
  },

  handleSubmit: function(e){
    e.preventDefault();
    console.log("clicked");
    var Bicycle = Parse.Object.extend("Bicycle");
    var newBicycle = new Bicycle();
    newBicycle.set({
      'frame': this.state.FrameSet,
      'components': this.state.selectedItem
    });
    newBicycle.save(null, {
      success: function(bicycle){
        var user = Parse.User.current();
        var userBikes = user.get("userBikes");
        if(userBikes === undefined){
          userBikes = []
        }
        userBikes.push(bicycle);
        user.set("userBikes", userBikes);
        // userBikes.push(["joel", "likes", "potatoes"]);
        user.save().then(function(savedUser){
          console.log(savedUser);
        });
        setTimeout(function() {
          Backbone.history.navigate("profile", {trigger: true});
        }, 5000);

        console.log("You pushed successfully!");
      },
      error: function(user, error){
        alert("Error" + error.code + " " + error.message);
      }
    })
  },

  grabSelection: function(selected){
    console.log(this.state.selectedItem);
    var selectedItem = this.state.selectedItem;
    selectedItem.push(selected);
    this.setState({"selectedItem": selectedItem});
    console.log(this.state.selectedItem);
  },

  render: function(){

    if(!this.state.FrameSet){
      return (<h1>Loading</h1>)
    }

    console.log(this.state.FrameSet);

    var image = this.state.FrameSet.get("Image");
    var frameImage = image;

    var baseDisplay = function(item){
      return (
        <div key={item.objectId}>
          <BaseDisplayComponent grabSelection={this.grabSelection} item={item}/>
        </div>
      )
    }

    var bracketRelationDisplay = function(Cranksets){
      return (
        <div key={Cranksets.objectId}>
          <BottomBracketDisplayComponent Cranksets={Cranksets} />
        </div>

      )
    }


    var bikeComponents = this.state.selectedItem.map(function(item){
      return (
        <tbody>
          <tr className="build-table">
            <td className="build-item-name">{item.get('name')}</td>
            <td className="build-item-price">{item.get('price')}</td>
          </tr>
        </tbody>
      )
    });

    //I have to grab the relation on the frame. So I think I should just start with the three parts that have a relation to the frame
    //Once those parts have beed selected they will have relations on them and we will have to grab the parts they relate to.
    //Once all relational parts have been chosen the user will be allowed to choose global parts.
    return (
      <div className="builder col-md-12">
        <div className="add-parts-form col-md-6">
          <img className="frame-image" src={frameImage.url()} alt="" />
          <p className="frame-name-caption">{this.state.FrameSet.get("name")}</p>
          <div id="build-list" className="current-build-list ">
            <table id="build-items-table-container">
              {bikeComponents}
            </table>
          </div>
          <button type="submit" onClick={this.handleSubmit} form="add-parts-form" id="add-frame-form-button" className="btn btn-primary ">push</button>
        </div>
        <div className="compatible-parts col-md-6">
          <div>
            <h3>Bottom Brackets</h3>
            {this.state.relatedBottomBrackets.map(baseDisplay.bind(this))}
          </div>
          <div>
            <h3>Cranksets</h3>
            {this.state.Cranksets.map(baseDisplay.bind(this))}
          </div>
          <div>
            <h3>Chainrings</h3>
            {this.state.Chainrings.map(baseDisplay.bind(this))}
          </div>
          <div>
            <h3>Headsets</h3>
            {this.state.relatedHeadsets.map(baseDisplay.bind(this))}
          </div>
          <div>
            <h3>Seatposts</h3>
            {this.state.relatedSeatposts.map(baseDisplay.bind(this))}
          </div>
          <div>
            <h3>Saddles</h3>
            {this.state.Saddles.map(baseDisplay.bind(this))}
          </div>
          <div>
            <h3>Stems</h3>
            {this.state.Stems.map(baseDisplay.bind(this))}
          </div>
          <div>
            <h3>Handlebars</h3>
            {this.state.Handlebars.map(baseDisplay.bind(this))}
          </div>
          <div>
            <h3>Wheelsets</h3>
            {this.state.WheelSets.map(baseDisplay.bind(this))}
          </div>
          <div>
            <h3>Tires</h3>
            {this.state.Tires.map(baseDisplay.bind(this))}
          </div>
          <div>
            <h3>Pedals</h3>
            {this.state.Pedals.map(baseDisplay.bind(this))}
          </div>
        </div>
      </div>
    )
  }
});


//Exports
module.exports = {
  'SelectedFrameComponent': SelectedFrameComponent
}
