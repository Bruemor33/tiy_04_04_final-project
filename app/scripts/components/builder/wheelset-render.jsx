var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
var ParseReact = require('parse-react');
require('Backbone-React-Component');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');



var WheelSetDisplayComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],

  getInitialState: function(){
    return {
      WheelSets: []
    }
  },

  // console.log(this.props.framesets);

  render: function(){

    // console.log("wheelsets ", this.state.WheelSets);

    if(!this.props.WheelSets){
      return (<h1>Loading</h1>)
    }

    return (
      <div className="stem-display-container">
        <div className="stem-caption">
          <p className="image-caption" value={this.props.WheelSets.id}>{this.props.WheelSets.get("name")}</p>
        </div>
      </div>
    )
  }
});


//Exports
module.exports = {
  'WheelSetDisplayComponent': WheelSetDisplayComponent
}
