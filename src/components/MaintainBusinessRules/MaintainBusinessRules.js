import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, dispatch} from 'redux';
import ReactDOM from 'react-dom';
import DataGrid from 'react-datagrid';
import { actionFetchBusinessRules } from '../../actions/BusinessRulesAction';
import RightSlidePanel from '../RightSlidePanel/RightSlidePanel';
import ModalInstance from '../Modal/ModalInstance';
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
        this.SELECTED_ID = null;
        this.rightSlidePanel = null;
        this.shouldModifyArray = true;
        this.selectedData = {};
    }
    componentWillMount(){
      this.props.fetchBusinesRules();
    }
    componentDidMount(){

    }
    render() {
        if(!this.props.business_rules[0]){
          return (
            <h2>Loading...</h2>
          )
        } else {
          if (this.shouldModifyArray == true) {
              for(var i = 0; i < this.props.business_rules[0].cols.length; i++){
                  this.columns.push({name:this.props.business_rules[0].cols[i], width:200});
              }
              for(var i = 0; i < this.props.business_rules[0].rows.length; i++){
                  this.data.push({
                    id:i + 1,
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
          }
          return (
              <div className="datagrid_op_container">
                <h2>Business Rules Maintainance</h2>
              <div className="ops_icons">
                <div className="btn-group">
                  <button className="btn btn-circle btn-primary business_rules_ops_buttons">
                    <i className="fa fa-refresh"></i>
                  </button>
                </div>
                <div className="btn-group">
                  <button onClick={(event)=>{
                          if(this.SELECTED_ID == null)
                            this.alert.open("Please select a business rules");
                          else {
                            console.log("Selected data: ",this.selectedData);
                            this.rightSlidePanel.selectedData = this.selectedData;
                            this.rightSlidePanel.toggleMe("history");

                          }
                    }}
                    className="btn btn-circle btn-primary business_rules_ops_buttons">
                    <i className="fa fa-history"></i>
                  </button>
                </div>
                <div className="btn-group">
                  <button onClick={(event)=>{
                          if(this.SELECTED_ID == null)
                            this.alert.open("Please select a business rules");
                          else
                            this.rightSlidePanel.toggleMe("edit");
                    }} className="btn btn-circle btn-primary business_rules_ops_buttons">
                    <i className="fa fa-pencil"></i>
                  </button>
                </div>
              </div>
                <RightSlidePanel ref={(rightSlidePanel) => {
                    this.rightSlidePanel = rightSlidePanel;
                }} />
                <div className="dataGridHolder">
                    <DataGrid idProperty="id"
                         dataSource={this.data}
                         columns={this.columns}
                         style={{height: 500}}
                         selected={this.SELECTED_ID}
				         onSelectionChange={this.onCellSelectionChange.bind(this)}
                      />
                </div>
                 <ModalInstance ref={(alert) => {
                     this.alert = alert;
                   }} />
              </div>

          );
      }
    }
    onCellSelectionChange(newSelectedId, data){
      this.SELECTED_ID = newSelectedId;
      this.shouldModifyArray = false;
      this.selectedData = data;
      this.setState({})
      this.rightSlidePanel.close();
      console.log("Data: ",data);
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
