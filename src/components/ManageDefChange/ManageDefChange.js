import React,{Component} from 'react';
import {dispatch} from 'redux';
import {connect} from 'react-redux';
import DefChangeList from './DefChangeList';
import DefChangePane from './DefChangePane';
import {actionFetchAuditList,
        actionPostAuditDecision
        } from '../../actions/DefChangeAction';

require('./ManageDefChange.css');

class ManageDefChange extends Component{
  constructor(props){
    super(props);
    this.state={selectedListItem:null};
  }

  render(){
    return(
      <div className="row form-container">
        <div className="col-md-12">
          <div className="x_panel">
            <div className="x_title">
              <h2>Manage Definition <small> Approve changes to report definiton</small></h2>
              <div className="clearfix"></div>
            </div>
            <div className="x_content">
              <div className="row">
                <div className="col-sm-3 mail_list_column">
                    <DefChangeList onSelectListItem={this.handleSelectItem.bind(this)} />
                </div>
                <div className="col-sm-9 mail_view">
                    <DefChangePane
                      item={this.state.selectedListItem}
                      onApprove={this.handleDecision.bind(this)}
                      onReject={this.handleDecision.bind(this)}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    );
  }

  handleSelectItem(item){
    console.log('onSelectListItem.......',item);
    this.setState({selectedListItem:item});
  }

  handleDecision(item){
  this.props.postAuditDecision(item);
  this.setState({selectedListItem:null});

  }

  // handleReject(item){
  //   let item=this.state.selectedListItem;
  //   item.status="REJECTED";
  //   this.props.postAuditDecision(item);
  //   this.setState({selectedListItem:null});
  //
  // }

}

const mapDispatchToProps=(dispatch)=>{
  return{
    postAuditDecision:(data)=>{
      dispatch(actionPostAuditDecision(data));
    }
  };
}

const VisibleManageDefChange=connect(null,mapDispatchToProps)(ManageDefChange);
export default VisibleManageDefChange;
