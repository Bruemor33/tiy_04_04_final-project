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
var LandingPageComponent = require('./landing-page.jsx').LandingPageComponent;
var HomePageComponent = require('./signup.jsx').HomePageComponent;
var ProfileComponent = require('./profile.jsx').ProfileComponent;
var BicycleListComponent = require('./bicycleList.jsx').BicycleListComponent;
var BuildDetailComponent = require('./build-detail.jsx').BuildDetailComponent;
var BuilderComponent = require('./builder/frame-selection.jsx').BuilderComponent;
var ComponentForms = require('./component-form-page.jsx').ComponentForms;
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


var ControllerComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],

  getInitialState: function(){
    return {
      router: this.props.router,
      //user: null
    };
  },
  checkUserLoggedIn: function(){
    var router = this.props.router;

    console.log('checkUserLoggedIn', Parse.User.current());

    if(Parse.User.current()){
        router.navigate('profile', {trigger: true})
    }
  },
  componentWillMount: function(){
    this.callback = (function(){
      this.forceUpdate();
    }).bind(this);
    this.state.router.on('route', this.callback);

    // var currentUser = Parse.User.current();
    //   if (currentUser){
    //     this.setState({'user': currentUser})
    //   }
  },
  componentWillUnmount: function(){
    this.state.router.off('route', this.callback);
  },

  // setUser: function(user){
  //   this.setState({"userId": user.id});
  // },

  render: function(){
    // console.log(this.state.user);
    var body;
    var navigation;

    if(this.state.router.current == "index"){
      body = (<LandingPageComponent />);
    }

    // Login Screen
    if(this.state.router.current == "home"){
      this.checkUserLoggedIn();
      body = (<HomePageComponent />)
    }

    if(this.state.router.current == "profile"){
      navigation = (<Navigation logout={this.logout}/>)
      body = (<ProfileComponent user={this.state.user}/>)
    }

    if(this.state.router.current == "components"){
      navigation = (<Navigation />)
      body = (<ComponentForms user={this.state.user} />)
    }

    if(this.state.router.current == "frameselection"){
      navigation = (<Navigation logout={this.logout}/>)
      body = (<BuilderComponent user={this.user} />)
    }
    if(this.state.router.current == "bicycle"){
      navigation = (<Navigation logout={this.logout}/>)
      body = (<SelectedFrameComponent user={this.user} framesetId={this.state.router.framesetId} />)
    }

    if(this.state.router.current == "bicycleList"){
      navigation = (<Navigation logout={this.logout}/>)
      body = (<BicycleListComponent user={this.user} />)
    }

    if(this.state.router.current == "bicycledetail"){
      navigation = (<Navigation logout={this.logout}/>)
      body = (<BicycleListComponent user={this.user} framesetId={this.state.router.framesetId} />)
    }

    if(this.state.router.current == "frame"){
      navigation = (<Navigation />)
      body = (<AdminFormComponent />)
    }
    if(this.state.router.current == "bottombracket"){
      navigation = (<Navigation />)
      body = (<BottomBracketForm />)
    }
    if(this.state.router.current == "headset"){
      navigation = (<Navigation />)
      body = (<HeadsetForm />)
    }
    if(this.state.router.current == "seatpost"){
      navigation = (<Navigation />)
      body = (<SeatpostForm />)
    }
    if(this.state.router.current == "chain"){
      navigation = (<Navigation />)
      body = (<ChainFormComponent />)
    }
    if(this.state.router.current == "chainring"){
      navigation = (<Navigation />)
      body = (<ChainRingFormComponent />)
    }
    if(this.state.router.current == "hub"){
      navigation = (<Navigation />)
      body = (<HubFormComponent />)
    }
    if(this.state.router.current == "rim"){
      navigation = (<Navigation />)
      body = (<RimComponentForm />)
    }
    if(this.state.router.current == "wheel"){
      navigation = (<Navigation />)
      body = (<WheelSetFormComponent />)
    }
    if(this.state.router.current == "tire"){
      navigation = (<Navigation />)
      body = (<TireComponentForm />)
    }
    if(this.state.router.current == "clip"){
      navigation = (<Navigation />)
      body = (<ClipFormComponent />)
    }
    if(this.state.router.current == "pedal"){
      navigation = (<Navigation />)
      body = (<PedalFormComponent />)
    }
    if(this.state.router.current == "stem"){
      navigation = (<Navigation />)
      body = (<StemFormComponent />)
    }
    if(this.state.router.current == "handle"){
      navigation = (<Navigation />)
      body = (<HandlebarFormComponent />)
    }
    if(this.state.router.current == "cranks"){
      navigation = (<Navigation />)
      body = (<CranksetFormComponent />)
    }
    if(this.state.router.current == "saddle"){
      navigation = (<Navigation />)
      body = (<SaddleFormComponent />)
    }
    if(this.state.router.current == "notFound"){
      body = (<div><h1>404 Page Not Found!!</h1></div>)
    }
    return(
      <div>
        {navigation}
        {body}
      </div>
    )
  }
});

//Exports
module.exports = {
  'ControllerComponent': ControllerComponent
}
