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

    var builtBikes = bikes.map(function(bike, index){
      var frame = bike.get('frame');
      var frameImage = frame.get('Image');
      var picUrl = frameImage.url();

      return (
        <li key={bike.id}>
          <h4>{bike.get('name')}</h4>
          <img src={picUrl}/>
        </li>
      );
    });

    if(builtBikes.length == 0){
      builtBikes = (<li>You Don&quot;t Have Any Bikes Yet</li>);
    }

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
              <ul>
                {builtBikes}
              </ul>
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
