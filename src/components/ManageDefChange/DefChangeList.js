import React,{Component} from 'react';
import {connect} from 'react-redux';
import {dispatch} from 'redux';
import _ from 'lodash';
import {actionFetchAuditList} from '../../actions/DefChangeAction';

require('./ManageDefChange.css');

class DefChangeList extends Component{

  constructor(props){
    super(props);
    this.state = {
      selectedIndex: null ,
      searchTerm:null,
      queryResult:[]
    };
    this.fetchFlag = true;


  }

  componentWillMount(){
    this.props.fetchAuditList();
  }

  componentWillReceiveProps(nextProps){
    console.log("DefChangeList componentWillReceiveProps......",this.fetchFlag);
    if (this.fetchFlag) {
      this.props.fetchAuditList();
    }
  }

  componentWillUpdate(){

    console.log("Inside componentWillUpdate DefChangeList....");
  }


  componentDidUpdate(){
    this.fetchFlag =! this.fetchFlag;
  }

  handleSearch(event){
    let searchList = RegExp(`(${event.target.value.toLowerCase().replace(/[,+&\:\ ]$/,'').replace(/[,+&\:\ ]/g,'|')})`,'i');

    console.log("handleSearch",searchList)
    let queryResult=this.props.audit_list.filter((element)=>{
        return(
          element.id.toString().match(searchList)||
          element.change_type.match(searchList)||
          element.table_name.match(searchList)||
          element.change_reference.match(searchList)||
          element.date_of_change.match(searchList)||
          element.maker.match(searchList)||
          element.maker_comment.match(searchList)
        );
      }
    );
    //console.log("queryResult",queryResult)
    this.setState({searchTerm:event.target.value,queryResult:queryResult});
  }
  render(){
    let {audit_list}=this.props;
    if(!audit_list){
      return(<div> </div>);
    }
    let audit_list_with_search=this.state.searchTerm?this.state.queryResult:audit_list;
    console.log("Audit List........",audit_list);
    const msgList=audit_list_with_search.map((item,index)=>{
          //console.log(item,index);
          return(<li className={ this.state.selectedIndex == index ? "list_item_select" : "list_item_active" }
                      key={index}
                      onClick={(event)=>{
                        this.setState({ selectedIndex: index })
                        this.props.onSelectListItem(item);
                      }
                    }>
                    <div className="mail_list">
                      <h3>{item.change_type}
                      <small>on {item.table_name} of record id {item.id} [{item.change_reference.toString().substring(0,20)}...]</small>
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
                                                <i className="fa fa-circle-o"></i>&nbsp;<i>{uitem.old_val?uitem.old_val.toString().substring(0,30):""} ...</i> &nbsp;
                                                <i className="fa fa-circle"></i>&nbsp;<i>{uitem.new_val?uitem.new_val.toString().substring(0,30):""} ...</i>
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
        <div>
            <input className="form-control"
                  placeholder="Search (YYYY-MM-DD)"
                  value={this.state.searchTerm}
                  onChange={this.handleSearch.bind(this)}
            />
            <ul className="list-unstyled msg_list def-change-list">
              {msgList}
            </ul>
        </div>
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
