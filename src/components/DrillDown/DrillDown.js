import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators, dispatch} from 'redux'
import {
  actionDrillDown
} from '../../actions/CaptureReportAction'
import './DrillDownStyle.css'
class DrillDownComponent extends Component {
  constructor(props){
    super(props);
    this.report_id = this.props.location.query['report_id'];
    this.sheet = this.props.location.query['sheet'];
    this.cell = this.props.location.query['cell'];
    this.reporting_date = this.props.location.query['reporting_date'];
    this.drillDownResult = null;
  }
  componentWillMount(){
    this.props.drillDown(this.report_id,this.sheet,this.cell);
  }
  render(){
    this.drillDownResult = this.props.drill_down_result;
    if(this.drillDownResult == null){
      return(
        <h1>Loading...</h1>
      )
    }
    if(this.drillDownResult.agg_rules.length == 0 && this.drillDownResult.cell_rules.length == 0 && this.drillDownResult.comp_agg_rules.length == 0){
      return(
        <div className="container">
          <div className="row">
            <div className="col col-lg-12">
              {this.renderBreadCrump()}
            </div>
            <div className="col col-lg-12">
              <h2>Cell Formula</h2>
              <div className="alert alert-success reg_cell_formula">
                <button type="button" className="btn btn-primary btn-sm">Add Fromula</button> No Rules defined for {`[${this.report_id} -> ${this.sheet} -> ${this.cell}]`}

              </div>
                <table className="table table-responsive reg_table_drill_down">
                  <thead>
                    <tr>
                      <th>Cell Calculation Ref</th>
                      <th>Data Source</th>
                      <th>Aggregation Ref</th>
                      <th>Aggregation Function</th>
                      <th>Cell Business Rules</th>
                    </tr>
                  </thead>
                  <tbody>

                  </tbody>
                </table>
            </div>
          </div>
        </div>
      )
    } else {
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
                this.drillDownResult.comp_agg_rules.map((item,index) => {
                  return(
                      this.renderCellAggcRef(item)
                  )
                })
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
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      this.drillDownResult.cell_rules.map((item,index) => {
                        return(
                              this.renderCellCalcRef(item)
                        )
                      })
                    }
                    </tbody>
                  </table>

            </div>
          </div>
          <div className="row">
            <div className="col col-lg-12">
              <button type="button" className="btn btn-primary">Add</button>
            </div>
          </div>
        </div>
      );
    }
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
  renderCellCalcRef(item){
    if(this.reporting_date == undefined || this.reporting_date == 'undefined'){
      this.filter = `cell_calc_ref='${item.cell_calc_ref}'`
      return(
        <tr>
          <td><a href={`#/dashboard/view-data-on-grid?origin=drilldown&report_id=${this.report_id}&sheet_id=${this.sheet}&cell_id=${this.cell}&reporting_date=${this.reporting_date}&cell_calc_ref=${item.cell_calc_ref}&source_id=${item.source_id}&table=report_calc_def&filter=${this.filter}`}>{item.cell_calc_ref}</a></td>
          <td>{item.source_id}</td>
          <td><span style={{maxWidth: "204px", display: "block"}}>{item.aggregation_ref}</span></td>
          <td>{item.aggregation_func}</td>
          <td><a href={`#/dashboard/view-data-on-grid?origin=drilldown&report_id=${this.report_id}&sheet_id=${this.sheet}&cell_id=${this.cell}&reporting_date=${this.reporting_date}&rules=${item.cell_business_rules}&cell_calc_ref=${item.cell_calc_ref}&source_id=${item.source_id}`}>{item.cell_business_rules}</a></td>
          <td><button type="button" className="btn btn-round btn-warning">Delete</button></td>
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
          <td><a href={`#/dashboard/view-data-on-grid?origin=drilldown&report_id=${this.report_id}&sheet_id=${this.sheet}&cell_id=${this.cell}&reporting_date=${this.reporting_date}&rules=${item.cell_business_rules}&cell_calc_ref=${item.cell_calc_ref}&source_id=${item.source_id}`}>{item.cell_business_rules}</a></td>
        </tr>
      )
    }
  }
  renderCellAggcRef(item){
    if(this.reporting_date == undefined || this.reporting_date == 'undefined'){
      this.filter = `id=${item.id}`
      return(
        <div className="alert alert-success reg_cell_formula"><a href={`#/dashboard/view-data-on-grid?origin=drilldown&report_id=${this.report_id}&sheet_id=${this.sheet}&cell_id=${this.cell}&reporting_date=${this.reporting_date}&cell_calc_ref=${item.cell_calc_ref}&source_id=${item.source_id}&table=report_comp_agg_def&filter=${this.filter}`}>{item.comp_agg_ref}</a></div>
      )
    }
    else {
      return(
        <tr>
          <td>{item.comp_agg_ref}</td>
        </tr>
      )
    }
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
    }
  }
}
const VisibleDrillDownComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(DrillDownComponent);
export default VisibleDrillDownComponent;
