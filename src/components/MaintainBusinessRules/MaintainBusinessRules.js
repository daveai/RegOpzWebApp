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
    }
    componentWillMount(){
      this.props.fetchBusinesRules();
    }

    render() {
      if(this.props.business_rules.length){
        this.cols = this.props.business_rules[0].cols;
        this.data = this.props.business_rules[0].rows; 
        return (
          <div className="maintain_business_rules_container">
            <h1>Maintain Business Rules</h1>
            <button onClick={this.handleInsertClick.bind(this)}>Insert</button>
            <button onClick={this.handleDeleteClick.bind(this)}>Delete</button>
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
    fetchBusinesRules: () => {
      dispatch(actionFetchBusinessRules())
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
