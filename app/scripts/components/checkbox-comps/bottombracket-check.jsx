var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
var ParseReact = require('parse-react');
require('Backbone-React-Component');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');



var BbSelectionComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],
  handleSelection: function(e){
    var selected = e.target.checked;
    console.log('bottom bracket input:', e.target);
    console.log('bottom bracket checked:', e.target.checked);
    this.props.handleBracketSelection(this.props.bracket, selected);
  },
  render: function(){
    // console.log(this.props.bracket);
    return (
      <div className="checkbox col-md-6">
        <label className="add-frame-checkbox-labels">
          <input type="checkbox" onChange={this.handleSelection} value={this.props.bracket.id} />{this.props.bracket.get("name")}
        </label>
      </div>
    )
  }
})

//Exports
module.exports = {
  'BbSelectionComponent': BbSelectionComponent
}
