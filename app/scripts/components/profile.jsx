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
      'frameSet': [],
      'Bikes': []
    }
  },

  componentDidMount: function(){
    var self = this
    var user = this.props.user;
    var query = new Parse.Query( user );
    query.include("userBikes");
    // query.containedIn("userBikes", "frame");
    query.find().then(function(user){
      // console.log(user);
      self.setState({"Bikes": user})
    }, function(error){
      console.log(error);
    })


    var bikes = this.props.user.get('userBikes');
    if (bikes == undefined){
      bikes = []
    }else{
      console.log(bikes);
      var bikeArray = bikes.map(function(bike){
        console.log("bike, ", bike);
        var frames = bike.get('frame');
        console.log("frames, ", frames);
        // frames.map(function(frames){
        //   console.log(frames);
        // })
        var Image = frame.get('Image');
        console.log(Image);
        var url = Image.url();
        console.log(url);
      });
    }

    // var frameSetId = "kyyH8a27q5"
    // var frameSet = Parse.Object.extend("frameSets");
    // var query = new Parse.Query( frameSet );
    // query.get(frameSetId).then(function(frameSet){
    //   self.setState({'frameSet': frameSet});
    // })
  },

  handleBuild: function(event){
    event.preventDefault();
    Backbone.history.navigate("frameselection", {trigger: true});
  },

  render: function(){
    // console.log(user.current);
    console.log(this.props.user);

    // var bikes = this.props.Bikes;
    // var image = bikes.get("Image");
    // var frameImage = image;



    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <a href={"#frameselection"}>
              <h3 className="build-title">Build</h3>
              <img src="images/mechanic1.jpg" onClick={this.handleBuild} className="build-image" />
            </a>
            <div className="col-md-8 bikes-built">

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
