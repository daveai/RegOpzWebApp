import React,{Component} from 'react';
import {dispatch} from 'redux';
import {connect} from 'react-redux';
import {Media} from 'react-bootstrap';
import {actionFetchRecordDetail} from '../../actions/DefChangeAction';

class DefChangePane extends Component{
  constructor(props){
    super(props);
    this.item=this.props.item;
    this.state={comment:null};
    this.fetchFlag=true;
  }

  componentWillReceiveProps(nextProps){
    this.item=nextProps.item;
  }

  componentWillUpdate(){
    if (this.fetchFlag){
      if(this.item){
        this.props.fetchRecordDetail(this.item.table_name,this.item.id);
        }
    }

  }

  componentDidUpdate(){
    if(this.item){
      //this.renderDefChangeDetails(this.props.record_detail,this.item);
      this.fetchFlag=!this.fetchFlag;
    }
  }

  render(){
    if(this.item==null){
      return(<div> </div>);
    }

    return(
      <div className="form-horizontal form-label-left">
        <div className="form-group">
          <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="comment">Reviwer Comment <span className="required">*</span></label>
          <div className="col-md-6 col-sm-6 col-xs-12">
            <textArea
                type="text"
                value={this.state.comment}
                minLength="20"
                maxLength="1000"
                required="required"
                className="form-control col-md-6 col-sm-12 col-xs-12"
                onChange={(event)=>{
                             this.setState({comment:event.target.value});
                           }
                         }
              />
          </div>
        </div>
        <div className="form-group">
          <div className="col-md-9 col-sm-9 col-xs-12 col-md-offset-3">
            <button type="button" className="btn btn-warning" onClick={this.handleReject.bind(this)}> Reject</button>
            <button type="button" className="btn btn-success" onClick={this.handleApprove.bind(this)}>Approve</button>
          </div>
       </div>
       <div className="clearfix" />
       <div className="ln_solid" />
       <div>
         <h3>{this.item.change_type}
           <small> on <span className="badge">{this.item.table_name}</span> of record id :
             <span className="badge"> {this.item.id}</span>.
             Change initiated by <span className="badge">{this.item.maker}</span> on {this.item.date_of_change}.
           </small>
         </h3>
         {((item)=>{
             if (item.change_type=="UPDATE"){
                 console.log("Update Info........",item.update_info);
                 const update_list=item.update_info.map((uitem,uindex)=>{
                     console.log("Uitem.....",uitem);
                     return (<div >
                                 <span className="badge">{uitem.field_name}</span>
                                 <small>
                                   <i className="fa fa-circle-o"></i><i>  {uitem.old_val}</i>
                                   <i className="fa fa-circle"></i><i>  {uitem.new_val}</i>
                                 </small>
                             </div>
                           );
                 });
                 return update_list;
             }
         })(this.item)}
         <p><span className="badge">Comment</span>{this.item.maker_comment}</p>
       </div>
       <div className="clearfix" />
       <div className="ln_solid" />
       <div id="def_change_detail"> {this.renderDefChangeDetails(this.props.record_detail,this.item)}</div>
      </div>
    );
  }

  renderDefChangeDetails(displayItem,auditItem){
    console.log("Inside renderDefChangeDetails........");
    // const divElement=document.getElementById("def_change_detail");
    // $(divElement).empty();
    if (typeof displayItem != 'undefined'){
    let key = Object.keys(displayItem);

    // for (let key of Object.keys(displayItem)){
        // let nodeFormGroup=document.createElement("div");
        // nodeFormGroup.className="form-group";
        //
        // let nodeLabel=document.createElement("label");
        // nodeLabel.className="control-label col-md-3 col-sm-3 col-xs-12";
        // nodeFormGroup.appendChild(nodeLabel);
        //
        // let element=document.createTextNode(key);
        // nodeLabel.appendChild(element);
        //
        // let nodeInputDiv=document.createElement("div");
        // nodeInputDiv.className="col-md-6 col-sm-6 col-xs-12";
        // nodeFormGroup.appendChild(nodeInputDiv);
        //
        // //nodeInput.className="col-md-5 col-sm-5 col-xs-12";
        // let nodeInput=document.createElement("input");
        // nodeInput.readOnly="true";
        // nodeInput.value=displayItem[key];
        // nodeInputDiv.appendChild(nodeInput);
        // //element=document.createTextNode(displayItem[key]);
        // //nodeFormGroup.appendChild(element);
        // divElement.appendChild(nodeFormGroup);
    // }
    return(
      <div className="dashboard-widget-content">
        <h3>Record Details</h3>
        <ul className="list-unstyled timeline widget">
        {
          key.map(function(item,index){
            console.log("inside record media body",item,displayItem[item]);
            return(
              <li className="panel_list_item_active">
                <div className="block">
                  <div className="block_content">
                    <h2 className="title"></h2>
                      <Media>
                        <Media.Left>
                          <span className="badge">{item}</span>
                        </Media.Left>
                        <Media.Body>
                          <p>
                            {((auditItem,column,presentValue)=>{
                                if (auditItem.change_type=="UPDATE"){
                                    console.log("audit item Update Info........",auditItem.update_info);
                                    let update_list=[];
                                    auditItem.update_info.map((uitem,uindex)=>{
                                        console.log("audit item Uitem.....",uitem);
                                        if(uitem.field_name==column){
                                          update_list.push(<div >
                                                      <small>
                                                        <i className="fa fa-circle-o"></i><i>  {uitem.old_val}</i>
                                                        <br></br>
                                                        <i className="fa fa-circle"></i><i>  {uitem.new_val}</i>
                                                      </small>
                                                  </div>
                                                );
                                        }
                                    });
                                    console.log("inside update details",update_list)
                                    return update_list.length >0 ? update_list : presentValue;
                                }
                                else {
                                  return presentValue;
                                }
                            })(auditItem,item,displayItem[item])}
                          </p>
                        </Media.Body>
                      </Media>
                    </div>
                </div>
              </li>
            )
          })
        }
      </ul>
      </div>
    )
  }
  else {
    return(<div></div>)
  }
  }

  handleReject(){
    this.item.status="REJECTED";
    this.item.checker_comment=this.state.comment;
    this.props.onApprove(this.item);
    this.setState({comment:null});
  }

  handleApprove(){
    this.item.status="APPROVED";
    this.item.checker_comment=this.state.comment;
    this.props.onReject(this.item);
    this.setState({comment:null});
  }

}

const mapDispatchToProps=(dispatch)=>{
  return{
    fetchRecordDetail:(table_name,id)=>{
      dispatch(actionFetchRecordDetail(table_name,id));
    }
  };
}

function mapStateToProps(state){
  return{
    record_detail:state.def_change_store.record_detail
  };
}

const VisibleDefChangePane=connect(mapStateToProps,mapDispatchToProps)(DefChangePane);
export default VisibleDefChangePane;
