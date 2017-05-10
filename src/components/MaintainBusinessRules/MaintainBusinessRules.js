import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, dispatch} from 'redux';
import ReactDOM from 'react-dom';
import DataGrid from 'react-datagrid';
import {
  actionFetchBusinessRules,
  actionInsertBusinessRule,
  actionDeleteBusinessRule,
  actionUpdateBusinessRule,
  actionFetchReportLinkage } from '../../actions/BusinessRulesAction';
import RightSlidePanel from '../RightSlidePanel/RightSlidePanel';
import ModalAlert from '../ModalAlert/ModalAlert';
import RegOpzFlatGrid from '../RegOpzFlatGrid/RegOpzFlatGrid';
import { Button, Modal } from 'react-bootstrap';
import ReactLoading from 'react-loading';
import _ from 'lodash';
require('react-datagrid/dist/index.css');
require('./MaintainBusinessRules.css');
class MaintainBusinessRules extends Component {
    constructor(props) {
        super(props);
        this.cols = [

        ];
        this.data = [

        ]
        this.newItem =  {
          "business_or_validation": "",
          "business_rule": "",
          "data_attributes": "",
          "data_fields_list": "",
          "id": "",
          "logic": "",
          "logical_condition": "",
          "python_implementation": "",
          "rule_description": "",
          "rule_execution_order": 0,
          "rule_type": "",
          "source_id": "",
          "technical_implementation": "",
          "valid_from": "",
          "valid_to": ""
        }
        this.selectedRow = 0;
        this.selectedRowItem = null;
        this.currentPage = 0;
        this.orderBy = null;
        this.customStyles = {
          content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)'
          }
        };
        this.state = {isModalOpen:false};
        this.msg = "";
        this.modalInstance = null;
        this.linkageData = null;
        this.flatGrid = null;
        this.filterConditions = {};
        this.selectedRows = [];
        this.selectedRulesAsString = null;
        this.operationName = "";
    }
    componentWillMount(){
      this.props.fetchBusinesRules(this.currentPage);
    }
    render() {
      if(this.props.business_rules.length){
        this.cols = this.props.business_rules[0].cols;
        this.data = this.props.business_rules[0].rows;
        this.count = this.props.business_rules[0].count;
        this.pages = Math.ceil(this.count / 100);
        this.linkageData = this.props.report_linkage;
        console.log("Linkage data ", this.linkageData);
        return (
          <div className="maintain_business_rules_container">
            <h1>Maintain Business Rules</h1>
            <div className="ops_icons">
                <div className="btn-group">
                    <button
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Refresh"
                      className="btn btn-circle btn-primary business_rules_ops_buttons"
                      onClick={
                        (event) => {
                          this.currentPage = 0;
                          this.props.fetchBusinesRules(this.currentPage);
                        }
                      }

                    >
                      <i className="fa fa-refresh"></i>
                    </button>
                </div>
                <div className="btn-group">
                    <button
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Insert"
                      onClick={
                        this.handleInsertClick.bind(this)
                      }
                      className="btn btn-circle btn-primary business_rules_ops_buttons"
                    >
                      <i className="fa fa-newspaper-o"></i>
                    </button>
                </div>
                <div className="btn-group">
                    <button
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Duplicate"
                      onClick={
                        this.handleDuplicateClick.bind(this)
                      }
                      className="btn btn-circle btn-primary business_rules_ops_buttons"
                    >
                      <i className="fa fa-copy"></i>
                    </button>
                </div>
                <div className="btn-group">
                    <button
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Delete"
                      onClick={
                        this.handleDeleteClick.bind(this)
                      } 
                      className="btn btn-circle btn-primary business_rules_ops_buttons"
                    >
                      <i className="fa fa-remove"></i>
                    </button>
                </div>
                <div className="btn-group">
                    <button data-toggle="tooltip" data-placement="top" title="First" onClick={(event) => {
                      this.currentPage = 0;
                      this.props.fetchBusinesRules(this.currentPage, this.orderBy);
                      this.forceUpdate();
                    }}
                      className="btn btn-circle btn-primary business_rules_ops_buttons">
                      <i className="fa fa-fast-backward"></i>
                    </button>
                </div>
                <div className="btn-group">
                    <button data-toggle="tooltip" data-placement="top" title="Prev" onClick={(event) => {
                      if(this.currentPage > 0){
                        this.currentPage--;
                        this.props.fetchBusinesRules(this.currentPage, this.orderBy);
                        this.forceUpdate();
                      }

                    }}
                     className="btn btn-circle btn-primary business_rules_ops_buttons">
                      <i className="fa fa-chevron-left"></i>
                    </button>
                </div>
                <div className="btn-group reg_flat_grid_page_input">
                    <input
                      onChange={
                        (event) => {
                          this.currentPage = event.target.value;
                          this.forceUpdate();
                        }
                      }
                      onKeyPress={
                        (event) => {
                          if(event.key == "Enter"){
                            if(this.isInt(event.target.value)){
                              if(event.target.value > this.pages){
                                this.modalInstance.open("Page does not exists");
                              } else {
                                this.props.fetchBusinesRules(this.currentPage);
                              }
                            } else {
                              this.modalInstance.open("Please Enter a valid integer value");
                            }
                          }
                        }
                      }
                      type="text"
                      value={this.currentPage}
                      className="form-control" />
                </div>
                <div className="btn-group">
                    <button data-toggle="tooltip" data-placement="top" title="Next" onClick={(event) => {
                      if(this.currentPage < this.pages - 1){
                        this.currentPage++;
                        this.props.fetchBusinesRules(this.currentPage, this.orderBy);
                        this.forceUpdate();
                      }
                    }} className="btn btn-circle btn-primary business_rules_ops_buttons">
                      <i className="fa fa-chevron-right"></i>
                    </button>
                </div>
                <div className="btn-group">
                    <button data-toggle="tooltip" data-placement="top" title="End" onClick={(event) => {
                      this.currentPage = this.pages - 1;
                      this.props.fetchBusinesRules(this.currentPage, this.orderBy);
                      this.forceUpdate();
                    }} className="btn btn-circle btn-primary business_rules_ops_buttons">
                      <i className="fa fa-fast-forward"></i>
                    </button>
                </div>
                <div className="btn-group">
                    <button
                      onClick={this.showLinkage.bind(this)}
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Report Link"
                      className="btn btn-circle btn-primary business_rules_ops_buttons"
                    >
                      <i className="fa fa-link"></i>
                    </button>
                </div>
                <div className="btn-group">
                    <button
                      onClick={this.showHistory.bind(this)}
                      data-toggle="tooltip"
                      data-placement="top"
                      title="History"
                      className="btn btn-circle btn-primary business_rules_ops_buttons"
                    >
                      <i className="fa fa-history"></i>
                    </button>
                </div>
                <div className="btn-group">
                    <button
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Export CSV"
                      className="btn btn-circle btn-primary business_rules_ops_buttons"
                      onClick={
                        (event) => {
                          window.location.href = "http://localhost:3000/static/business_rules.csv"
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
                      title="Deselect All"
                      className="btn btn-circle btn-primary business_rules_ops_buttons"
                      onClick={
                        (event) => {
                          this.selectedRows = this.flatGrid.deSelectAll();
                          this.selectedRowItem = null;
                          this.selectedRow = null;
                        }
                      }
                    >
                      <i className="fa fa-window-maximize"></i>
                    </button>
                </div>
            </div>
            <RegOpzFlatGrid
               columns={this.cols}
               dataSource={this.data}
               onSelectRow={this.handleSelectRow.bind(this)}
               onUpdateRow = {this.handleUpdateRow.bind(this)}
               onSort = {this.handleSort.bind(this)}
               onFilter = {this.handleFilter.bind(this)}
               onFullSelect = {this.handleFullSelect.bind(this)}
               ref={(flatGrid) => {this.flatGrid = flatGrid}}
            />
            <ModalAlert
              onClickOkay={
                () => {
                  if(this.operationName == "DELETE"){
                    this.props.deleteBusinessRule(this.selectedRowItem['id'], this.selectedRow);
                    this.selectedRowItem = null;
                    this.selectedRow = null;
                  }
                }
              }
              onClickDiscard={
                () => {

                }
              }
              ref={
                (modal) => {
                  this.modalInstance = modal
                }
              }
            />
            <Modal show={this.state.isModalOpen}>
              <Modal.Header>
                <Modal.Title>Report Linked to Rule {this.selectedRulesAsString}</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                {this.renderReportLinkage(this.linkageData)}
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
    renderReportLinkage(linkageData){
      if(!linkageData || typeof(linkageData) == 'undefined' || linkageData == null || linkageData.length == 0)
        return(
          <div>
            <h4>No linked report found!</h4>
          </div>
        )
      else {
        return(
          <ul>
            {
              linkageData.map(function(item,index){
                return(
                  <li key={index}>
                    <a href="">
                      {item.report_id + ", " + item.sheet_id + ", " + item.cell_id + ", " + item.cell_business_rules}
                    </a>
                  </li>
                )
              })
            }

          </ul>
        )
      }
    }
    handlePageClick(event){
      event.preventDefault();
      this.props.fetchBusinesRules($(event.target).text());

    }
    handleSelectRow(rownum, item){
      console.log("I am called at ", item);
      this.selectedRow = rownum;
      this.selectedRowItem = item;
    }
    handleInsertClick(event){
      this.props.insertBusinessRule(this.newItem, this.selectedRow);
    }
    handleDuplicateClick(event){
      if(this.selectedRows.length == 0){
        this.modalInstance.open("Please select at least one row");
      } else if (this.selectedRows.length > 1) {
        this.modalInstance.open("Please select only one row");
      } else {
        this.props.insertBusinessRule(this.selectedRows[0], this.selectedRow);
      }
    }
    handleDeleteClick(event){
      if(!this.selectedRowItem){
        this.modalInstance.isDiscardToBeShown = false;
        this.modalInstance.open("Please select a row");
        this.operationName = "";
      } else {
        this.modalInstance.isDiscardToBeShown = true;
        this.operationName = "DELETE";
        this.modalInstance.open(`Are you sure to delete this row (business rule: ${this.selectedRowItem['business_rule']}) ?`)
        //this.props.deleteBusinessRule(this.selectedRowItem['id'], this.selectedRow);
      }
    }
    handleUpdateRow(item){
      console.log("The final value in MaintainBusinessRules component",item);
      this.props.updateBusinessRule(item);
    }
    handleSort(colName, direction){
      this.orderBy = {colName:colName, direction:direction};
      this.props.fetchBusinesRules(this.currentPage, {colName:colName, direction:direction});
      $(".flat_grid_header_sort_button > i").removeClass("fa-caret-up");
      $(".flat_grid_header_sort_button > i").addClass("fa-caret-down");
    }
    showLinkage(event){
      if(this.selectedRows.length == 0){
        this.modalInstance.open("Please select at least one row")
      } else {
        var params = {};
        params.business_rule_list = [];
        for(let i = 0; i < this.selectedRows.length; i++){
          params.source_id = this.selectedRows[0].source_id;
          params.business_rule_list.push(this.selectedRows[i].business_rule);
        }
        this.selectedRulesAsString = params.business_rule_list.toString();
        this.props.fetchReportLinkage(params);
        this.setState({isModalOpen:true})
      }
    }
    showHistory(event){
      if(this.selectedRows.length == 0){
        this.modalInstance.open("Please select at least one row")
      } else {
        var params = {};
        params.business_rule_list = [];
        for(let i = 0; i < this.selectedRows.length; i++){
          params.source_id = this.selectedRows[0].source_id;
          params.business_rule_list.push(this.selectedRows[i].business_rule);
        }
        this.selectedRulesAsString = params.business_rule_list.toString();
        //this.props.fetchReportLinkage(params);
        this.setState({isModalOpen:true})
      }
    }
    handleFilter(condition){
      this.filterConditions[condition.field_name] = condition.value;
      if(condition.field_name == "rule_execution_order") {
        this.filterConditions[condition.field_name] = parseInt(condition.value);
      }
      if(condition.field_name == "id") {
        this.filterConditions[condition.field_name] = parseInt(condition.value);
      }
      if(condition.value == ""){
        delete this.filterConditions[condition.field_name];
      }
      console.log("Filter condition", this.filterConditions)
      this.flatGrid.filterData(this.filterConditions);
    }
    handleFullSelect(selectedItems){
      console.log("Full selected items are ", selectedItems);
      this.selectedRows = selectedItems;
    }
    isInt(value) {
      return !isNaN(value) &&
             parseInt(Number(value)) == value &&
             !isNaN(parseInt(value, 10));
    }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchBusinesRules: (page,order) => {
      dispatch(actionFetchBusinessRules(page, order))
    },
    insertBusinessRule: (item, at) => {
      dispatch(actionInsertBusinessRule(item, at))
    },
    deleteBusinessRule: (item,at) => {
      dispatch(actionDeleteBusinessRule(item,at))
    },
    updateBusinessRule:(item) => {
      dispatch(actionUpdateBusinessRule(item))
    },
    fetchReportLinkage :(params) => {
      dispatch(actionFetchReportLinkage(params))
    }

  }
}
function mapStateToProps(state){
  return {
    business_rules:state.business_rules,
    report_linkage: state.report_linkage
  }
}
const VisibleMaintainBusinessRules = connect(
  mapStateToProps,
  mapDispatchToProps
)(MaintainBusinessRules);
export default VisibleMaintainBusinessRules;
