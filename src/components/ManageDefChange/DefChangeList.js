import React,{Component} from 'react';
import {connect} from 'react-redux';
import {dispatch} from 'redux';
import {actionFetchAuditList} from '../../actions/DefChangeAction';

require('./ManageDefChange.css');

class DefChangeList extends Component{

  constructor(props){
    super(props);

    this.fetchFlag=true;

  }

  componentWillMount(){
    this.props.fetchAuditList();

  }

  componentWillReceiveProps(nextProps){
    console.log("DefChangeList componentWillReceiveProps......",this.fetchFlag);
    if (this.fetchFlag){
      this.props.fetchAuditList();
    }
  }

  // componentWillUpdate(){
  //   if(this.fetchFlag){
  //     console.log("componentWillUpdate......",this.fetchFlag);
  //     this.props.fetchAuditList();
  //   }
  // }


  componentDidUpdate(){
    this.fetchFlag=!this.fetchFlag;
  }

  render(){
    const {audit_list}=this.props;
    if(typeof(audit_list)=='undefined'){
      return(<div> </div>);
    }
    console.log("Audit List........",audit_list);
    const msgList=audit_list.map((item,index)=>{
          //console.log(item,index);
          return(<li className="list_item_active"
                      key={index}
                      onClick={(event)=>{
                        this.props.onSelectListItem(item);
                        $(".list_item_select").removeClass("list_item_select");
                        //console.log(event.target);
                        //console.log($(event.target).closest("li"));
                        $(event.target).closest("li").find(".mail_list").addClass("list_item_select");
                      }
                    }>
                    <div className="mail_list">
                      <h3>{item.change_type}
                      <small>on {item.table_name} of record id {item.id}</small>
                      </h3>
                      {((item)=>{
                          if (item.change_type=="UPDATE"){
                              console.log("Update Info........",item.update_info);
                              const update_list=item.update_info.map((uitem,uindex)=>{
                                  console.log("Uitem.....",uitem);
                                  return (<div key={uindex}>
                                            <p>
                                              <span className="badge">{uitem.field_name}</span> &nbsp;
                                              <small>
                                                <i className="fa fa-circle-o"></i>&nbsp;<i>{uitem.old_val.toString().substring(0,30)} ...</i> &nbsp;
                                                <i className="fa fa-circle"></i>&nbsp;<i>{uitem.new_val.toString().substring(0,30)} ...</i>
                                              </small>
                                            </p>
                                          </div>);
                              });
                              return update_list;
                          }

                      })(item)}

                      <p><span className="badge">Comment</span>{item.maker_comment.toString().substring(0,125)} ...</p>
                    </div>
                </li>
              );
        });

      return(
        <ul className="list-unstyled msg_list def-change-list">
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
