var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
var ParseReact = require('parse-react');
require('Backbone-React-Component');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');



var FrameDisplayComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],
  // handleSelection: function(e){
  //   var selected = e.target.checked;
  //   console.log(selected);
  //   this.props.handleChainringSelection(this.props.chainrings, selected);
  // },

  // console.log(this.props.framesets);

  render: function(){

    console.log(this.props.FrameSets);
    var FrameSets = this.props.FrameSets;

    var images = FrameSets.get("Image");
    var frameImage = images;

    return (
      <div className="checkbox col-md-6">
        <ul className="add-frame-checkbox-labels">
          <img className="frame-image" src={frameImage.url()} alt="" />
          <li value={this.props.FrameSets.id} />{this.props.FrameSets.get("name")}
        </ul>
      </div>
    )
  }
});


//Exports
module.exports = {
  'FrameDisplayComponent': FrameDisplayComponent
}
