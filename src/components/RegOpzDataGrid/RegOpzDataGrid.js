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
  }
  componentWillMount(){
    this.props.fetchCapturedReport("MAS1003");
  }
  render(){
    if(this.props.captured_report.length > 0){
      this.data = this.props.captured_report[0].matrix;
      return(
        <div className="reg_gridHolder">
          <RegOpzDataGridHeader numberofCols={this.numberofCols} colAttr={this.props.captured_report[0].col_attr} />
          <div className="clearfix"></div>
          <RegOpzDataGridSideMarker numberofRows={this.numberofRows} rowAttr={this.props.captured_report[0].row_attr} />
          <div className="reg_grid_drawing_container">
              <RegOpzDataGridHorizontalLines numberofRows={this.numberofRows} rowAttr={this.props.captured_report[0].row_attr} />
              <RegOpzDataGridVerticalLines numberofCols={this.numberofCols} height={this.numberofRows * 30} colAttr={this.props.captured_report[0].col_attr} />
              <RegOpzDataGridBody data={this.data} colAttr={this.props.captured_report[0].col_attr} rowAttr={this.props.captured_report[0].row_attr} />
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
    fetchCapturedReport:(report_id) => {
      dispatch(actionFetchReportData(report_id));
    }
  }
}
const VisibleRegOpzDataGrid = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegOpzDataGrid);
export default VisibleRegOpzDataGrid;
