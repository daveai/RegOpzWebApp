import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Breadcrumbs from 'react-breadcrumbs';
import ViewReportComponent from './ViewReportComponent'

export default class ViewReport extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div>
        <Breadcrumbs
          routes={this.props.routes}
          params={this.props.params}
        />
        <ViewReportComponent/>
      </div>
    );
  }
}
