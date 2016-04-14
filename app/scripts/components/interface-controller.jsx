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
var BuilderComponent = require('./builder/frame-selection.jsx').BuilderComponent;
var SelectedFrameComponent = require('./builder/bike-builder.jsx').SelectedFrameComponent;
var AdminFormComponent = require('./admin.jsx').AdminFormComponent;
var BottomBracketForm = require('./partforms/bottombracket.jsx').BottomBracketForm;
var HeadsetForm = require('./partforms/headsetform.jsx').HeadsetForm;
var SeatpostForm = require('./partforms/seatpost.jsx').SeatpostForm;
var ChainFormComponent = require('./partforms/chain-form.jsx').ChainFormComponent;
var ChainRingFormComponent = require('./partforms/chainring-form.jsx').ChainRingFormComponent;
var HubFormComponent = require('./partforms/hub-form.jsx').HubFormComponent;
var RimComponentForm = require('./partforms/rim-form.jsx').RimComponentForm;
var TireComponentForm = require('./partforms/tire-form.jsx').TireComponentForm;
var WheelSetFormComponent = require('./partforms/wheelset-form.jsx').WheelSetFormComponent;
var ClipFormComponent = require('./partforms/clip-form.jsx').ClipFormComponent;
var PedalFormComponent = require('./partforms/pedal-forms.jsx').PedalFormComponent;
var StemFormComponent = require('./partforms/stem-form.jsx').StemFormComponent;
var HandlebarFormComponent = require('./partforms/handlebar-form.jsx').HandlebarFormComponent;
var CranksetFormComponent = require('./partforms/crankset-form.jsx').CranksetFormComponent;
var SaddleFormComponent = require('./partforms/saddle-form.jsx').SaddleFormComponent;

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
    if(this.state.router.current == "frameselection"){
      body = (<BuilderComponent setUser={this.setUser} />)
    }
    if(this.state.router.current == "bicycle"){
      body = (<SelectedFrameComponent setUser={this.setUser} />)
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
    if(this.state.router.current == "chain"){
      body = (<ChainFormComponent />)
    }
    if(this.state.router.current == "chainring"){
      body = (<ChainRingFormComponent />)
    }
    if(this.state.router.current == "hub"){
      body = (<HubFormComponent />)
    }
    if(this.state.router.current == "rim"){
      body = (<RimComponentForm />)
    }
    if(this.state.router.current == "wheel"){
      body = (<WheelSetFormComponent />)
    }
    if(this.state.router.current == "tire"){
      body = (<TireComponentForm />)
    }
    if(this.state.router.current == "clip"){
      body = (<ClipFormComponent />)
    }
    if(this.state.router.current == "pedal"){
      body = (<PedalFormComponent />)
    }
    if(this.state.router.current == "stem"){
      body = (<StemFormComponent />)
    }
    if(this.state.router.current == "handle"){
      body = (<HandlebarFormComponent />)
    }
    if(this.state.router.current == "cranks"){
      body = (<CranksetFormComponent />)
    }
    if(this.state.router.current == "saddle"){
      body = (<SaddleFormComponent />)
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
