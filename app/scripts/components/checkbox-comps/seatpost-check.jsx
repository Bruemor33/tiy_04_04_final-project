var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
var ParseReact = require('parse-react');
require('Backbone-React-Component');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');



var SeatpostSelectionComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],

  getInitialState: function(){
    return {
      addedSeatpost: this.props.addedSeatpost
    }
  },
  handleSelection: function(e){
    var selected = e.target.selected;
    console.log(selected);
    this.props.handleSelection(this.props.seatPost, selected);
  },
  render: function(){
    return (
      <div className="checkbox col-md-6">
        <label className="add-frame-checkbox-labels">
          <input type="checkbox" onChange={this.handleSelection} value={this.props.seatPost.id} />{this.props.seatPost.get("name")}
        </label>
      </div>
    )
  }
});


//Exports
module.exports = {
  'SeatpostSelectionComponent': SeatpostSelectionComponent
}
