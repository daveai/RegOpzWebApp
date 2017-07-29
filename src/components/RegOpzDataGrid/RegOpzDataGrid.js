import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, Media, Label, Badge } from 'react-bootstrap';
import moment from 'moment';
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
import {actionFetchAuditList} from '../../actions/DefChangeAction';
import { hashHistory, routerContext } from 'react-router';
import Breadcrumbs from 'react-breadcrumbs';
import {BASE_URL} from '../../Constant/constant';
import axios from 'axios';
require('./RegOpzDataGrid.css');

class RegOpzDataGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen:false
    };
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
    this.rulesIdAsSubQuery = "";
    this.linkageData = null;
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
      this.selectedSheetName = this.props.captured_report[this.selectedSheet]['sheet'];
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
      if( typeof this.props.audit_list != 'undefined' && this.props.audit_list.length ){
        this.linkageData = this.props.audit_list;
      }
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
                        className="btn btn-circle btn-primary business_rules_ops_buttons btn-xs"
                      >
                        <i className="fa fa-cog"></i>
                      </button>
                    </div>
                    <div className="btn-group">
                      <button
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Export xlsx"
                        className="btn btn-circle btn-success business_rules_ops_buttons btn-xs"
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
                        className="btn btn-circle btn-info business_rules_ops_buttons btn-xs"
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
                    <div className="btn-group">
                      <button
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Report Rules History"
                        className="btn btn-circle btn-primary business_rules_ops_buttons btn-xs"
                        onClick={ this.showHistory.bind(this)}
                      >
                        <i className="fa fa-history"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="row reg_sheet_buttons_holder">
                  <div className="btn-group">
                    <button className="btn btn-success btn-sm">Showing <i className="fa fa-cube"></i> {this.selectedSheetName}</button>
                    {
                      this.props.captured_report.map((item,index) => {
                        return(
                          <button
                            key={index}
                            target={index}
                            type="button"
                            className="btn btn-warning btn-xs"
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
        <Modal
          show={this.state.isModalOpen}
          container={this}
          onHide={(event) => {
              this.setState({isModalOpen:false});
            }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Report Rule Change History for <h6>{this.report_id}</h6></Modal.Title>
          </Modal.Header>

          <Modal.Body>
            { this.renderChangeHistory(this.linkageData) }
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={(event) => {
                this.setState({isModalOpen:false})
              }}>Ok</Button>
          </Modal.Footer>
        </Modal>
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

  renderChangeHistory(linkageData){
    if(!linkageData || typeof(linkageData) == 'undefined' || linkageData == null || linkageData.length == 0)
      return(
        <div>
          <h4>No audit change report found!</h4>
        </div>
      )
    else {
      return(
        <div className="dashboard-widget-content">
          <ul className="list-unstyled timeline widget">
          {
            linkageData.map(function(item,index){
              return(
                <li>
                  <div className="block">
                    <div className="block_content">
                      <h2 className="title"></h2>
                        <Media>
                          <Media.Left>
                            <h3>{moment(item.date_of_change?item.date_of_change:"20170624T203000").format('DD')}</h3>
                            <h6>{moment(item.date_of_change?item.date_of_change:"20170624").format('MMM')},
                            <small>{moment(item.date_of_change?item.date_of_change:"20170624").format('YYYY')}</small></h6>
                          </Media.Left>
                          <Media.Body>
                            <Media.Heading>Buisness Rule Change for id: {item.id}
                              <h5>
                                <small>{item.change_reference}</small>
                              </h5>
                            </Media.Heading>
                            <h6>
                              <Badge>{item.change_type}</Badge> by {item.maker} on {moment(item.date_of_change).format('ll')} {moment(item.date_of_change).format('LTS')}
                            </h6>
                            <p>{item.maker_comment}</p>
                              <div><h5>Change Summary</h5>

                                  {((item)=>{
                                      if (item.change_type=="UPDATE"){
                                          console.log("Update Info........",item.update_info);
                                          const update_list=item.update_info.map((uitem,uindex)=>{
                                              console.log("Uitem.....",uitem);
                                              return (
                                                     <tr>
                                                        <th scope="row">{uindex + 1}</th>
                                                        <td><h6><Label bsStyle="warning">{uitem.field_name}</Label></h6></td>
                                                        <td>{uitem.new_val}</td>
                                                        <td>{uitem.old_val}</td>
                                                     </tr>
                                                   );
                                          });
                                          return(
                                            <table className="table table-hover table-content-wrap">
                                              <thead>
                                                <tr>
                                                  <th>#</th>
                                                  <th>Column</th>
                                                  <th>New Value</th>
                                                  <th>Old Value</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {update_list}
                                              </tbody>
                                            </table>
                                          );
                                      } else {
                                        return (<table className="table table-hover table-content-wrap">
                                                  <thead>
                                                    <tr>
                                                    </tr>
                                                  </thead>
                                                  <tbody>
                                                      <tr><td>This is a {item.change_type} request</td></tr>
                                                  </tbody>
                                                </table>
                                            )
                                      }
                                  })(item)}

                              </div>
                              <Media>
                                <Media.Left>
                                  {
                                    ((status)=>{
                                      if(status=="PENDING"){
                                        return(<Label bsStyle="primary">{status}</Label>)
                                      } else if (status=="REJECTED"){
                                        return(<Label bsStyle="warning">{status}</Label>)
                                      } else if(status=="APPROVED"){
                                        return(<Label bsStyle="success">{status}</Label>)
                                      } else {
                                        return(<Label>{status}</Label>)
                                      }
                                    }
                                  )(item.status)}
                                </Media.Left>
                                <Media.Body>
                                  <Media.Heading>Verification details</Media.Heading>
                                    {
                                      ((status)=>{
                                        if(status!="PENDING"){
                                          return(
                                            <h6>
                                              by {item.checker} on {moment(item.date_of_checking).format('ll')} {moment(item.date_of_checking).format('LTS')}
                                            </h6>
                                          )
                                        }
                                      }
                                    )(item.status)}
                                  <p>{item.checker_comment}</p>
                                </Media.Body>
                              </Media>
                          </Media.Body>
                        </Media>
                      </div>
                  </div>
                </li>
              )
            })
          }
        </ul>
        </div>
      )
    }
  }
  showHistory(event){
    this.rulesIdAsSubQuery = `select id from report_calc_def where report_id= '${this.report_id}'`;
    this.props.fetchAuditList(this.rulesIdAsSubQuery,"report_calc_def");
    this.setState({isModalOpen:true})
  }
}

function mapStateToProps(state) {
  return {
    captured_report:state.captured_report,
    audit_list:state.def_change_store.audit_list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCapturedReport:(report_id, reporting_date) => {
      dispatch(actionFetchReportData(report_id, reporting_date));
    },
    drillDown:(report_id, sheet_id, cell_id) => {
      dispatch(actionDrillDown(report_id, sheet_id, cell_id));
    },
    fetchAuditList:(idList,tableName)=>{
      dispatch(actionFetchAuditList(idList,tableName));
    }
  }
}

const VisibleRegOpzDataGrid = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegOpzDataGrid);

export default VisibleRegOpzDataGrid;
