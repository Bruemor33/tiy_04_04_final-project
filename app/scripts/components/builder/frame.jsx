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

  // console.log(this.props.framesets);

  handleSelection: function(e){
    var selected = e.target.selection;
    console.log(selected);

    this.props.handleFrameSelection(this.props.selectedFrame, selected);
    // Backbone.history.navigate("bicycle", {trigger: true})
  },

  render: function(){


    var FrameSets = this.props.FrameSets;

    var images = FrameSets.get("Image");
    var frameImage = images;

    return (
      <div className="frame-display-container col-md-6">
        <div className="frame-button-and-caption">
          <a  className="frame-button" href={"#bicycle/" + this.props.FrameSets.id}>
            <img className="frame-image" src={frameImage.url()} alt="" />
          </a>
          <p className="image-caption" value={this.props.FrameSets.id}>{this.props.FrameSets.get("name")}</p>
        </div>
      </div>
    )
  }
});


//Exports
module.exports = {
  'FrameDisplayComponent': FrameDisplayComponent
}
