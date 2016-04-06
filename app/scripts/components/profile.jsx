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

  handleBuild: function(e){
    e.preventDefault();
    Backbone.history.navigate("builder", {trigger: true});
  },

  render: function(){
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <button type="button" onChange={this.handleBuild} className="btn btn-secondary">Build</button>
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
