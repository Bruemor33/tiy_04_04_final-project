var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
require('backbone-react-component');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');
var ParseReact = require('parse-react');



//Local Imports
var LandingComponent = require('./landing.jsx').LandingComponent;
var Navigation = require('./header.jsx').Navigation;

//Components
var MainComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  getInitialState: function(){
    return {
      router: this.props.router
    }
  },
  componentWillMount: function(){
    this.callback = (function(){
      this.forceUpdate();
    }).bind(this);
    this.state.router.on('route', this.callback);
  },
  componentWillUnmount: function(){
    this.state.router.off('route', this.callback);
  },
  render: function(){
    console.log(this.props.router);
    return (
      <div>
        <Navigation />
        <LandingComponent router={this.state.router} />
      </div>
    )
  }
});


//Exports
module.exports = {
  'MainComponent': MainComponent
}
