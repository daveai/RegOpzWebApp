import React,{Component} from 'react';
import {dispatch} from 'redux';
import {connect} from 'react-redux';
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
      this.renderDefChangeDetails(this.props.record_detail);
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
          <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="comment">Comment <span className="required">*</span></label>
          <div className="col-md-6 col-sm-6 col-xs-12">
            <textArea
                type="text"
                value={this.state.comment}
                minLength="20"
                maxLength="1000"
                required="required"
                className="form-control col-md-7 col-xs-12"
                onChange={(event)=>{
                             this.setState({comment:event.target.value});
                           }
                         }
              />
          </div>
        </div>
        <div className="form-group">
          <div className="col-md-9 col-sm-9 col-xs-12 col-md-offset-3">
            <button type="button" className="btn btn-primary" onClick={this.handleReject.bind(this)}> Reject</button>
            <button type="button" className="btn btn-success" onClick={this.handleApprove.bind(this)}>Approve</button>
          </div>
       </div>
       <div className="clearfix" />
       <div className="ln_solid" />
       <div>
         <h4>
            <p>
              User {this.item.maker} has performed operation : {this.item.change_type} on table {this.item.table_name} and record id {this.item.id}.
            </p>
            {((item)=>{
              //if (this.item.change_type=="UPDATE")
                //return (<p> The column  {item.field_name} has been updated from {item.old_val} to {item.new_val}. </p>);
                if (item.change_type=="UPDATE"){
                    console.log("Pane Update Info........",item.update_info);
                    const update_list=item.update_info.map((uitem,uindex)=>{
                        console.log("Pane Uitem.....",uitem);
                        return (<div>The column {uitem.field_name} has been updated from {uitem.old_val} to {uitem.new_val}.</div>);
                    });
                    return update_list;
                }
            })(this.item)}
            <p> Following comment has been provided:"{this.item.maker_comment}" </p>
         </h4>

       </div>
       <div className="clearfix" />
       <div className="ln_solid" />
       <div id="def_change_detail"> </div>

      </div>
    );
  }

  renderDefChangeDetails(displayItem){
    console.log("Inside renderDefChangeDetails........");
    const divElement=document.getElementById("def_change_detail");
    $(divElement).empty();

    for (let key of Object.keys(displayItem)){
        let nodeFormGroup=document.createElement("div");
        nodeFormGroup.className="form-group";

        let nodeLabel=document.createElement("label");
        nodeLabel.className="control-label col-md-3 col-sm-3 col-xs-12";
        nodeFormGroup.appendChild(nodeLabel);

        let element=document.createTextNode(key);
        nodeLabel.appendChild(element);

        let nodeInputDiv=document.createElement("div");
        nodeInputDiv.className="col-md-6 col-sm-6 col-xs-12";
        nodeFormGroup.appendChild(nodeInputDiv);

        //nodeInput.className="col-md-5 col-sm-5 col-xs-12";
        let nodeInput=document.createElement("input");
        nodeInput.readOnly="true";
        nodeInput.value=displayItem[key];
        nodeInputDiv.appendChild(nodeInput);
        //element=document.createTextNode(displayItem[key]);
        //nodeFormGroup.appendChild(element);
        divElement.appendChild(nodeFormGroup);
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
