import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, dispatch} from 'redux';
import ReactDOM from 'react-dom';
import DataGrid from 'react-datagrid';
import { actionFetchBusinessRules } from '../../actions/BusinessRulesAction';
import RightSlidePanel from '../RightSlidePanel/RightSlidePanel';
import ModalInstance from '../Modal/ModalInstance';
import RegOpzFlatGrid from '../RegOpzFlatGrid/RegOpzFlatGrid';
require('react-datagrid/dist/index.css');
require('./MaintainBusinessRules.css');
class MaintainBusinessRules extends Component {
    constructor(props) {
        super(props);
        this.cols = [
          {"display":"Rule Execution Order", "identifier":"rule_execution_order"},
          {"display":"Business Rule", "identifier":"business_rule"},
          {"display":"Python Implementation", "identifier":"python_implementation"}
        ];
        this.data = [
          {"rule_execution_order":1,"business_rule":"ACU","python_implementation":"abc=sdf"},
          {"rule_execution_order":1,"business_rule":"ACU","python_implementation":"abc=sdf"},
          {"rule_execution_order":1,"business_rule":"ACU","python_implementation":"abc=sdf"},
          {"rule_execution_order":1,"business_rule":"ACU","python_implementation":"abc=sdf"},
          {"rule_execution_order":1,"business_rule":"ACU","python_implementation":"abc=sdf"},
          {"rule_execution_order":1,"business_rule":"ACU","python_implementation":"abc=sdf"},
          {"rule_execution_order":1,"business_rule":"ACU","python_implementation":"abc=sdf"},
          {"rule_execution_order":1,"business_rule":"ACU","python_implementation":"abc=sdf"},
          {"rule_execution_order":1,"business_rule":"ACU","python_implementation":"abc=sdf"},
          {"rule_execution_order":1,"business_rule":"ACU","python_implementation":"abc=sdf"},
          {"rule_execution_order":11,"business_rule":"DBU","python_implementation":"abc=sdf"}
        ]
    }
    componentWillMount(){
      this.props.fetchBusinesRules();
    }

    render() {
      return (
        <div className="maintain_business_rules_container">
          <h1>Maintain Business Rules</h1>
          <RegOpzFlatGrid columns={this.cols} dataSource={this.data} />
        </div>
      )
    }

}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchBusinesRules: () => {
      dispatch(actionFetchBusinessRules())
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
