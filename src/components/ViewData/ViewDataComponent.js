import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators, dispatch} from 'redux'
import TreeView from 'react-treeview'
import _ from 'lodash';
import {
  actionFetchDates,
  actionFetchReportFromDate,
  actionFetchSource
} from '../../actions/ViewDataAction'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import RegOpzFlatGrid from '../RegOpzFlatGrid/RegOpzFlatGrid';
import 'react-datepicker/dist/react-datepicker.css';
require('../../../node_modules/react-treeview/react-treeview.css')
require('./ViewDataComponentStyle.css')
import SourceTreeInfoComponent from './SourceTreeInfoComponent';
class ViewDataComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      drawerHandleStyle:{
        display:"block"
      },
      menuPanelStyle:{
        width:"0px",
        padding:"0px"
      },
      startDate:null,
      endDate:null
    }
    this.isMenuPanelOpen = false;
    this.dataSource = null;
  }
  componentWillMount(){
    this.props.fetchDates();
  }
  renderTreeView(){
    var _this = this;
    if(this.dataSource != null){
      return(
        <div className="view_data_tree_view_holder">
         {this.dataSource.map((node, i) => {
           const year = node.year;
           const label = <span className="node">{year}</span>;
           return (
             <TreeView key={year + '|' + i} nodeLabel={label} defaultCollapsed={true}>
               {
                   Object.keys(node.month).map(function(item,index){
                     const label2 = <span className="node">{item}</span>;

                      return(
                        <TreeView
                          nodeLabel={label2}
                          key={item + '|' + index}
                          defaultCollapsed={true}
                        >
                            {
                              node.month[item].map(function(date_item,date_index){
                                const label3 = <span className="node">{date_item}</span>;
                                return (
                                  <SourceTreeInfoComponent
                                    label={label3}
                                    target={node.year + "-" + item + "-" + date_item}
                                    key={date_item + '|' + date_index}
                                  />
                                )
                              })
                            }
                        </TreeView>
                      )
                   })

              }
             </TreeView>
           );
         })}
       </div>
      )
    } else {
      return (
        <h2>Loading...</h2>
      )
    }
  }
  renderGridAtRightPane(){

    if(this.props.report.length != 0 ){
      console.log("On render grid",this.props.report[0].rows);
      if(this.props.report[0].cols.length != 0){
        return(
          <RegOpzFlatGrid
             columns={this.props.report[0].cols}
             dataSource={this.props.report[0].rows}
             onSelectRow={() => {}}
             onUpdateRow = {() => {}}
             onSort = {() => {}}
             onFilter = {() => {}}
             onFullSelect = {() => {}}
          />
        )
      }
    } else {
      return (
        <h1>Loading...</h1>
      )
    }
  }
  render(){
    this.dataSource = this.props.data_date_heads;
    return (
      <div
        onMouseMove={
          (event) => {
          }
        }
        className="view_data_dummy_area"
      >
        <div className="view_data_menu_panel_holder">
          <div
            className="view_data_menu_panel"
            style={this.state.menuPanelStyle}
          >
            <div className="clear"></div>
            <DatePicker
                selected={this.state.startDate}
                onChange={this.handleStartDateChange.bind(this)}
                placeholderText="Select start date"
                className="view_data_date_picker_input"
            />
            <DatePicker
                selected={this.state.endDate}
                onChange={this.handleEndDateChange.bind(this)}
                placeholderText="Select end date"
                className="view_data_date_picker_input"
            />
            <div className="clear"></div>
            {this.renderTreeView()}
          </div>
          <div className="view_data_drawer_handle_default"
            style={this.state.drawerHandleStyle}
            onClick={
              (event) => {
                this.isMenuPanelOpen = ~this.isMenuPanelOpen
                if(this.isMenuPanelOpen){
                  this.setState(
                    {
                      menuPanelStyle:{
                        width:"280px",
                        padding:"5px"
                      }
                    }
                  );
                } else {
                  this.setState(
                    {
                      menuPanelStyle:{
                        width:"0px",
                        padding:"0"
                      }
                    }
                  );
                }

              }
            }
          >
          </div>
        </div>
        {this.renderGridAtRightPane()}
      </div>
    )
  }
  handleStartDateChange(date){
    this.setState({startDate:date});
  }
  handleEndDateChange(date){
    this.setState({endDate:date});
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchDates:()=>{
      dispatch(actionFetchDates())
    },
    fetchReportFromDate:(source_id,business_date,page)=>{
      dispatch(actionFetchReportFromDate(source_id,business_date,page))
    },
    fetchSource:(business_date) => {
      dispatch(actionFetchSource(business_date))
    }
  }
}
function mapStateToProps(state){
  console.log("On mapState ", state.report_store);
  return {
    data_date_heads:state.view_data_store,
    report:state.report_store,
  }
}
const VisibleViewDataComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewDataComponent);
export default VisibleViewDataComponent;
