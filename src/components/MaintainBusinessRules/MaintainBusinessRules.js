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
        return (
          <div className="maintain_business_rules_container">
            <h1>Maintain Business Rules</h1>            
            <div className="ops_icons">
                <div className="btn-group">
                    <button data-toggle="tooltip" data-placement="top" title="Refresh" className="btn btn-circle btn-primary business_rules_ops_buttons">
                      <i className="fa fa-refresh"></i>
                    </button>
                </div>
                <div className="btn-group">
                    <button data-toggle="tooltip" data-placement="top" title="New" onClick={this.handleInsertClick.bind(this)} className="btn btn-circle btn-primary business_rules_ops_buttons">
                      <i className="fa fa-newspaper-o"></i>
                    </button>
                </div>
                <div className="btn-group">
                    <button data-toggle="tooltip" data-placement="top" title="Delete" onClick={this.handleDeleteClick.bind(this)} className="btn btn-circle btn-primary business_rules_ops_buttons">
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
                    <input onChange={(event) => {}} type="text" value={this.currentPage + 1} className="form-control" />
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
                    <button onClick={this.showHistory.bind(this)} data-toggle="tooltip" data-placement="top" title="Report Link" className="btn btn-circle btn-primary business_rules_ops_buttons">
                      <i className="fa fa-link"></i>
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
               ref={(flatGrid) => {this.flatGrid = flatGrid}}
            />
            <ModalAlert ref={(modal) => {this.modalInstance = modal}} /> 
            <Modal show={this.state.isModalOpen}>
              <Modal.Header>
                <Modal.Title>Report Linked to Rule {this.selectedRowItem != null ? this.selectedRowItem['business_rule'] : ""}</Modal.Title>
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
          <ReactLoading align="center" type='bars' color='#204d74' />
        )
      else {
        return(
          <ul>
            {
              linkageData.map(function(item,index){
                return(
                  <li key={index}>
                    <a href="">                      
                      {item[0] + ", " + item[1] + ", " + item[2]}
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
    handleDeleteClick(event){
      this.props.deleteBusinessRule(this.selectedRowItem['id'], this.selectedRow);
    }
    handleUpdateRow(item){      
      console.log("The final value in MaintainBusinessRules component",item);
      this.props.updateBusinessRule(item);
    }
    handleSort(colName, direction){    
      this.orderBy = {colName:colName, direction:direction};  
      this.props.fetchBusinesRules(this.currentPage, {colName:colName, direction:direction});
    }
    showHistory(event){
      if(!this.selectedRowItem){
        this.modalInstance.open("Please select a row")
      } else {
        this.props.fetchReportLinkage(this.selectedRowItem.business_rule);
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
    fetchReportLinkage :(business_rule) => {
      dispatch(actionFetchReportLinkage(business_rule))
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
