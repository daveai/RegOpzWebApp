import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, dispatch} from 'redux';
import ReactDOM from 'react-dom';
import DataGrid from 'react-datagrid';
import { actionFetchBusinessRules, actionInsertBusinessRule, actionDeleteBusinessRule, actionUpdateBusinessRule } from '../../actions/BusinessRulesAction';
import RightSlidePanel from '../RightSlidePanel/RightSlidePanel';
import ModalInstance from '../Modal/ModalInstance';
import RegOpzFlatGrid from '../RegOpzFlatGrid/RegOpzFlatGrid';
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
        this.currentPage = 0;
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
        return (
          <div className="maintain_business_rules_container">
            <h1>Maintain Business Rules</h1>            
            <div className="ops_icons">
                <div className="btn-group">
                    <button className="btn btn-circle btn-primary business_rules_ops_buttons">
                      <i className="fa fa-refresh"></i>
                    </button>
                </div>
                <div className="btn-group">
                    <button onClick={this.handleInsertClick.bind(this)} className="btn btn-circle btn-primary business_rules_ops_buttons">
                      <i className="fa fa-newspaper-o"></i>
                    </button>
                </div>
                <div className="btn-group">
                    <button onClick={this.handleDeleteClick.bind(this)} className="btn btn-circle btn-primary business_rules_ops_buttons">
                      <i className="fa fa-remove"></i>
                    </button>
                </div>
                <div className="btn-group">
                    <button onClick={(event) => {
                      this.currentPage = 0;
                      this.props.fetchBusinesRules(this.currentPage);
                      this.setState({});
                    }} 
                      className="btn btn-circle btn-primary business_rules_ops_buttons">
                      <i className="fa fa-fast-backward"></i>
                    </button>
                </div>
                <div className="btn-group">
                    <button onClick={(event) => {
                      if(this.currentPage > 0){
                        this.currentPage--;
                        this.props.fetchBusinesRules(this.currentPage);
                        this.setState({});
                      }
                      
                    }}
                     className="btn btn-circle btn-primary business_rules_ops_buttons">
                      <i className="fa fa-chevron-left"></i>
                    </button>
                </div>
                <div className="btn-group reg_flat_grid_page_input">
                    <input type="text" value={this.currentPage + 1} className="form-control" />
                </div>
                <div className="btn-group">
                    <button onClick={(event) => {
                      if(this.currentPage < this.pages - 1){
                        this.currentPage++;
                        this.props.fetchBusinesRules(this.currentPage);
                        this.setState({});
                      }
                    }} className="btn btn-circle btn-primary business_rules_ops_buttons">
                      <i className="fa fa-chevron-right"></i>
                    </button>
                </div>
                <div className="btn-group">
                    <button onClick={(event) => {
                      this.currentPage = this.pages - 1;
                      this.props.fetchBusinesRules(this.currentPage);
                      this.setState({});
                    }} className="btn btn-circle btn-primary business_rules_ops_buttons">
                      <i className="fa fa-fast-forward"></i>
                    </button>
                </div>                
            </div>            
            <RegOpzFlatGrid
             columns={this.cols} 
             dataSource={this.data} 
             onSelectRow={this.handleSelectRow.bind(this)}
             onUpdateRow = {this.handleUpdateRow.bind(this)}
            />
          </div>
        )
      } else {
        return(
          <h1>Loading...</h1>
        )
      }
    }
     handlePageClick(event){
      event.preventDefault();
      alert($(event.target).text());
      this.props.fetchBusinesRules($(event.target).text());
  
    }
    handleSelectRow(rownum){
      console.log("I am called at ", rownum);
      this.selectedRow = rownum;
    }    
    handleInsertClick(event){      
      this.props.insertBusinessRule(this.newItem, this.selectedRow);
    }
    handleDeleteClick(event){
      this.props.deleteBusinessRule(this.selectedRow);
    }
    handleUpdateRow(item){      
      console.log("The final value in MaintainBusinessRules component",item);
      this.props.updateBusinessRule(item);
    }

}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchBusinesRules: (page) => {
      dispatch(actionFetchBusinessRules(page))
    },
    insertBusinessRule: (item, at) => {
      dispatch(actionInsertBusinessRule(item, at))
    },
    deleteBusinessRule: (at) => {
      dispatch(actionDeleteBusinessRule(at))
    },
    updateBusinessRule:(item) => {
      dispatch(actionUpdateBusinessRule(item))
    }

  }
}
function mapStateToProps(state){  
  return {
    business_rules:state.business_rules
  }
}
const VisibleMaintainBusinessRules = connect(
  mapStateToProps,
  mapDispatchToProps
)(MaintainBusinessRules);
export default VisibleMaintainBusinessRules;
