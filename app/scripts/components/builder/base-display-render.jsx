var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
var ParseReact = require('parse-react');
require('Backbone-React-Component');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');


var BaseDisplayComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],

  getInitialState: function(){
    return {
      item: [],
      selectedItem: []
    }
  },

  // console.log(this.props.framesets);
  handleClick: function(e) {
    e.preventDefault();
    var selected = this.props.item;
    this.props.grabSelection(selected)
    console.log(selected);
  },
  render: function(){

    // console.log("stems ", this.state.Stems);

    if(!this.props.item){
      return (<h1>Loading</h1>)
    }

    return (
      <div className="item-display-container" >
        <div className="item-caption">
          <p className="item-name" onClick={this.handleClick} value={this.props.item.id}>{this.props.item.get("name")}</p>
        </div>
      </div>
    )
  }
});


//Exports
module.exports = {
  'BaseDisplayComponent': BaseDisplayComponent
}
