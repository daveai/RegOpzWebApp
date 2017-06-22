import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators, dispatch } from 'redux';
import TreeView from 'react-treeview';
import _ from 'lodash';
import Collapsible from '../CollapsibleModified/Collapsible';
import {
  actionFetchDates,
  actionFetchReportFromDate,
  actionFetchSource,
  actionFetchReportLinkage,
  actionInsertSourceData,
  actionUpdateSourceData,
  actionDeleteFromSourceData,
  actionFetchDatesForReport
} from '../../actions/ViewDataAction';
import DatePicker from 'react-datepicker';
import RegOpzFlatGrid from '../RegOpzFlatGrid/RegOpzFlatGrid';
import InfoModal from '../InfoModal/InfoModal';
import ModalAlert from '../ModalAlert/ModalAlert';
import { BASE_URL } from '../../Constant/constant';
import axios from 'axios';
require('react-datepicker/dist/react-datepicker.css');
require('../../../node_modules/react-treeview/react-treeview.css');
require('../ViewData/ViewDataComponentStyle.css');

export class ViewSourceComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null,
      sources: null
    }
    this.dataSource = null;
  }

  render() {
    return(
      <div className="container view_data_container">
        <div className="col col-lg-6">
          <div className="row">
            <div className="input-group">
              <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleStartDateChange.bind(this)}
                  placeholderText="Select start date"
                  className="view_data_date_picker_input form-control"
              />
            </div>
          </div>
        </div>
        <div className="col col-lg-6">
          <div className="row">
            <div className="input-group">
              <DatePicker
                  selected={this.state.endDate}
                  onChange={this.handleEndDateChange.bind(this)}
                  placeholderText="Select end date"
                  className="view_data_date_picker_input form-control"
              />
            </div>
          </div>
        </div>
        <div className="clear"></div>
        {this.renderAccordions()}
      </div>
    )
  }

  renderAccordions() {}
  handleStartDateChange(date) {}
  handleEndDateChange(date) {}
}

export const mapDispatchToProps = (dispatch) => {
  return {
    fetchDates: (startDate, endDate, table_name) => {
      dispatch(actionFetchDates(startDate, endDate, table_name))
    },
    fetchReportFromDate: (source_id, business_date, page) => {
      dispatch(actionFetchReportFromDate(source_id, business_date, page))
    },
    fetchSource: (business_date) => {
      dispatch(actionFetchSource(business_date))
    },
    fetchReportLinkage: (id, qualifying_key, business_date) => {
      dispatch(actionFetchReportLinkage(id, qualifying_key, business_date));
    },
    insertSourceData: (data, at) => {
      dispatch(actionInsertSourceData(data,at));
    },
    updateSourceData: (data) => {
      dispatch(actionUpdateSourceData(data));
    },
    deleteFromSourceData: (id, business_date, table_name, at) => {
      dispatch(actionDeleteFromSourceData(id, business_date, table_name, at));
    },
    fetchDatesForReport: (startDate, endDate) => {
      dispatch(actionFetchDatesForReport(startDate,endDate))
    },
  }
}

export function mapStateToProps(state) {
  console.log("On mapState ", state.view_data_store);
  return {
    data_date_heads: state.view_data_store.dates,
    report: state.report_store,
    report_linkage: state.view_data_store.report_linkage
  }
}
