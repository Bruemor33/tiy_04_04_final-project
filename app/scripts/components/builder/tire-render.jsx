var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
var ParseReact = require('parse-react');
require('Backbone-React-Component');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');



var TireDisplayComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],

  getInitialState: function(){
    return {
      Tires: []
    }
  },

  // console.log(this.props.framesets);

  render: function(){

    // console.log("wheelsets ", this.state.WheelSets);

    if(!this.props.Tires){
      return (<h1>Loading</h1>)
    }

    return (
      <div className="stem-display-container">
        <div className="stem-caption">
          <p className="image-caption" value={this.props.Tires.id}>{this.props.Tires.get("name")}</p>
        </div>
      </div>
    )
  }
});


//Exports
module.exports = {
  'TireDisplayComponent': TireDisplayComponent
}
