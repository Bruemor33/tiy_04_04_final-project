var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
var ParseReact = require('parse-react');
require('Backbone-React-Component');




var BuilderComponent = React.CreateClass({
  mixins: [Backbone.React.Component.mixin],

  render: function(){
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <div className="bike-box"></div>
            <button type="button"></button>
          </div>
        </div>
      </div>
    )
  }
})


//Exports
module.exports = {
  'BuilderComponent': BuilderComponent
}
