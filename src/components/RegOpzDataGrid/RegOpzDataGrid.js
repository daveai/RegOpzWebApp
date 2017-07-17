import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RegOpzDataGridHeader from './RegOpzDataGridHeader';
import RegOpzDataGridSideMarker from './RegOpzGridSideMarker';
import RegOpzDataGridHorizontalLines from './RegOpzDataGridHorizontalLines';
import RegOpzDataGridVerticalLines from './RegOpzDataGridVerticalLines';
import RegOpzDataGridBody from './RegOpzDataGridBody';
import { connect } from 'react-redux';
import { bindActionCreators, dispatch } from 'redux';
import {
  actionFetchReportData,
  actionDrillDown
} from '../../actions/CaptureReportAction';
import { hashHistory, routerContext } from 'react-router';
import Breadcrumbs from 'react-breadcrumbs';
import {BASE_URL} from '../../Constant/constant';
import axios from 'axios';
require('./RegOpzDataGrid.css');

class RegOpzDataGrid extends Component {
  constructor(props) {
    super(props);
    this.numberofCols = 52;
    this.numberofRows = 1000;
    this.data = [];
    this.selectedSheet = 0;
    this.report_id = this.props.location.query['report_id'];
    this.reporting_date = this.props.location.query['reporting_date'];
    this.cell_format_yn = 'Y';
    this.selectedCell = null;
    this.selectedSheetName = null;
    this.gridHight = 0;
    this.gridWidth = 0;
  }

  componentWillMount() {
    this.props.fetchCapturedReport(this.report_id,this.reporting_date);
  }

  alphaSequence(i) {
      return i < 0
          ? ""
          : this.alphaSequence((i / 26) - 1) + String.fromCharCode((65 + i % 26) + "");
  }

  render(){
    if (this.props.captured_report.length > 0) {
      this.data = this.props.captured_report[this.selectedSheet].matrix;
      let row_attr = this.props.captured_report[this.selectedSheet].row_attr;
      let col_attr = this.props.captured_report[this.selectedSheet].col_attr;
      console.log('no of rows...', row_attr, row_attr.length);
      this.numberofRows = Object.keys(row_attr).length;
      this.numberofCols = Object.keys(col_attr).length;
      this.gridHight = 0;
      this.gridWidth = 0;
      [... Array(parseInt(this.numberofRows))].map(function(item,index){
          //var stylex = {};
          if(typeof(row_attr[(index+1)+""]) != 'undefined') {
            this.gridHight += parseInt(row_attr[(index+1)+""].height) * 2;
          }
      }.bind(this));
      [... Array(parseInt(this.numberofCols))].map(function(item,index){
          //var stylex = {};
          if(typeof(col_attr[this.alphaSequence(index)]) != 'undefined'){
            this.gridWidth += parseInt(col_attr[this.alphaSequence(index)]['width']) * 9 + 1;
          }
      }.bind(this));
      console.log('grid hight',this.gridHight);
      return(
        <div className="reg_gridHolder">
          <div>
            <Breadcrumbs
              routes={this.props.routes}
              params={this.props.params}
              wrapperClass="breadcrumb"
            />
            <div className="row">
              <div className="row reg_ops_button_holder">
                <div className="row">
                  <div className="col col-lg-12 mb-10 reg_sheet_buttons_holder">
                    <div className="btn-group">
                      <button
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Drill Down"
                        onClick={
                          (event) => {
                            hashHistory.push(`/dashboard/drill-down?report_id=${this.report_id}&sheet=${encodeURI(this.props.captured_report[this.selectedSheet].sheet)}&cell=${this.selectedCell}&reporting_date=${this.reporting_date}`);
                          }
                        }
                        className="btn btn-circle btn-primary business_rules_ops_buttons"
                      >
                        <i className="fa fa-cog"></i>
                      </button>
                    </div>
                    <div className="btn-group">
                      <button
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Export xlsx"
                        className="btn btn-circle btn-primary business_rules_ops_buttons"
                        onClick={
                          (event) => {
                              const url = BASE_URL + `document/get-report-export-to-excel?`
                                        + `report_id=${this.report_id}`
                                        + `&reporting_date=${this.reporting_date}`
                                        + `&cell_format_yn=${this.cell_format_yn}`;
                              axios.get(url)
                              .then(function(response){
                                console.log("export xlsx",response);
                                window.location.href = BASE_URL + "../../static/" + response.data.file_name;

                              })
                              .catch(function (error) {
                                console.log(error);
                              });
                          }
                        }
                      >
                        <i className="fa fa-table"></i>
                      </button>
                    </div>
                    <div className="btn-group">
                      <button
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Export Report Rules"
                        className="btn btn-circle btn-primary business_rules_ops_buttons"
                        onClick={
                          (event) => {
                              const url = BASE_URL + `document/get-report-rule-export-to-excel?`
                                        + `report_id=${this.report_id}`;
                              axios.get(url)
                              .then(function(response){
                                console.log("export xlsx",response);
                                window.location.href = BASE_URL + "../../static/" + response.data.file_name;

                              })
                              .catch(function (error) {
                                console.log(error);
                              });
                          }
                        }
                      >
                        <i className="fa fa-puzzle-piece"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
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
            </div>
          </div>
        <div className="data_grid_container">
          <RegOpzDataGridHeader
            numberofCols={this.numberofCols}
            colAttr={this.props.captured_report[this.selectedSheet].col_attr}
          />
          <div className="clearfix"></div>
          <RegOpzDataGridSideMarker
            numberofRows={this.numberofRows}
            rowAttr={this.props.captured_report[this.selectedSheet].row_attr}
          />
          <div className="reg_grid_drawing_container">
              <RegOpzDataGridHorizontalLines
                numberofRows={this.numberofRows}
                height={this.gridHight}
                width={this.gridWidth}
                rowAttr={this.props.captured_report[this.selectedSheet].row_attr}
              />
              <RegOpzDataGridVerticalLines
                numberofCols={this.numberofCols}
                height={this.gridHight}
                width={this.gridWidth}
                colAttr={this.props.captured_report[this.selectedSheet].col_attr}
              />
              <RegOpzDataGridBody
                data={this.data}
                colAttr={this.props.captured_report[this.selectedSheet].col_attr}
                rowAttr={this.props.captured_report[this.selectedSheet].row_attr}
                onSelect = {
                  (item) => {
                    this.selectedCell = item;
                    console.log("On select",item);
                  }
                }
              />
          </div>
        </div>
      </div>
      )
    } else {
      return(
        <h1>Loading...</h1>
      )
    }
  }

  renderBreadCrumb() {
    console.log('reporting_date', this.reporting_date);
    if (this.reporting_date == undefined || this.reporting_date == 'undefined') {
      return(
        <ol className="breadcrumb">
          <li><a href={'#/dashboard/maintain-report-rules'}>Maintain Report Rules</a></li>
          <li><a href={window.location.href}>{`${this.report_id} (Manage Report Rules)`}</a></li>
        </ol>
      )
    } else {
      return(
        <ol className="breadcrumb">
          <li><a href="#/dashboard/view-report">View Report</a></li>
          <li><a href={window.location.href}>{`${this.report_id} (${this.reporting_date})`}</a></li>
        </ol>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    captured_report:state.captured_report
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCapturedReport:(report_id, reporting_date) => {
      dispatch(actionFetchReportData(report_id, reporting_date));
    },
    drillDown:(report_id, sheet_id, cell_id) => {
      dispatch(actionDrillDown(report_id, sheet_id, cell_id));
    }
  }
}

const VisibleRegOpzDataGrid = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegOpzDataGrid);

export default VisibleRegOpzDataGrid;
