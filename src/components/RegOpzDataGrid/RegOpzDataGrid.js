import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import RegOpzDataGridHeader from './RegOpzDataGridHeader';
import RegOpzDataGridSideMarker from './RegOpzGridSideMarker';
import RegOpzDataGridHorizontalLines from './RegOpzDataGridHorizontalLines';
import RegOpzDataGridVerticalLines from './RegOpzDataGridVerticalLines';
import RegOpzDataGridBody from './RegOpzDataGridBody';
import {connect} from 'react-redux';
import {bindActionCreators, dispatch} from 'redux';
import {actionFetchReportData} from '../../actions/CaptureReportAction';
require('./RegOpzDataGrid.css');
class RegOpzDataGrid extends Component {
  constructor(props){
    super(props);
    this.numberofCols = 26;
    this.numberofRows = 1000;
    this.data = [];
    this.selectedSheet = 0;
    this.report_id = this.props.location.query['report_id'];
    this.reporting_date = this.props.location.query['reporting_date'];
  }
  componentWillMount(){

    this.props.fetchCapturedReport(this.report_id,this.reporting_date);
  }
  render(){
    if(this.props.captured_report.length > 0){
      this.data = this.props.captured_report[this.selectedSheet].matrix;
      return(
        <div className="reg_gridHolder">
          <ol className="breadcrumb">
            <li><a href="#/dashboard/view-report">View Report</a></li>
            <li><a href={window.location.href}>{`${this.report_id} (${this.reporting_date})`}</a></li>
          </ol>
          <div className="col col-lg-12">
            <div className="row reg_sheet_buttons_holder">
              <div className="btn-group">
                {
                  this.props.captured_report.map((item,index) => {
                    return(
                      <button
                        key={index}
                        target={index}
                        type="button"
                        className="btn btn-primary"
                        onClick={(event) => {
                          this.selectedSheet = event.target.getAttribute("target");
                          this.forceUpdate();
                        }}
                      >
                        {item['sheet']}
                      </button>
                    )
                  })
                }
              </div>
            </div>
          </div>
          <RegOpzDataGridHeader numberofCols={this.numberofCols} colAttr={this.props.captured_report[this.selectedSheet].col_attr} />
          <div className="clearfix"></div>
          <RegOpzDataGridSideMarker numberofRows={this.numberofRows} rowAttr={this.props.captured_report[this.selectedSheet].row_attr} />
          <div className="reg_grid_drawing_container">
              <RegOpzDataGridHorizontalLines numberofRows={this.numberofRows} rowAttr={this.props.captured_report[this.selectedSheet].row_attr} />
              <RegOpzDataGridVerticalLines numberofCols={this.numberofCols} height={this.numberofRows * 30} colAttr={this.props.captured_report[this.selectedSheet].col_attr} />
              <RegOpzDataGridBody data={this.data} colAttr={this.props.captured_report[this.selectedSheet].col_attr} rowAttr={this.props.captured_report[this.selectedSheet].row_attr} />
          </div>
        </div>
      )
    } else {
      return(
        <h1>Loading...</h1>
      )
    }
  }
}
function mapStateToProps(state){
  return {
    captured_report:state.captured_report
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchCapturedReport:(report_id, reporting_date) => {
      dispatch(actionFetchReportData(report_id, reporting_date));
    }
  }
}
const VisibleRegOpzDataGrid = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegOpzDataGrid);
export default VisibleRegOpzDataGrid;
