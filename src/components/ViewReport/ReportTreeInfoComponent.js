import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';
import axios from 'axios';
import Collapsible from '../CollapsibleModified/Collapsible';
import {
  actionFetchSource,
  actionFetchReportFromDate,
  actionGenerateReport,
  actionApplyRules
} from '../../actions/ViewDataAction';
import { BASE_URL } from '../../Constant/constant';

class ReportTreeInfoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: null
    }
    this.selectedSourceId = null;
    this.selectedBusinessDate = null;
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
                <td><Link to={`/dashboard/data-grid?type=report&report_id=${item.report_id}&reporting_date=${item.reporting_date}`} params={{ name: item.report_id }}> {item.report_id} </Link></td>
                <td>{item.report_create_date}</td>
                <td>{item.report_create_status}</td>
                <td>{item.report_created_by}</td>
                <td>
                  <button
                    className="btn btn-primary btn-xs"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Operation Log History"
                  >
                    <span className="fa fa-history" aria-hidden="true"></span>
                  </button>
                  <button
                    className="btn btn-success btn-xs"
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
                    <span className="fa fa-rocket" aria-hidden="true"></span>
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

const mapDispatchToProps = (dispatch) => {
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

function mapStateToProps(state) {
  return {
    sources: state.sources
  }
}


const VisibleReportTreeInfoComponent = connect(
  mapStateToProps,
  mapDispatchToProps
) (ReportTreeInfoComponent);

export default VisibleReportTreeInfoComponent;
