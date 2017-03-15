import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, dispatch} from 'redux';
import ReactDOM from 'react-dom';
import DataGrid from 'react-datagrid';
import { actionFetchBusinessRules } from '../../actions/BusinessRulesAction';
require('react-datagrid/dist/index.css');
require('./MaintainBusinessRules.css');
class MaintainBusinessRules extends Component {
    constructor(props) {
        super(props);
        this.data = [

        ]
        this.columns = [];
        /*for(var i = 0; i < 100; i++){
            this.columns.push({name:"n" + i,title:"N" + i})
        }*/

    }
    componentWillMount(){
      this.props.fetchBusinesRules();
    }
    componentDidMount(){

    }
    render() {
      alert(1);
        if(!this.props.business_rules[0]){
          return (
            <h2>Loading...</h2>
          )
        } else {
          for(var i = 0; i < this.props.business_rules[0].cols.length; i++){
              this.columns.push({name:this.props.business_rules[0].cols[i], width:200});
          }
          /*
          rule_execution_order:this.props.business_rules[0].rows[i].rule_execution_order,
          business_rule:this.props.business_rules[0].rows[i].business_rule,
          source_id:this.props.business_rules[0].rows[i].source_id,
          rule_description:this.props.business_rules[0].rows[i].rule_description,
          logical_condition:this.props.business_rules[0].rows[i].logical_condition,
          data_fields_list:this.props.business_rules[0].rows[i].data_fields_list,
          python_implementation:this.props.business_rules[0].rows[i].python_implementation,
          business_or_validation:this.props.business_rules[0].rows[i].business_or_validation,
          rule_type:this.props.business_rules[0].rows[i].rule_type,
          valid_from:this.props.business_rules[0].rows[i].valid_from,
          valid_to:this.props.business_rules[0].rows[i].valid_to,
          last_updated_by:this.props.business_rules[0].rows[i].last_updated_by
           */
          for(var i = 0; i < this.props.business_rules[0].rows.length; i++){
              this.data.push({
                id:i,
                index:i,
                rule_execution_order:this.props.business_rules[0].rows[i].rule_execution_order,
                business_rule:this.props.business_rules[0].rows[i].business_rule,
                source_id:this.props.business_rules[0].rows[i].source_id,
                rule_description:this.props.business_rules[0].rows[i].rule_description,
                logical_condition:this.props.business_rules[0].rows[i].logical_condition,
                data_fields_list:this.props.business_rules[0].rows[i].data_fields_list,
                python_implementation:this.props.business_rules[0].rows[i].python_implementation,
                business_or_validation:this.props.business_rules[0].rows[i].business_or_validation,
                rule_type:this.props.business_rules[0].rows[i].rule_type,
                valid_from:this.props.business_rules[0].rows[i].valid_from,
                valid_to:this.props.business_rules[0].rows[i].valid_to,
                last_updated_by:this.props.business_rules[0].rows[i].last_updated_by
              });
          }
          return (
              <div className="dataGridHolder">
                  <DataGrid idProperty="id"
                       dataSource={this.data}
                       columns={this.columns}
                    />
              </div>

          );
      }
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
