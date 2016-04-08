var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
var ParseReact = require('parse-react');
require('Backbone-React-Component');

//I guess this will be more of a "controller" component?

//Local Inports
var Navigation = require('./header.jsx').Navigation;
var HomePageComponent = require('./signup.jsx').HomePageComponent;
var ProfileComponent = require('./profile.jsx').ProfileComponent;
var AdminFormComponent = require('./admin.jsx').AdminFormComponent;
var BottomBracketForm = require('./partforms/bottombracket.jsx').BottomBracketForm;
var HeadsetForm = require('./partforms/headsetform.jsx').HeadsetForm;
var SeatpostForm = require('./partforms/seatpost.jsx').SeatpostForm;

$(function(){
  Parse.initialize("bikebuilder");
  Parse.serverURL = "http://bikebuilders3.herokuapp.com/";
});

var ControllerComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],

  getInitialState: function(){
    return {
      router: this.props.router,
      userId: null
    };
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
  setUser: function(user){
    this.setState({"userId": user.id});
  },
  render: function(){
    var body;
    console.log(this.state.router);
    if(this.state.router.current == "index"){
      body = (<div>Index</div>);
    }
    if(this.state.router.current == "home"){
      body = (<HomePageComponent />)
    }
    if(this.state.router.current == "profile"){
      body = (<ProfileComponent setUser={this.setUser}/>)
    }
    if(this.state.router.current == "admin"){
      body = (<AdminFormComponent />)
    }
    if(this.state.router.current == "bb"){
      body = (<BottomBracketForm />)
    }
    if(this.state.router.current == "headset"){
      body = (<HeadsetForm />)
    }
    if(this.state.router.current == "seatpost"){
      body = (<SeatpostForm />)
    }
    if(this.state.router.current == "notFound"){
      body = (<div><h1>404 Page Not Found!!</h1></div>)
    }
    return(
      <div>
        <Navigation />
        {body}
      </div>
    )
  }
});

//Exports
module.exports = {
  'ControllerComponent': ControllerComponent
}
