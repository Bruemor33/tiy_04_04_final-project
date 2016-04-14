var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
var ParseReact = require('parse-react');
require('Backbone-React-Component');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');



var ChainringSelectionComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],
  handleSelection: function(e){
    var selected = e.target.checked;
    console.log(selected);
    this.props.handleChainringSelection(this.props.chainrings, selected);
  },
  render: function(){
    return (
      <div className="checkbox col-md-6">
        <label className="add-frame-checkbox-labels">
          <input type="checkbox" onChange={this.handleSelection} value={this.props.chainrings.id} />{this.props.chainrings.get("name")}
        </label>
      </div>
    )
  }
});


//Exports
module.exports = {
  'ChainringSelectionComponent': ChainringSelectionComponent
}
