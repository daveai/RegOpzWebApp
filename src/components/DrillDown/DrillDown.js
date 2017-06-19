import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators, dispatch} from 'redux'
import {
  actionDrillDown
} from '../../actions/CaptureReportAction'
import {
  actionDeleteRuleData
} from '../../actions/MaintainReportRuleAction'
import {
  Link,
  hashHistory
} from 'react-router';
import './DrillDownStyle.css'
class DrillDownComponent extends Component {
  constructor(props){
    super(props);
    this.report_id = this.props.location.query['report_id'];
    this.sheet = this.props.location.query['sheet'];
    this.cell = this.props.location.query['cell'];
    this.reporting_date = this.props.location.query['reporting_date'];
    this.drillDownResult = null;
    this.nextPropsCount = 0;
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
      return(
        <tr>
          <td>
            <Link to={`dashboard/maintain-report-rules/add-report-rules?request=update&index=${index}`}>{item.cell_calc_ref}</Link>
          </td>
          <td>{item.source_id}</td>
          <td><span style={{maxWidth: "204px", display: "block"}}>{item.aggregation_ref}</span></td>
          <td>{item.aggregation_func}</td>
          <td>
            <span style={{maxWidth: "300px", display: "block"}}>
            <a href={`#/dashboard/view-data-on-grid?origin=drilldown&report_id=${this.report_id}&sheet_id=${this.sheet}&cell_id=${this.cell}&reporting_date=${this.reporting_date}&rules=${item.cell_business_rules}&cell_calc_ref=${item.cell_calc_ref}&source_id=${item.source_id}`}>{item.cell_business_rules}</a>
            </span>
          </td>
          <td><button type="button" className="btn btn-round btn-warning" onClick={()=>{this.handleDelete(item,index)}}>Delete</button></td>
        </tr>
      )
    }
    else {
      return(
        <tr>
          <td><a href={`#/dashboard/view-data-on-grid?origin=drilldown&report_id=${this.report_id}&sheet_id=${this.sheet}&cell_id=${this.cell}&reporting_date=${this.reporting_date}&cell_calc_ref=${item.cell_calc_ref}&source_id=${item.source_id}`}>{item.cell_calc_ref}</a></td>
          <td>{item.source_id}</td>
          <td><span style={{maxWidth: "204px", display: "block"}}>{item.aggregation_ref}</span></td>
          <td>{item.aggregation_func}</td>
          <td>
            <span style={{maxWidth: "300px", display: "block"}}>
            <a href={`#/dashboard/view-data-on-grid?origin=drilldown&report_id=${this.report_id}&sheet_id=${this.sheet}&cell_id=${this.cell}&reporting_date=${this.reporting_date}&rules=${item.cell_business_rules}&cell_calc_ref=${item.cell_calc_ref}&source_id=${item.source_id}`}>{item.cell_business_rules}</a>
            </span>
          </td>
          <td></td>
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
            <button type="button" className="btn btn-primary btn-sm">Add Fromula</button>
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
      this.filter = `id=${item.id}`
      return(
        <div className="alert alert-success reg_cell_formula">
          <a href={`#/dashboard/view-data-on-grid?origin=drilldown&report_id=${this.report_id}&sheet_id=${this.sheet}&cell_id=${this.cell}&reporting_date=${this.reporting_date}&cell_calc_ref=${item.cell_calc_ref}&source_id=${item.source_id}&table=report_comp_agg_def&filter=${this.filter}`}>{item.comp_agg_ref}</a>
        </div>
      )
    }
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
    this.props.drillDown(this.report_id,this.sheet,this.cell);
  }
  handleAddRule(event){
    console.log('Inside add rule');
    hashHistory.push(`dashboard/maintain-report-rules/add-report-rules?request=add&report_id=${this.report_id}&sheet=${this.sheet}&cell=${this.cell}`)
  }
}

function mapStateToProps(state){
  console.log("On map state", state);
  return{
    drill_down_result:state.captured_report.drill_down_result
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    drillDown:(report_id,sheet,cell) => {
      dispatch(actionDrillDown(report_id,sheet,cell));
    },
    deleteRuleData:(id,table_name,at) => {
      dispatch(actionDeleteRuleData(id,table_name,at));
    }
  }
}
const VisibleDrillDownComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(DrillDownComponent);
export default VisibleDrillDownComponent;
