import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {bindActionCreators, dispatch} from 'redux';
import { WithContext as ReactTags } from 'react-tag-input';
import {
  Link,
  hashHistory
  } from 'react-router';
import {
  actionFetchSourceFeedColumnList,
  actionInsertSourceData,
  actionUpdateSourceData
} from '../../../actions/MaintainSourcesAction';
import './AddSources.css';
class AddSources extends Component {
  constructor(props){
    super(props);
    this.state = {
        rulesTags: [],
        aggRefTags:[],
        rulesSuggestions: [],
        fieldsSuggestions:[],
        form:{
          source_table_name:this.props.location.query['source_table_name'],
          source_id:this.props.location.query['source_id'],
          country:this.props.location.query['country'],
          id:this.props.location.query['id'],
          source_description:this.props.location.query['source_description'],
          source_file_name:this.props.location.query['source_file_name'],
          source_file_delimiter:this.props.location.query['source_file_delimiter'],
          last_updated_by:this.props.location.query['last_updated_by']
        },
        requestType: this.props.location.query['request'],
        readOnly: this.props.location.query['request']=="update"?"readonly":""
    };
  }
  componentWillMount(){
    this.props.fetchSourceFeedColumnList(this.props.location.query['source_table_name']);
  }
  render(){
    console.log('field list',this.props.source_feeds);
    if(typeof(this.props.source_feeds.source_table_columns) == 'undefined'){
      return(
        <h1>Loading...</h1>
      )
    } else {
      console.log('in else',this.props.source_feeds.source_table_columns);
      console.log('Before render ',this.state.requestType,this.state.form.country,this.state.form);
      return(
        <div className="row">
          <div className="col col-lg-12">
            <div className="x_title">
              <h2>Maintain Source <small>Add a new source</small></h2>
              <div className="clearfix"></div>
            </div>
            <div className="x_content">
              <br />
              <form className="form-horizontal form-label-left" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                  <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="first-name">Source Table Name <span className="required">*</span></label>
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <input
                      placeholder="Enter source table name"
                      value={this.state.form.source_table_name}
                      type="text"
                      readOnly={this.state.readOnly}
                      required="required"
                      className="form-control col-md-7 col-xs-12"
                      onChange={
                        (event) => {
                          this.state.form.source_table_name = event.target.value;
                        }
                      }
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="first-name">Source ID <span className="required">*</span></label>
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <input
                      value={this.state.form.source_id}
                      type="text"
                      placeholder="System Reference ID"
                      required="required"
                      className="form-control col-md-7 col-xs-12"
                      readOnly="readonly"
                      />
                  </div>
                </div>

                <div className="form-group">
                  <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="first-name">Source Description <span className="required">*</span></label>
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <input
                      placeholder="Enter source Description"
                      defaultValue={this.state.form.source_description}
                      type="text"
                      required="required"
                      className="form-control col-md-7 col-xs-12"
                      onChange={
                        (event) => {
                          this.state.form.source_description = event.target.value;
                        }
                      }
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="first-name">Source File Name <span className="required">*</span></label>
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <input
                      placeholder="Enter source File Name"
                      defaultValue={this.state.form.source_file_name}
                      type="text"
                      required="required"
                      className="form-control col-md-7 col-xs-12"
                      onChange={
                        (event) => {
                          this.state.form.source_file_name = event.target.value;
                        }
                      }
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="first-name">Source File Data Delimiter <span className="required">*</span></label>
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <input
                      placeholder="Enter source File Data Delimiter"
                      defaultValue={this.state.form.source_file_delimiter}
                      type="text"
                      required="required"
                      className="form-control col-md-7 col-xs-12"
                      onChange={
                        (event) => {
                          this.state.form.source_file_delimiter = event.target.value;
                        }
                      }
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="first-name">Last Updated By <span className="required">*</span></label>
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <input value={this.state.form.last_updated_by}  readOnly="readonly" type="text" className="form-control col-md-7 col-xs-12" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="first-name">Country <span className="required">*</span></label>
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <select
                      value={this.state.form.country}
                      className="form-control"
                      onChange={
                        (event) => {
                          this.state.form.country = event.target.value;
                        }
                      }
                      >
                      <option>Choose option</option>
                      <option value={"SG"}>SG</option>
                      <option value={"HK"}>HK</option>
                    </select>
                  </div>
                </div>

                <div className="x_title">
                  <h2>Source Table Definition <small>Column list</small></h2>
                  <div className="clearfix"></div>
                </div>
                {
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Field</th>
                            <th>Type</th>
                            <th>Nullable</th>
                            <th>Key</th>
                            <th>Default</th>
                            <th>Extra</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            this.props.source_feeds.source_table_columns.map(function(col,colindex){
                              return(
                                <tr>
                                  <td>{col.Field}</td>
                                  <td>{col.Type}</td>
                                  <td>{col.Null}</td>
                                  <td>{col.Key}</td>
                                  <td>{col.Default}</td>
                                  <td>{col.Extra}</td>
                                </tr>
                                )
                              }.bind(this))
                          }
                        </tbody>
                      </table>
                }

                <div className="form-group">
                  <div className="col-md-9 col-sm-9 col-xs-12 col-md-offset-3">
                    <div className="clearfix"></div>
                    <button type="button" className="btn btn-primary" onClick={()=>{this.handleCancel()}}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-success">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )
    }
  }
  showTableFieldsList(){
    console.log(this.props.source_feeds.source_table_columns.length);
    if(this.props.source_feeds.source_table_columns.length >0) {
      this.props.source_feeds.source_table_columns.map(function(col,colindex){
        return(
          <tr>
            <td>{col.Field}</td>
            <td>{col.Type}</td>
            <td>{col.Null}</td>
            <td>{col.Key}</td>
            <td>{col.Default}</td>
            <td>{col.Extra}</td>
          </tr>
          )
        }.bind(this))
      }
  }
  handleSubmit(event){
    console.log('inside submit',this.state.form);
    event.preventDefault();

    let data = {
      table_name:"data_source_information",
      update_info:this.state.form
    };
    data.update_info.source_id=32767;
    console.log('inside submit',this.state.form);
    if(this.state.requestType == "add"){
      this.props.insertSourceData(data);
    }
    else{
      this.props.updateSourceData(this.state.form.id,data);
    }

    hashHistory.push("/dashboard/maintain-sources");
  }
  handleCancel(event){
    console.log('inside cancel');
    hashHistory.push("/dashboard/maintain-sources")
  }
}
function mapStateToProps(state){
  console.log("On map state of Add report rule",state);
  return{
    source_feeds:state.source_feeds,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchSourceFeedColumnList:(table_name) => {
      dispatch(actionFetchSourceFeedColumnList(table_name));
    },
    insertSourceData:(data) => {
      dispatch(actionInsertSourceData(data));
    },
    updateSourceData:(id,data) => {
      dispatch(actionUpdateSourceData(id,data));
    }
  }
}
const VisibleAddSources = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSources);
export default VisibleAddSources;
