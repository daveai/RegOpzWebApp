import React,{Component} from 'react';
import {connect} from 'react-redux';
import {dispatch} from 'redux';
import {actionFetchAuditList} from '../../actions/DefChangeAction';

require('./ManageDefChange.css');

class DefChangeList extends Component{

  constructor(props){
    super(props);

    //this.messageList=['abcd','efgh','ijkl'];

  }

  componentWillMount(){
    this.props.fetchAuditList();

  }

  render(){
    const {audit_list}=this.props;
    if(typeof(audit_list)=='undefined'){
      return(<div> </div>);
    }
    console.log("Audit List........",audit_list);
    const msgList=audit_list.map((item,index)=>{
          //console.log(item,index);
          return(<li className="list_item_active" key={index} onClick={(event)=>{this.props.onSelectListItem(item)}}>
                    <div>
                      User {item.maker} has performed operation : {item.change_type} on table {item.table_name} and record id {item.id}.

                      {((item)=>{
                          if (item.change_type=="UPDATE"){
                              console.log("Update Info........",item.update_info);
                              const update_list=item.update_info.map((uitem,uindex)=>{
                                  console.log("Uitem.....",uitem);
                                  return (<div key={uindex}>The column {uitem.field_name} has been updated from {uitem.old_val} to {uitem.new_val}.</div>);
                              });
                              return update_list;
                          }

                      })(item)}
                      Following comment has been provided:"{item.maker_comment}"
                    </div>
                </li>
              );
        });

      return(
        <ul className="list-unstyled msg_list">
          {msgList}
        </ul>
      );

  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    fetchAuditList:()=>{
      dispatch(actionFetchAuditList());
    }
  };
}

function mapStateToProps(state){
  return{
    audit_list:state.def_change_store.audit_list
  };
}

const VisibleDefChangeList=connect(mapStateToProps,mapDispatchToProps)(DefChangeList);

export default VisibleDefChangeList;
