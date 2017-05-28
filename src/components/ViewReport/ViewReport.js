import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import ViewData from '../ViewData/ViewDataComponentV2'
export default class ViewReport extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <ViewData apiFor="report" />
    );
  }
}
