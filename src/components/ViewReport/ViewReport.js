import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ViewReportComponent from './ViewReportComponent'

export default class ViewReport extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <ViewReportComponent/>
    );
  }
}
