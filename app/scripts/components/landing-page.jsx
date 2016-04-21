var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
var ParseReact = require('parse-react');
require('Backbone-React-Component');



var LandingPageComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],

  render: function(){
    return (
      <div className="container-fluid" id="landing">
        <a href="#login">
          <div>
            <h1 className="app-title">Cycle Compatibility</h1>
            <h5 className="landing-caption">Click Here to Enter</h5>
          </div>
        </a>
        <div className="information-one">
          <div className="catagory-icon"></div>
          <div className="catagory-container">
            <h3 className="catagory-title">Building</h3>
          </div>
        </div>
        <div className="information-two">
          <div className="catagory-icon"></div>
          <div className="catagory-container">
            <h3 className="catagory-title">Compatibility</h3>
          </div>
        </div>
        <div className="information-three">
          <div className="catagory-icon"></div>
          <div className="catagory-container">
            <h3 className="catagory-title">Adding</h3>
          </div>
        </div>
      </div>
    )
  }
})

//exports
module.exports = {
  'LandingPageComponent': LandingPageComponent
}
