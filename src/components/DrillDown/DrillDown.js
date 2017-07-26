import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, Media, Label, Badge } from 'react-bootstrap';
import moment from 'moment';
import {connect} from 'react-redux';
import {bindActionCreators, dispatch} from 'redux';
import {
  actionDrillDown
} from '../../actions/CaptureReportAction';
import {
  actionDeleteRuleData
} from '../../actions/MaintainReportRuleAction';
import {actionFetchAuditList} from '../../actions/DefChangeAction';
import {
  Link,
  hashHistory
} from 'react-router';
import './DrillDownStyle.css';
class DrillDownComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      isModalOpen:false
    };
    this.report_id = this.props.location.query['report_id'];
    this.sheet = this.props.location.query['sheet'];
    this.cell = this.props.location.query['cell'];
    this.reporting_date = this.props.location.query['reporting_date'];
    this.drillDownResult = null;
    this.nextPropsCount = 0;
    this.linkageData = null;
  }
  componentWillMount(){
    this.props.drillDown(this.report_id,this.sheet,this.cell);
  }
  componentWillReceiveProps(nextProps){
    console.log('Inside componentWillReceiveProps');
    if (this.nextPropsCount == 0) {
      console.log('Inside if of componentWillReceiveProps');
      nextProps.drillDown(this.report_id,this.sheet,this.cell);;
      this.nextPropsCount = this.nextPropsCount + 1;
    }
  };
  render(){
    console.log('drill down result',this.props.drill_down_result)
    this.drillDownResult = this.props.drill_down_result;
    if( typeof this.props.audit_list != 'undefined' && this.props.audit_list.length ){
      this.linkageData = this.props.audit_list;
    } else {
      this.linkageData = null;
    }
    if(typeof(this.drillDownResult)=='undefined' || this.drillDownResult == null){
      return(
        <h1>Loading...</h1>
      )
    }
    return(
      <div className="container">
        <div className="row">
          <div className="col col-lg-12">
            {this.renderBreadCrump()}
          </div>
        </div>
        <div className="row">
          <div className="col col-lg-12">
            <h2>Cell Formula</h2>
            {
              this.renderCellAggcRef()
            }
          </div>
        </div>
        <div className="row">
          <div className="col col-lg-12">

                <table className="table-striped jambo_table bulk_action reg_table_drill_down">
                  <thead>
                    <tr>
                      <th>Cell Calculation Ref</th>
                      <th>Data Source</th>
                      <th>Aggregation Ref</th>
                      <th>Aggregation Function</th>
                      <th>Cell Business Rules</th>
                      <th>InUse</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.renderCellCalcRefSection()}
                  </tbody>
                </table>
          </div>
        </div>
        {this.showAddRuleButton()}
        <Modal
          show={this.state.isModalOpen}
          container={this}
          onHide={(event) => {
              this.setState({isModalOpen:false});
            }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Report Rule Change History for <h6>{this.report_id}</h6></Modal.Title>
          </Modal.Header>

          <Modal.Body>
            { this.renderChangeHistory(this.linkageData) }
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={(event) => {
                this.setState({isModalOpen:false})
              }}>Ok</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
  renderBreadCrump(){
    if (this.reporting_date == undefined || this.reporting_date == 'undefined') {
      return(
        <ol className="breadcrumb">
          <li><a href={'#/dashboard/maintain-report-rules'}>Maintain Report Rules</a></li>
          <li><a href={'#/dashboard/data-grid?report_id=' + this.report_id + '&reporting_date=' + this.reporting_date}>{`${this.report_id} (Manage Report Rules)`}</a></li>
          <li><a href={window.location.href}>{`${this.report_id} (${this.sheet})(${this.cell})`}</a></li>
        </ol>
      )
    }
    else{
      return(
        <ol className="breadcrumb">
          <li><a href="#/dashboard/view-report">View Report</a></li>
          <li><a href={'#/dashboard/data-grid?report_id=' + this.report_id + '&reporting_date=' + this.reporting_date} >{`${this.report_id} (${this.reporting_date})`}</a></li>
          <li><a href={window.location.href}>{`${this.report_id} (${this.sheet})(${this.cell})`}</a></li>
        </ol>
      )
    }
  }
  renderCellCalcRefSection(){
    if (this.drillDownResult.cell_rules.length == 0) {
      console.log('No cell rule section')
      return(
        <tr>
          <td>No rules defined for the cell {`[${this.report_id} -> ${this.sheet} -> ${this.cell}]`}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      )
    }
    else {
      console.log('cell rules exist')
      return(
        this.drillDownResult.cell_rules.map((item,index) => {
          return(
                this.renderCellCalcRefItem(item,index)
          )
        })
      )
    }
  }
  renderCellCalcRefItem(item,index){
    if(this.reporting_date == undefined || this.reporting_date == 'undefined'){
      this.filter = `cell_calc_ref='${item.cell_calc_ref}'`
      let requestType=item.dml_allowed=='Y'?'update':'view'
      return(
        <tr>
          <td>
            <Link to={`dashboard/maintain-report-rules/add-report-rules?request=${requestType}&index=${index}`}>{item.cell_calc_ref}</Link>
          </td>
          <td>{item.source_id}</td>
          <td><span style={{maxWidth: "204px", display: "block"}}>{item.aggregation_ref.toString().replace(/,/g,", ")}</span></td>
          <td>{item.aggregation_func}</td>
          <td>
            <span style={{maxWidth: "300px", display: "block"}}>
            <a href={`#/dashboard/view-data-on-grid?origin=drilldown&report_id=${this.report_id}&sheet_id=${this.sheet}&cell_id=${this.cell}&reporting_date=${this.reporting_date}&rules=${item.cell_business_rules}&cell_calc_ref=${item.cell_calc_ref}&source_id=${item.source_id}`}>{item.cell_business_rules.toString().replace(/,/g," ")}</a>
            </span>
          </td>
          <td>
            {
              ((in_use)=>{
                if(in_use=='Y'){
                  return(
                    <Label bsStyle="success">{in_use}</Label>
                  );
                }else{
                  return(<Label bsStyle="warning">{in_use}</Label>);
                }
              })(item.in_use)
            }
          </td>
            {
              ((dml_allowed)=>{
                if(dml_allowed=='Y'){
                  return(
                  <td>
                    <button id={item.id}
                            type="button"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="History"
                            className="btn btn-primary btn-xs"
                            onClick={(event)=>{
                                console.log("History call",event.target.id);
                                this.showHistory(event,"report_calc_def");
                              }
                            }
                    >
                      <i id={item.id} className="fa fa-history"></i>
                    </button>
                    <button id={item.id}
                            type="button"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Delete"
                            className="btn btn-warning btn-xs"
                            onClick={()=>{this.handleDelete(item,index)}}
                    >
                      <i id={item.id} className="fa fa-remove"></i>
                    </button>
                  </td>
                  );
                }else{
                  return(<td>
                            <button id={item.id}
                                  type="button"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="History"
                                  className="btn btn-primary btn-xs"
                                  onClick={(event)=>{
                                      console.log("History call");
                                      this.showHistory(event,"report_calc_def");
                                    }
                                  }
                            >
                              <i id={item.id} className="fa fa-history"></i>
                            </button>
                          </td>
                      );
                }
              })(item.dml_allowed)
            }
        </tr>
      )
    }
    else {
      return(
        <tr>
          <td><a href={`#/dashboard/view-data-on-grid?origin=drilldown&report_id=${this.report_id}&sheet_id=${this.sheet}&cell_id=${this.cell}&reporting_date=${this.reporting_date}&cell_calc_ref=${item.cell_calc_ref}&source_id=${item.source_id}`}>{item.cell_calc_ref}</a></td>
          <td>{item.source_id}</td>
          <td><span style={{maxWidth: "204px", display: "block"}}>{item.aggregation_ref.toString().replace(/,/g,", ")}</span></td>
          <td>{item.aggregation_func}</td>
          <td>
            <span style={{maxWidth: "300px", display: "block"}}>
            <a href={`#/dashboard/view-data-on-grid?origin=drilldown&report_id=${this.report_id}&sheet_id=${this.sheet}&cell_id=${this.cell}&reporting_date=${this.reporting_date}&rules=${item.cell_business_rules}&cell_calc_ref=${item.cell_calc_ref}&source_id=${item.source_id}`}>{item.cell_business_rules.toString().replace(/,/g," ")}</a>
            </span>
          </td>
          <td>
            {
              ((in_use)=>{
                if(in_use=='Y'){
                  return(
                    <Label bsStyle="success">{in_use}</Label>
                  );
                }else{
                  return(<Label bsStyle="warning">{in_use}</Label>);
                }
              })(item.in_use)
            }
          </td>
          <td>
            <button type="button"
                  id={item.id}
                  data-toggle="tooltip"
                  data-placement="top"
                  title="History"
                  className="btn btn-primary btn-xs"
                  onClick={(event)=>{
                      console.log("History call");
                      this.showHistory(event,"report_calc_def");
                    }
                  }
            >
              <i id={item.id} className="fa fa-history"></i>
            </button>
          </td>
        </tr>
      )
    }
  }
  renderCellAggcRef(){
    if (this.drillDownResult.comp_agg_rules.length == 0){
      console.log('When no agg rules found')
      if (this.reporting_date == undefined || this.reporting_date == 'undefined') {
        console.log('Maintain report rules')
        return(
          <div className="alert alert-success reg_cell_formula">
            <button type="button" className="btn btn-primary btn-sm" onClick={this.handleAddAggRule.bind(this)}>Add Fromula</button>
            No Rules defined for {`[${this.report_id} -> ${this.sheet} -> ${this.cell}]`}
          </div>
        )
      }
      else {
        console.log('Report drill down')
        return(
          <div className="alert alert-success reg_cell_formula">
            No Rules defined for {`[${this.report_id} -> ${this.sheet} -> ${this.cell}]`}
          </div>
        )
      }
    }
    else{
      console.log('With agg rules data available')
      let item = this.drillDownResult.comp_agg_rules[0]
      if(item.dml_allowed!='N'){
          return(
            <div className="alert alert-success reg_cell_formula">
              <Link to={encodeURI(`/dashboard/maintain-report-rules/add-report-agg-rules?request=update&report_id=${this.report_id}&sheet_id=${this.sheet}&cell_id=${this.cell}`)}>{item.comp_agg_ref}</Link>
              <span>   </span>
              {
                ((in_use)=>{
                  if(in_use=='Y'){
                    return(
                      <Label bsStyle="success">In Use</Label>
                    );
                  }else{
                    return(<Label bsStyle="warning">Not In Use</Label>);
                  }
                })(item.in_use)
              }
              <span>   </span>
              <button type="button"
                    id={item.id}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="History"
                    className="btn btn-primary btn-xs"
                    onClick={(event)=>{
                        console.log("History call");
                        this.showHistory(event,"report_comp_agg_def");
                      }
                    }
              >
                <i id={item.id} className="fa fa-history"></i>
              </button>
            </div>
          );
      }else {
        return(
          <div className="alert alert-success reg_cell_formula">
            <Link to={encodeURI(`/dashboard/maintain-report-rules/add-report-agg-rules?request=view&report_id=${this.report_id}&sheet_id=${this.sheet}&cell_id=${this.cell}`)}>{item.comp_agg_ref}</Link>
            <span>   </span>
              {
                ((in_use)=>{
                  if(in_use=='Y'){
                    return(
                      <Label bsStyle="success">In Use</Label>
                    );
                  }else{
                    return(<Label bsStyle="warning">Not In Use</Label>);
                  }
                })(item.in_use)
              }
              <span>   </span>
              <button type="button"
                    id={item.id}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="History"
                    className="btn btn-primary btn-xs"
                    onClick={(event)=>{
                        console.log("History call");
                        this.showHistory(event,"report_comp_agg_def");
                      }
                    }
              >
                <i id={item.id} className="fa fa-history"></i>
              </button>
          </div>
        );

      }
    }
  }

  handleAddAggRule(){
    hashHistory.push(`/dashboard/maintain-report-rules/add-report-agg-rules?request=add&report_id=${this.report_id}&sheet_id=${this.sheet}&cell_id=${this.cell}`);
  }
  showAddRuleButton(){
    if (this.reporting_date == undefined || this.reporting_date == 'undefined') {
      return(
        <div className="row">
          <div className="col col-lg-12">
            <button type="button" className="btn btn-primary" onClick={()=>{this.handleAddRule()}}>Add</button>
          </div>
        </div>
      )
    }
    else {
      return(
        <div className="row">
          <div className="col col-lg-12">
          </div>
        </div>
      )
    }
  }
  handleDelete(item,index){
    console.log('Inside delete',item)
    this.nextPropsCount = 0;
    this.props.deleteRuleData(item.id,'report_calc_def',index);
    //this.props.drillDown(this.report_id,this.sheet,this.cell);
  }
  handleAddRule(event){
    console.log('Inside add rule');
    hashHistory.push(`dashboard/maintain-report-rules/add-report-rules?request=add`
      +`&report_id=${this.report_id}&sheet=${this.sheet}&cell=${this.cell}`)
  }
  renderChangeHistory(linkageData){
    if(!linkageData || typeof(linkageData) == 'undefined' || linkageData == null || linkageData.length == 0)
      return(
        <div>
          <h4>No audit change report found!</h4>
        </div>
      )
    else {
      return(
        <div className="dashboard-widget-content">
          <ul className="list-unstyled timeline widget">
          {
            linkageData.map(function(item,index){
              return(
                <li>
                  <div className="block">
                    <div className="block_content">
                      <h2 className="title"></h2>
                        <Media>
                          <Media.Left>
                            <h3>{moment(item.date_of_change?item.date_of_change:"20170624T203000").format('DD')}</h3>
                            <h6>{moment(item.date_of_change?item.date_of_change:"20170624").format('MMM')},
                            <small>{moment(item.date_of_change?item.date_of_change:"20170624").format('YYYY')}</small></h6>
                          </Media.Left>
                          <Media.Body>
                            <Media.Heading>Buisness Rule Change for id: {item.id}
                              <h5>
                                <small>{item.change_reference}</small>
                              </h5>
                            </Media.Heading>
                            <h6><Badge>{item.change_type}</Badge> by {item.maker} on <small>{item.date_of_change}</small></h6>
                            <p>{item.maker_comment}</p>
                              <div><h5>Change Summary</h5>

                                  {((item)=>{
                                      if (item.change_type=="UPDATE"){
                                          console.log("Update Info........",item.update_info);
                                          const update_list=item.update_info.map((uitem,uindex)=>{
                                              console.log("Uitem.....",uitem);
                                              return (
                                                     <tr>
                                                        <th scope="row">{uindex + 1}</th>
                                                        <td><Label bsStyle="warning">{uitem.field_name}</Label></td>
                                                        <td>{uitem.new_val}</td>
                                                        <td>{uitem.old_val}</td>
                                                     </tr>
                                                   );
                                          });
                                          return(
                                            <table className="table table-hover table-content-wrap">
                                              <thead>
                                                <tr>
                                                  <th>#</th>
                                                  <th>Column</th>
                                                  <th>New Value</th>
                                                  <th>Old Value</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {update_list}
                                              </tbody>
                                            </table>
                                          );
                                      } else {
                                        return (<table className="table table-hover table-content-wrap">
                                                  <thead>
                                                    <tr>
                                                    </tr>
                                                  </thead>
                                                  <tbody>
                                                      <tr><td>This is a {item.change_type} request</td></tr>
                                                  </tbody>
                                                </table>
                                            )
                                      }
                                  })(item)}

                              </div>
                              <Media>
                                <Media.Left>
                                  {
                                    ((status)=>{
                                      if(status=="PENDING"){
                                        return(<Label bsStyle="primary">{status}</Label>)
                                      } else if (status=="REJECTED"){
                                        return(<Label bsStyle="warning">{status}</Label>)
                                      } else if(status=="APPROVED"){
                                        return(<Label bsStyle="success">{status}</Label>)
                                      } else {
                                        return(<Label>{status}</Label>)
                                      }
                                    }
                                  )(item.status)}
                                </Media.Left>
                                <Media.Body>
                                  <Media.Heading>Verification details</Media.Heading>
                                    {
                                      ((status)=>{
                                        if(status!="PENDING"){
                                          return(<h6>by {item.checker} on <small>{item.date_of_change}</small></h6>)
                                        }
                                      }
                                    )(item.status)}
                                  <p>{item.checker_comment}</p>
                                </Media.Body>
                              </Media>
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
  }
  showHistory(event,table_name){
    this.rulesIdAsSubQuery = `select id from ${table_name} where report_id= '${this.report_id}' and id='${event.target.id}'`;
    this.props.fetchAuditList(this.rulesIdAsSubQuery,table_name);
    this.setState({isModalOpen:true})
  }
}

function mapStateToProps(state){
  console.log("On map state", state);
  return{
    drill_down_result:state.captured_report.drill_down_result,
    audit_list:state.def_change_store.audit_list
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    drillDown:(report_id,sheet,cell) => {
      dispatch(actionDrillDown(report_id,sheet,cell));
    },
    deleteRuleData:(id,table_name,at) => {
      dispatch(actionDeleteRuleData(id,table_name,at));
    },
    fetchAuditList:(idList,tableName)=>{
      dispatch(actionFetchAuditList(idList,tableName));
    }
  }
}
const VisibleDrillDownComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(DrillDownComponent);
export default VisibleDrillDownComponent;
