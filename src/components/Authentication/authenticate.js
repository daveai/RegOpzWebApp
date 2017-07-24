import React,{ Component } from 'react';
import { connect } from 'react-redux';

export default function authenticate(ComposedComponent){
  class Authentication extends Component{

      render(){
        console.log("Render function called, Authentication.....",this.props.login_details);
        //console.log(this.context);
        return <ComposedComponent {...this.props} />
      }
    }

  function mapStatetoProps(state){
    console.log("Inside mapStatetoProps, authenticate.....",state);
    return {
      login_details:state.login_store
    };
  }
  return connect(mapStatetoProps)(Authentication);
}
