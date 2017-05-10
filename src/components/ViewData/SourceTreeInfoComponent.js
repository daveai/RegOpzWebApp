import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators, dispatch} from 'redux'
import TreeView from 'react-treeview'
import moment from 'moment'
import axios from 'axios'
import { actionFetchSource, actionFetchReportFromDate } from '../../actions/ViewDataAction'
import {BASE_URL} from '../../Constant/constant'
class SourceTreeInfoComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      sources:[]
    }
    this.selectedSourceId = null;
    this.selectedBusinessDate = null;
  }
  render(){
    return(
      <TreeView
        nodeLabel={this.props.label}
        key={this.props.key}
        target={this.props.target}
        defaultCollapsed={true}
        onClick={
          (event) => {
            let dateString = moment(event.target.getAttribute('target'), 'YYYY-MMMM-D').format('YYYYMMDD')
            //alert(dateString);
            //this.props.fetchSource(dateString);
            axios.get(BASE_URL + "view-data/get-sources?business_date=" + dateString)
            .then(function (response) {
              this.setState({
                sources:response.data
              })
            }.bind(this))
            .catch(function (error) {
              console.log(error);
            });
          }
        }
      >
        {this.renderSources(this.state.sources)}
      </TreeView>
    )
  }
  renderSources(sources){
    if(sources.length != 0){
      return(
        sources.map(function(item,index){
          return(
            <div key={index} className="info">
              <a
                href="#"
                onClick={
                  (event) => {
                    event.preventDefault();
                    var bdate = moment(this.props.target, 'YYYY-MMMM-D').format('YYYYMMDD');
                    this.selectedSourceId = item.source_id;
                    this.selectedBusinessDate = bdate;
                    this.props.onSelect({source_id:this.selectedSourceId, business_date:this.selectedBusinessDate})
                    
                  }
                }
              >
                {item.data_file_name}({item.source_id})
              </a>
            </div>
          )
        }.bind(this))
      )
    } else {
      return("Loading...")
    }
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchSource:(business_date) => {
      dispatch(actionFetchSource(business_date))
    },
    fetchReportFromDate:(source_id,business_date,page) => {
      dispatch(actionFetchReportFromDate(source_id,business_date,page))
    }
  }
}
function mapStateToProps(state){
  return {
    sources:state.sources
  }
}
const VisibleSourceTreeInfoComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(SourceTreeInfoComponent);
export default VisibleSourceTreeInfoComponent;
