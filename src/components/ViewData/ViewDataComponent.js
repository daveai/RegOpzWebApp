import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators, dispatch} from 'redux'
import TreeView from 'react-treeview'
import _ from 'lodash';
import {
  actionFetchDates,
  actionFetchReportFromDate,
  actionFetchSource,
  actionFetchReportLinkage
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
      menuPanelHolderStyle:{
        width:"320px"
      },
      startDate:null,
      endDate:null
    }
    this.isMenuPanelOpen = false;
    this.dataSource = null;
    this.currentPage = 0;
    this.currentSourceId = null;
    this.currentBusinessDate = null;
    this.pages = 0;
  }
  componentWillMount(){
    this.props.fetchDates(this.state.startDate ? moment(this.state.startDate).format('YYYYMMDD') : "19000101",this.state.endDate ? moment(this.state.endDate).format('YYYYMMDD') : "30200101");
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
                                    onSelect={
                                      (item) => {
                                        console.log("Selected Items ", item);
                                        _this.currentSourceId = item.source_id;
                                        _this.currentBusinessDate = item.business_date;
                                        _this.props.fetchReportFromDate(_this.currentSourceId, _this.currentBusinessDate , _this.currentPage)
                                      }
                                    }
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
      if(this.props.report[0].cols.length != 0){
        this.pages = Math.ceil(this.props.report[0].count / 100);
        return(
          <div>
            <div className="ops_icons">
                <div className="btn-group">
                    <button
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Refresh"
                      className="btn btn-circle btn-primary business_rules_ops_buttons"
                      onClick={
                        (event) => {
                          this.props.fetchReportFromDate(this.currentSourceId, this.currentBusinessDate , this.currentPage)
                        }
                      }

                    >
                      <i className="fa fa-refresh"></i>
                    </button>
                </div>
                <div className="btn-group">
                    <button
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Insert"
                      onClick={
                        (event) => {

                        }
                      }
                      className="btn btn-circle btn-primary business_rules_ops_buttons"
                    >
                      <i className="fa fa-newspaper-o"></i>
                    </button>
                </div>
                <div className="btn-group">
                    <button
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Duplicate"
                      onClick={
                        (event) => {

                        }
                      }
                      className="btn btn-circle btn-primary business_rules_ops_buttons"
                    >
                      <i className="fa fa-copy"></i>
                    </button>
                </div>
                <div className="btn-group">
                    <button
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Delete"
                      onClick={
                        (event) => {

                        }
                      }
                      className="btn btn-circle btn-primary business_rules_ops_buttons"
                    >
                      <i className="fa fa-remove"></i>
                    </button>
                </div>
                <div className="btn-group">
                    <button
                      data-toggle="tooltip"
                      data-placement="top"
                      title="First"
                      onClick={
                        (event) => {
                            this.currentPage = 0;
                            this.props.fetchReportFromDate(this.currentSourceId, this.currentBusinessDate , this.currentPage)
                        }
                      }
                      className="btn btn-circle btn-primary business_rules_ops_buttons">
                      <i className="fa fa-fast-backward"></i>
                    </button>
                </div>
                <div className="btn-group">
                    <button
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Prev"
                      onClick={
                        (event) => {
                          if(this.currentPage > 0){
                            this.currentPage--;
                            this.props.fetchReportFromDate(this.currentSourceId, this.currentBusinessDate , this.currentPage);
                          }
                        }
                      }
                     className="btn btn-circle btn-primary business_rules_ops_buttons"
                     >
                      <i className="fa fa-chevron-left"></i>
                    </button>
                </div>
                <div className="btn-group reg_flat_grid_page_input">
                    <input
                      onChange={
                        (event) => {
                          this.currentPage = event.target.value;
                          this.forceUpdate();
                        }
                      }
                      onKeyPress={
                        (event) => {
                          if(event.key == "Enter"){
                            if(this.isInt(event.target.value)){
                              if(event.target.value > this.pages){
                                //this.modalInstance.open("Page does not exists");
                              } else {
                                this.props.fetchReportFromDate(this.currentSourceId, this.currentBusinessDate , this.currentPage);
                              }
                            } else {
                              //this.modalInstance.open("Please Enter a valid integer value");
                            }
                          }
                        }
                      }
                      type="text"
                      value={this.currentPage}
                      className="form-control" />
                </div>
                <div className="btn-group">
                    <button
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Next"
                      onClick={
                        (event) => {
                          if(this.currentPage < this.pages - 1){
                            this.currentPage++;
                            this.props.fetchReportFromDate(this.currentSourceId, this.currentBusinessDate , this.currentPage)
                          }
                        }
                      }
                      className="btn btn-circle btn-primary business_rules_ops_buttons"
                    >
                      <i className="fa fa-chevron-right"></i>
                    </button>
                </div>
                <div className="btn-group">
                    <button
                      data-toggle="tooltip"
                      data-placement="top"
                      title="End"
                      onClick={
                        (event) => {
                          this.currentPage = this.pages - 1;
                          this.props.fetchReportFromDate(this.currentSourceId, this.currentBusinessDate , this.currentPage)
                        }
                      }
                      className="btn btn-circle btn-primary business_rules_ops_buttons">
                      <i className="fa fa-fast-forward"></i>
                    </button>
                </div>
                <div className="btn-group">
                    <button
                      onClick={
                        (event) => {
                          this.props.fetchReportLinkage(1,31133304,20160930);
                          this.forceUpdate();
                        }
                      }
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Report Link"
                      className="btn btn-circle btn-primary business_rules_ops_buttons"
                    >
                      <i className="fa fa-link"></i>
                    </button>
                </div>
                <div className="btn-group">
                    <button
                      onClick={
                        (event) => {

                        }
                      }
                      data-toggle="tooltip"
                      data-placement="top"
                      title="History"
                      className="btn btn-circle btn-primary business_rules_ops_buttons"
                    >
                      <i className="fa fa-history"></i>
                    </button>
                </div>
                <div className="btn-group">
                    <button
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Export CSV"
                      className="btn btn-circle btn-primary business_rules_ops_buttons"
                      onClick={
                        (event) => {

                        }
                      }
                    >
                      <i className="fa fa-table"></i>
                    </button>
                </div>
                <div className="btn-group">
                    <button
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Deselect All"
                      className="btn btn-circle btn-primary business_rules_ops_buttons"
                      onClick={
                        (event) => {

                        }
                      }
                    >
                      <i className="fa fa-window-maximize"></i>
                    </button>
                </div>
            </div>
            <RegOpzFlatGrid
               columns={this.props.report[0].cols}
               dataSource={this.props.report[0].rows}
               onSelectRow={
                 (indexOfGrid) => {
                   console.log("Single select ", indexOfGrid);
                 }
               }
               onUpdateRow = {() => {}}
               onSort = {() => {}}
               onFilter = {() => {}}
               onFullSelect = {
                 (items) => {
                   console.log("Selected Items ", items);
                 }
               }
            />
          </div>
        )
      }
    } else {
      return (
        <h1>Loading...</h1>
      )
    }
  }
  isInt(value) {
    return !isNaN(value) &&
           parseInt(Number(value)) == value &&
           !isNaN(parseInt(value, 10));
  }
  render(){
    this.dataSource = this.props.data_date_heads;
    console.log("Report linkage ", this.props.report_linkage)
    if(typeof this.props.report_linkage != 'undefined' && this.props.report_linkage.length > 0) {
      console.log("Report linkage ", this.props.report_linkage)
    }
    return (
      <div
        onMouseMove={
          (event) => {
          }
        }
        className="view_data_dummy_area"
      >
        <div className="view_data_menu_panel_holder" style={this.state.menuPanelHolderStyle}>
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
                      },
                      menuPanelHolderStyle:{
                        width:"320px"
                      }
                    }
                  );
                } else {
                  this.setState(
                    {
                      menuPanelStyle:{
                        width:"0px",
                        padding:"0"
                      },
                      menuPanelHolderStyle:{
                        width:"0px"
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
    this.props.fetchDates(date ? moment(date).format('YYYYMMDD') : "19000101",this.state.endDate ? moment(this.state.endDate).format('YYYYMMDD') : "30200101");
  }
  handleEndDateChange(date){
    this.setState({endDate:date});
    this.props.fetchDates(this.state.startDate ? moment(this.state.startDate).format('YYYYMMDD') : "19000101",date ? moment(date).format('YYYYMMDD') : "30200101");
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchDates:(startDate,endDate)=>{
      dispatch(actionFetchDates(startDate,endDate))
    },
    fetchReportFromDate:(source_id,business_date,page)=>{
      dispatch(actionFetchReportFromDate(source_id,business_date,page))
    },
    fetchSource:(business_date) => {
      dispatch(actionFetchSource(business_date))
    },
    fetchReportLinkage:(source_id,qualifying_key,business_date) => {
      dispatch(actionFetchReportLinkage(source_id,qualifying_key,business_date));
    }
  }
}
function mapStateToProps(state){
  console.log("On mapState ", state.view_data_store);
  return {
    data_date_heads:state.view_data_store.length > 0 ? state.view_data_store[0].dates : [],
    report:state.report_store,
    report_linkage:state.view_data_store.length > 0 ? state.view_data_store[0].report_linkage : []
  }
}
const VisibleViewDataComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewDataComponent);
export default VisibleViewDataComponent;
