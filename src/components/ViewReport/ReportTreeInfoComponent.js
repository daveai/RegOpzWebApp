import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import TreeView from 'react-treeview';
import moment from 'moment';
import axios from 'axios';
import Collapsible from '../CollapsibleModified/Collapsible';
import {
  actionFetchSource,
  actionFetchReportFromDate,
  actionGenerateReport,
  actionApplyRules
} from '../../actions/ViewDataAction';
import {
  SourceTreeInfoComponent,
  mapDispatchToProps,
  mapStateToProps
} from '../SourceTreeInfo/SourceTreeInfoComponent';
import { BASE_URL } from '../../Constant/constant';

class ReportTreeInfoComponent extends SourceTreeInfoComponent {
  constructor() {
    super(props);
  }

  render() {
    return(
      <Collapsible
        dateString={this.props.year + "-" + this.props.month + "-" + this.props.date}
        onOpen={this.dateOnOpen.bind(this)}
        trigger={this.props.date}>
        {this.renderSources()}
      </Collapsible>
    )
  }

  renderSources() {
    console.log('ReportTreeInfo: renderSources()');
    if (this.state.sources === null) {
      return(
        <h2>Loading...</h2>
      )
    }
    if (this.state.sources.length == 0) {
      return(
        <h2>No Data Found</h2>
      )
    } else {
      return(
        <table className="table">
          <thead>
            <tr>
              <th>Report ID</th>
              <th>Report Creation Date</th>
              <th>Report Generation status</th>
              <th>Report by</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
          {this.state.sources.map((item,index) => {
            return (
              <tr>
                <td><a href={`#/dashboard/data-grid?report_id=${item.report_id}&reporting_date=${item.reporting_date}`}>{item.report_id}</a></td>
                <td>{item.report_create_date}</td>
                <td>{item.report_create_status}</td>
                <td>{item.report_created_by}</td>
                <td>
                  <button className="btn btn-default"><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span></button>
                  <button
                    className="btn btn-default"
                    onClick={
                      (event) => {
                        let report_info = {
                          report_id: item.report_id,
                          report_parameters: item.report_parameters,
                          reporting_date: item.reporting_date
                        }
                        console.log(report_info);
                        this.props.generateReport(report_info);
                      }
                    }
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Generate Report"
                  >
                    <span className="glyphicon glyphicon-plane" aria-hidden="true"></span>
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
        </table>
      )
    }
  }

  dateOnOpen(business_date) {
    console.log("Called");
    let dateString = moment(business_date, 'YYYY-MMMM-D').format('YYYYMMDD');
    axios.get(BASE_URL + "document/get-report-list?reporting_date=" + dateString)
    .then(function (response) {
      console.log(response);
      this.setState({
        sources: response.data
      })
    }.bind(this))
    .catch((error) => {
      console.log(error);
    });
  }
}

const VisibleReportTreeInfoComponent = connect(
  mapStateToProps,
  mapDispatchToProps
) (ReportTreeInfoComponent);

export default VisibleReportTreeInfoComponent;
