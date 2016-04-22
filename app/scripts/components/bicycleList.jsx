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


var BicycleListComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  getInitialState: function(){
    return {
      'frameSet': [],
      'bikes': []
    }
  },
  componentDidMount: function(){
    var self = this;
    var query = new Parse.Query(Parse.User);

    query.include("userBikes").include('userBikes.frame');

    query.get(Parse.User.current().id).then(function(user){
      self.setState({"bikes": user.get('userBikes').reverse()})
    }, function(error){
      console.log(error);
    });
  },
  handleBuild: function(event){
    event.preventDefault();
    Backbone.history.navigate("frameselection", {trigger: true});
  },
  render: function(){
    var bikes = this.state.bikes;
    console.log(bikes);
    var builtBikes = bikes.map(function(bike, index){
      var frame = bike.get('frame');
      console.log(frame.id);
      var frameImage = frame.get('Image');
      var picUrl = frameImage.url();

      return (
        <div className="frame-display-container col-md-6" key={frame.objectid}>
          <div className="frame-button-and-caption">
            <a className="frame-button" href={"#yourbikes/" + frame.id}>
              <img className="frame-image" src={picUrl} alt="" />
            </a>
            <p className="image-caption">{bike.get("name")}</p>
          </div>
        </div>
      );
    });

    if(builtBikes.length == 0){
      builtBikes = (<span>You Don&quot;t Have Any Bike Builds Yet</span>);
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="bike-box"></div>
            <h1 className="frames">Your Builds</h1>
            <div className="frame-display">
              {builtBikes}
            </div>
          </div>
        </div>
      </div>
    )
  }
});


//Exports
module.exports = {
  'BicycleListComponent': BicycleListComponent
}
