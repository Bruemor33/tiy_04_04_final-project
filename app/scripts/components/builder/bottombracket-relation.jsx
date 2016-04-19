var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
var ParseReact = require('parse-react');
require('Backbone-React-Component');
var LinkedStateMixin = require('react/lib/LinkedStateMixin');



var BottomBracketDisplayComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin, LinkedStateMixin],

  getInitialState: function(){
    return {
      BottomBrackets: [],
      Cranksets: []
    }
  },

  componentWillMount: function(){
    var BottomBracket = Parse.Object.extend( "BottomBracket" );
    var queryBracket = new Parse.Query();
    queryBracket.find().then(function(BottomBracket){
      var relation = BottomBracket.relation("Cranksets");
      var query = relation.query();
      var p1 = Parse.Promise.when(query.find()).then(function(results){
        self.setState({
          "Cranksets": results
        })
        console.log(this.state.Cranksets);
      })
    })
  },

  // console.log(this.props.framesets);

  render: function(){

    console.log("cranks ", this.state.Cranksets);

    if(!this.props.BottomBracket){
      return (<h1>Loading</h1>)
    }

    return (
      <div className="stem-display-container">
        <div className="tire-caption">
          <select className="tire-name" value={this.props.BottomBracket.id} name={this.props.BottomBracket.get("name")}>
            <option></option>
          </select>
        </div>
      </div>
    )
  }
});


//Exports
module.exports = {
  'BottomBracketDisplayComponent': BottomBracketDisplayComponent
}
