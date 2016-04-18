var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
var ParseReact = require('parse-react');
require('Backbone-React-Component');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');



var SeatpostDisplayComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],

  getInitialState: function(){
    return {
      SeatPosts: []
    }
  },

  // console.log(this.props.framesets);

  render: function(){

    // console.log("bottom ", this.props.BottomBracket);

    if(!this.props.SeatPost){
      return (<h1>Loading</h1>)
    }

    return (
      <div className="stem-display-container">
        <div className="tire-caption">
          <p className="tire-name" value={this.props.SeatPost.id}>{this.props.SeatPost.get("name")}</p>
        </div>
      </div>
    )
  }
});


//Exports
module.exports = {
  'SeatpostDisplayComponent': SeatpostDisplayComponent
}
