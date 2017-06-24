import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators, dispatch } from 'redux'
import TreeView from 'react-treeview'
import _ from 'lodash';
import Collapsible from '../CollapsibleModified/Collapsible';
import SourceTreeInfoComponent from './SourceTreeInfoComponent';
import {
  actionFetchDates,
  actionFetchReportFromDate,
  actionFetchSource,
  actionFetchReportLinkage,
  actionInsertSourceData,
  actionUpdateSourceData,
  actionDeleteFromSourceData,
  actionFetchDatesForReport
} from '../../actions/ViewDataAction'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import RegOpzFlatGrid from '../RegOpzFlatGrid/RegOpzFlatGrid';
import 'react-datepicker/dist/react-datepicker.css';
require('../../../node_modules/react-treeview/react-treeview.css')
require('./ViewDataComponentStyle.css')
import InfoModal from '../InfoModal/InfoModal';
import ModalAlert from '../ModalAlert/ModalAlert';
import { BASE_URL } from '../../Constant/constant';
import axios from 'axios';

class ViewDataComponentV2 extends Component {
  constructor(props){
    super(props)
    this.state = {
      startDate:null,
      endDate:null,
      sources:null
    }
    this.dataSource = null;
  }

  componentWillMount(){
    this.props.fetchDates(this.state.startDate ? moment(this.state.startDate).format('YYYYMMDD') : "19000101",this.state.endDate ? moment(this.state.endDate).format('YYYYMMDD') : "30200101", 'data_catalog');
  }

  render(){
    return(
      <div className="container view_data_container">
        <div className="col col-lg-6">
          <div className="row">
            <div className="input-group">
              <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleStartDateChange.bind(this)}
                  placeholderText="Select start date"
                  className="view_data_date_picker_input form-control"
              />
            </div>
          </div>
        </div>
        <div className="col col-lg-6">
          <div className="row">
            <div className="input-group">
              <DatePicker
                  selected={this.state.endDate}
                  onChange={this.handleEndDateChange.bind(this)}
                  placeholderText="Select end date"
                  className="view_data_date_picker_input form-control"
              />
            </div>
          </div>
        </div>
        <div className="clear"></div>
        {this.renderAccordions()}
      </div>
    )
  }

  handleStartDateChange(date){
    this.setState({startDate:date});
    if(this.props.apiFor == 'report')
      this.props.fetchDates(date ? moment(date).format('YYYYMMDD') : "19000101",this.state.endDate ? moment(this.state.endDate).format('YYYYMMDD') : "30200101",'report_catalog');
    else
      this.props.fetchDates(date ? moment(date).format('YYYYMMDD') : "19000101",this.state.endDate ? moment(this.state.endDate).format('YYYYMMDD') : "30200101", 'data_catalog');
  }

  handleEndDateChange(date){
    this.setState({endDate:date});
    if(this.props.apiFor == 'report')
      this.props.fetchDates(this.state.startDate ? moment(this.state.startDate).format('YYYYMMDD') : "19000101",date ? moment(date).format('YYYYMMDD') : "30200101",'report_catalog');
    else
      this.props.fetchDates(this.state.startDate ? moment(this.state.startDate).format('YYYYMMDD') : "19000101",date ? moment(date).format('YYYYMMDD') : "30200101", 'data_catalog');
  }

  renderAccordions(){
    this.dataSource = this.props.data_date_heads;

    if(this.dataSource == null){
      return(
        <h1>Loading...</h1>
      )
    } else {
      if(this.dataSource.length == 0){
        return(
          <h1>No data found</h1>
        )
      }
      return(
        <div>
          {
            this.dataSource.map((node, i) => {
              return(
                <Collapsible trigger={node.year} key={i}>
                  {
                    Object.keys(node.month).map((item,index) => {
                      return(
                        <Collapsible trigger={item} key={index}>
                          {
                              node.month[item].map((date_item,date_index) => {
                                return(
                                  <SourceTreeInfoComponent
                                    year={node.year}
                                    month={item}
                                    date={date_item}
                                    key={date_index}
                                  />
                                )
                              })

                          }
                        </Collapsible>
                      )
                    })
                  }
                </Collapsible>
              )
            })
          }
        </div>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDates:(startDate,endDate, table_name)=>{
      dispatch(actionFetchDates(startDate,endDate,table_name))
    },
    fetchReportFromDate:(source_id,business_date,page)=>{
      dispatch(actionFetchReportFromDate(source_id,business_date,page))
    },
    fetchSource:(business_date) => {
      dispatch(actionFetchSource(business_date))
    },
    fetchReportLinkage:(source_id,qualifying_key,business_date) => {
      dispatch(actionFetchReportLinkage(source_id,qualifying_key,business_date));
    },
    insertSourceData:(data,at) => {
      dispatch(actionInsertSourceData(data,at));
    },
    updateSourceData:(data) => {
      dispatch(actionUpdateSourceData(data));
    },
    deleteFromSourceData:(id,business_date,table_name, at) => {
      dispatch(actionDeleteFromSourceData(id,business_date,table_name, at));
    },
    fetchDatesForReport:(startDate,endDate)=>{
      dispatch(actionFetchDatesForReport(startDate,endDate))
    },
  }
}

function mapStateToProps(state){
  console.log("On mapState ", state.view_data_store);
  return {
    data_date_heads:state.view_data_store.dates,
    report:state.report_store,
    report_linkage:state.view_data_store.report_linkage
  }
}

const VisibleViewDataComponentV2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewDataComponentV2);

export default VisibleViewDataComponentV2;
