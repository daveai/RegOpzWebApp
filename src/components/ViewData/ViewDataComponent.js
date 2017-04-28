import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators, dispatch} from 'redux'
import TreeView from 'react-treeview'
import _ from 'lodash';
import {actionFetchDates} from '../../actions/ViewDataAction'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
require('../../../node_modules/react-treeview/react-treeview.css')
require('./ViewDataComponentStyle.css')
class ViewDataComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      drawerHandleStyle:{
        display:"block"
      },
      menuPanelStyle:{
        width:"0px",
        padding:"0"
      },
      startDate:null,

    }
    this.isMenuPanelOpen = false;
    this.dataSource = null;
  }
  componentWillMount(){
    this.props.fetchDates();
  }
  renderTreeView(){
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
                        <TreeView nodeLabel={label2} key={item + '|' + index} defaultCollapsed={true}>
                            {
                              node.month[item].map(function(date_item,date_index){
                                return (
                                  <div key={date_item + '|' + date_index} className="info">{date_item}</div>
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
            <select className="view_data_data_source_select">
              <option>Data Source</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
            <div className="clear"></div>
            <DatePicker
                selected={this.state.startDate}
                onChange={this.handleDateChange}
                placeholderText="Select start date"
                className="view_data_date_picker_input"
            />
            <DatePicker
                selected={this.state.startDate}
                onChange={this.handleDateChange}
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
      </div>
    )
  }
  handleDateChange(){

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchDates:()=>{
      dispatch(actionFetchDates())
    }
  }
}
function mapStateToProps(state){
  return {
    data_date_heads:state.data_date_heads
  }
}
const VisibleViewDataComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewDataComponent);
export default VisibleViewDataComponent;
