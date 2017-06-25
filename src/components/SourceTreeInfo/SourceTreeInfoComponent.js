import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators, dispatch } from 'redux';
import TreeView from 'react-treeview';
import axios from 'axios';
import Collapsible from '../CollapsibleModified/Collapsible';
import {
  actionFetchSource,
  actionFetchReportFromDate ,
  actionGenerateReport,
  actionApplyRules
} from '../../actions/ViewDataAction';
import { BASE_URL } from '../../Constant/constant';

export class SourceTreeInfoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: null
    }
    this.selectedSourceId = null;
    this.selectedBusinessDate = null;
  }

  render() {
    console.log("This should not call");
    return(
      <Collapsible
        dateString={this.props.year + "-" + this.props.month + "-" + this.props.date}
        onOpen={this.dateOnOpen.bind(this)}
        trigger={this.props.date}>
        {this.renderSources()}
      </Collapsible>
    )
  }

  dateOnOpen(date) {
    console.log("Should not");
  }
  renderSources() {
    console.log("not again");
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    fetchSource: (business_date) => {
      dispatch(actionFetchSource(business_date));
    },
    fetchReportFromDate: (source_id, business_date, page) => {
      dispatch(actionFetchReportFromDate(source_id, business_date, page));
    },
    generateReport: (report_info) => {
      dispatch(actionGenerateReport(report_info));
    },
    applyRules: (source_info) => {
      dispatch(actionApplyRules(source_info));
    }
  }
}

export function mapStateToProps(state) {
  return {
    sources: state.sources
  }
}
