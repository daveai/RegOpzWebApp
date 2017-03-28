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

        ];
        this.data = [

        ]
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
            <RegOpzFlatGrid columns={this.cols} dataSource={this.data} />
          </div>
        )
      } else {
        return(
          <h1>Loading...</h1>
        )
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
