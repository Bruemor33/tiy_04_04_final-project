var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
var ParseReact = require('parse-react');
require('Backbone-React-Component');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');

var BuildDetailComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],

  render: function(){
    console.log(this.state.router);

    return (
      <div>
        <h1>Hello World</h1>
      </div>
    )
  }
})

//exports
module.exports = {
  'BuildDetailComponent': BuildDetailComponent
}
