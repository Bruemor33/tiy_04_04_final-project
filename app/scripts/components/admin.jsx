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

//Testing Parse Data.
// var Frames = Parse.Object.extend("Frames");
// var frameSet = new Parse.Query( Frames );
// frameSet.find().then(function(mod){
//   console.log(mod);
//   self.setState({"frameSet": mod});
// }, function(error){
//   console.log(error);
// });

//Local Imports
var BbSelectionComponent = require('./checkbox-comps/bottombracket-check.jsx').BbSelectionComponent;
var HeadsetSelectionComponent = require('./checkbox-comps/headset-check.jsx').HeadsetSelectionComponent;
var SeatpostSelectionComponent = require('./checkbox-comps/seatpost-check.jsx').SeatpostSelectionComponent;


var AdminFormComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],

  getInitialState: function(){
    return{
      Name: "",
      price: 0,
      material: "",
      headset: "",
      seatTube: 0,
      color: "",
      url: "",
      bottomBracket: [],
      addedBracket: [],
      headset: [],
      addedHeadset: [],
      seatpost: [],
      addedSeatpost: []
    }
  },
  componentWillMount: function(){
    var self = this;
    var BottomBracket = Parse.Object.extend("bottomBracket");
    var query = new Parse.Query( BottomBracket );
    query.find().then(function(bottomBracket){
      console.log(bottomBracket);
      self.setState({"bottomBracket": bottomBracket});
    }, function(error){
      console.log(error);
    });

  },
  handleBracketSelection: function(bracket, checked){
    var addedBracket = this.state.addedBracket;

    if(checked){
      addedBracket.push(bracket);
    }else{
      for(var i = 0; i < addedBracket.length; i++){
        if(addedBracket[i] == bracket){
          addedBracket.splice(i, 1);
        }
      }
    }
  },
  handleHeadsetSelection: function(headset, checked){
    var addedHeadset = this.state.addedHeadset;
    if(checked){
      addedHeadset.push(headset);
    }else{
      for(var i = 0; i < addedHeadset.length; i++){
        if(addedHeadset[i] == headset){
          addedBracket.splice(i, 1);
        }
      }
    }
  },
  handleSeatpostSelection: function(seatpost, checked){
    var addedSeatpost = this.state.addedSeatpost;
    if(checked){
      addedSeatpost.push(seatpost);
    }else{
      for(var i = 0; i < addedSeatpost.length; i++){
        if(addedSeatpost[i] == seatpost){
          addedSeatpost.splice(i, 1);
        }
      }
    }
  },
  // handleFile: function(e){
  //   e.preventDefault();
  //   var name = this.props.user.id + ".jpg" || ".png";
  //   var file = new Parse.File(name, e.target.files[0] );
  //   file.save().then(function(file){
  //     console.log(file);
  //     this.setState({image: file});
  //   }.bind(this),
  //   function(error){
  //     console.log('error saving file' error);
  //   });
  // },
  handleSubmit: function(e){
    e.preventDefault();
    var Frames = Parse.Object.extend("frameSets");
    var frames = new Frames();
    var newFrameData = {
      name: this.state.name,
      price: parseInt(this.state.price),
      material: this.state.material,
      headset: parseInt(this.state.headset),
      seatTube: parseInt(this.state.seatTube),
      color: this.state.color,
      url: this.state.url,
      // bottomBracket: ,
    };
    var bracketRelation = "hello";
    var relation = frames.relation("bottomBracket");
    relation.add();
    console.log(relation);
    frames.set(newFrameData);
    frames.save(null, {
      success: function(user){
        console.log("You pushed successfully");
      },
      error: function(user, error){
        alert("Error" + error.code + " " + error.message);
      }
    });
  },

  render: function(){

    // var fileDisplay;
    // if(this.state.image){
    //   fileDisplay = (
    //     <img src={this.state.image.url()} />
    //   );
    // }else{
    //   fileDisplay = (<input id="file-input" type="file" ref="fileInput"
    //   onChange={this.handleFile}
    //   )
    // }

    var newBottomBracket = function(bracket){
      return (
        <div key={bracket.objectId}>
          <BbSelectionComponent addedBracket={this.state.addedBracket} handleCheck={this.handleCheck} bracket={bracket}/>
        </div>
      )
    }
    var newHeadset = function(headSet){
      return (
        <div key={headSet.objectId}>
          <HeadsetSelectionComponent addedHeadset={this.state.addedHeadset} handleCheck={this.handleCheck} headSet={headSet}/>
        </div>
      )
    }
    var newSeatpost = function(seatPost){
      return (
        <div key={seatPost.objectId}>
          <SeatpostSelectionComponent addedSeatpost={this.state.addedSeatpost} handleCheck={this.handleCheck} seatPost={seatPost}/>
        </div>
      )
    }

    return (
      <div className="container-fluid col-md-12">
        <h2 className="add-component-heading text-center">Add Comp Here</h2>
        <form id="add-component-form" onSubmit={this.handleSubmit}>
          <div className="col-md-4">
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-frame-name">frame name</label>
              <input valueLink={this.linkState('name')} type="text" className="form-control" id="add-frame-name" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-frame-price">price</label>
              <input valueLink={this.linkState('price')} type="text" className="form-control" id="add-frame-price" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-frame-material">material</label>
              <input valueLink={this.linkState('material')} type="text" className="form-control" id="add-frame-material" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-frame-headset">headset</label>
              <input valueLink={this.linkState('headset')} type="text" className="form-control" id="add-frame-headset" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-frame-seatpost">seatpost</label>
              <input valueLink={this.linkState('seatpost')} type="text" className="form-control" id="add-frame-seatpost" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-frame-color">color</label>
              <input valueLink={this.linkState('color')} type="text" className="form-control" id="add-frame-color" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-frame-url">url</label>
              <input valueLink={this.linkState('url')} type="text" className="form-control" id="add-frame-url" />
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <label className="form-label" htmlFor="add-frame-image">image</label>
              <input valueLink={this.handleFile} type="file" name="newpload" className="form-control" id="add-frame-image" />
            </fieldset>
          </div>
          <div className="col-md-4">
            <fieldset className="form-group add-comp-form">
              <h3 className="component-title">Bottom Bracket</h3>
              <div className="col-md-12 add-comp-form-bottombracket-checklist">
                {this.state.bottomBracket.map(newBottomBracket.bind(this))}
              </div>
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <h3 className="component-title">Headset</h3>
              <div className="col-md-12 add-comp-form-headset-checklist">
                {this.state.headset.map(newHeadset.bind(this))}
              </div>
            </fieldset>
            <fieldset className="form-group add-comp-form">
              <h3 className="component-title">Seatpost</h3>
              <div className="col-md-12 add-comp-form-seatpost-checklist">
                {this.state.seatpost.map(newSeatpost.bind(this))}
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
  'AdminFormComponent': AdminFormComponent
}
