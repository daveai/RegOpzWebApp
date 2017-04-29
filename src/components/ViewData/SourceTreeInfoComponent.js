import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators, dispatch} from 'redux'
import TreeView from 'react-treeview'
import moment from 'moment'
import { actionFetchSource, actionFetchReportFromDate } from '../../actions/ViewDataAction'
class SourceTreeInfoComponent extends Component {
  constructor(props){
    super(props);
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
            this.props.fetchSource(dateString);
          }
        }
      >
        {this.renderSources(this.props.sources)}
      </TreeView>
    )
  }
  renderSources(sources){
    let mySource = sources;
    if(mySource != 0){
      return(
        mySource.map(function(item,index){
          return(
            <div key={index} className="info">
              <a
                href="#"
                onClick={
                  (event) => {
                    event.preventDefault();
                    var bdate = moment(this.props.target, 'YYYY-MMMM-D').format('YYYYMMDD');
                    this.props.fetchReportFromDate(item.source_id, bdate , 0)
                  }
                }
              >
                {item.data_file_name}({item.source_id})
              </a>
            </div>
          )
        }.bind(this))
      )
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
