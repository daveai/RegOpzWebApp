import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {bindActionCreators, dispatch} from 'redux';
import DatePicker from 'react-datepicker';
import {
  Link,
  hashHistory
} from 'react-router';
import { WithContext as ReactTags } from 'react-tag-input';
import {
  actionFetchBusinessRulesBySourceId,
  actionFetchSources,
  actionFetchSourceColumnList,
  actionInsertRuleData,
  actionUpdateRuleData
} from '../../../actions/MaintainReportRuleAction';
import {
    actionFetchAuditList
} from '../../../actions/DefChangeAction';
import './AddReportRules.css';

class AddReportRules extends Component {
  constructor(props) {
    super(props);
    this.state = {
        rulesTags: [],
        aggRefTags:[],
        rulesSuggestions: [],
        fieldsSuggestions:[],
        requestType: this.props.location.query['request'],
        ruleIndex: this.props.location.query['index'],
        readOnly: null,
        viewOnly:null,
        form:{
          cell_calc_ref:null,
          report_id: this.props.location.query['report_id'],
          sheet_id: this.props.location.query['sheet'],
          cell_id:this.props.location.query['cell'],
          source_id:null,
          cell_business_rules:null,
          aggregation_ref:null,
          aggregation_func:null,
          valid_from:null,
          valid_to:null,
          last_updated_by:null,
          id:null,
          },
        audit_form:{
          comment:null
        }
    };
    this.state.readOnly = this.state.requestType=="update"|| this.state.requestType=="view"?"readonly":"";
    this.state.viewOnly=this.state.requestType=="view"?"readonly":"";

    this.shouldUpdate = true;

    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);

    this.handleAggRefDelete = this.handleAggRefDelete.bind(this);
    this.handleAggRefAddition = this.handleAggRefAddition.bind(this);
    this.handleAggRefDrag = this.handleAggRefDrag.bind(this);

    this.searchAnywhere = this.searchAnywhere.bind(this);

    this.writeOnly = _.find(this.props.privileges, {permission: "Edit Report Rules"}) ? true : false;
  }

  componentWillMount() {
    this.props.fetchSources();
    if(typeof this.state.ruleIndex != 'undefined' && typeof this.props.drill_down_result != 'undefined') {
      Object.assign(this.state.form , this.props.drill_down_result.cell_rules[this.state.ruleIndex]);
      this.props.fetchBusinessRulesBySourceId(this.state.form.source_id);
      this.initialiseFormFields();
    }
  }

  componentWillUpdate() {
      const { id } = this.state.form;
      const { fetchAuditList } = this.props;
      if (this.shouldUpdate && id !== null && typeof fetchAuditList === 'function') {
          fetchAuditList(`${[].push(id)}`, 'report_calc_def');
          this.shouldUpdate = false;
      }
  }

  searchAnywhere(textInputValue, possibleSuggestionsArray) {
    var lowerCaseQuery = textInputValue.toLowerCase()

    return possibleSuggestionsArray.filter(function(suggestion)  {
        return suggestion.toLowerCase().includes(lowerCaseQuery)
    })
  }
  handleValidFromDateChange(date){
    let form = this.state.form;
    form.valid_from = date;

    this.setState({form:form});

  }

  handleValidTillDateChange(date){
    let form = this.state.form;
    form.valid_to = date;

    this.setState({form:form});

  }

  handleDelete(i) {
      let rulesTags = this.state.rulesTags;
      rulesTags.splice(i, 1);
      this.setState({rulesTags: rulesTags});
  }

  handleAddition(tag) {
        let rulesTags = this.state.rulesTags;
        // check whether its a valid rule to be added
        if (this.state.rulesSuggestions.indexOf(tag) != -1){
          rulesTags.push({
              id: rulesTags.length + 1,
              text: tag
          });
          this.setState({rulesTags: rulesTags});
        }
        else{
          alert("Not a valid rule, please check...",tag)
        }

    }

  handleDrag(tag, currPos, newPos) {
        let rulesTags = this.state.rulesTags;

        // mutate array
        rulesTags.splice(currPos, 1);
        rulesTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ rulesTags: rulesTags });
    }
    handleAggRefDelete(i) {
          let aggRefTags = this.state.aggRefTags;
          aggRefTags.splice(i, 1);
          this.setState({aggRefTags: aggRefTags});
      }

      handleAggRefAddition(tag) {
          let aggRefTags = this.state.aggRefTags;
          aggRefTags.push({
              id: aggRefTags.length + 1,
              text: tag
          });
          this.setState({aggRefTags: aggRefTags});
      }

      handleAggRefDrag(tag, currPos, newPos) {
          let aggRefTags = this.state.aggRefTags;

          // mutate array
          aggRefTags.splice(currPos, 1);
          aggRefTags.splice(newPos, 0, tag);

          // re-render
          this.setState({ aggRefTags: aggRefTags });
      }
      flatenTags(){

        this.state.form.cell_business_rules = '';
        this.state.form.aggregation_ref = '';
        console.log('inside process',this.state);
        this.state.rulesTags.map(function(item,index){
            this.state.form.cell_business_rules += `${item.text},`;
          }.bind(this));

        this.state.aggRefTags.map(function(item,index){
            this.state.form.aggregation_ref += `${item.text}`;
          }.bind(this));

        console.log('inside process form check',this.state.form);
      }
      initialiseFormFields(){
        //this.setState({form: this.props.drill_down_result.cell_rules[this.state.ruleIndex]});
        //this.state.form = this.props.drill_down_result.cell_rules[this.state.ruleIndex];
        if(this.state.rulesTags.length == 0){
          const {cell_business_rules}=this.state.form;
          let rulesTagsArray=cell_business_rules.split(',');
          rulesTagsArray.map((item,index)=>{
            if(item!=''){
              this.state.rulesTags.push({id:index+1,text:item});
            }
          })
          console.log("Rules Tags........:",this.state.rulesTags);
          //this.state.rulesTags = [{id:1,text: this.state.form.cell_business_rules}];
        }
        if(this.state.aggRefTags.length == 0){
          this.state.aggRefTags.push({id:1,text: this.state.form.aggregation_ref});
        }
      }

  render(){
    this.state.rulesSuggestions = [];
    this.state.fieldsSuggestions = [];
    const { rulesTags, rulesSuggestions,aggRefTags, fieldsSuggestions } = this.state;
    if(typeof(this.props.business_rule) != 'undefined'){
      if(this.props.business_rule.source_suggestion[0].rules_suggestion.length){
        const rules_suggestion = this.props.business_rule.source_suggestion[0].rules_suggestion;
        rules_suggestion.map(function(item,index){
          this.state.rulesSuggestions.push(item.business_rule);
        }.bind(this));
      }
    }

    if(typeof(this.props.source_table_columns) != 'undefined'){
      if(this.props.source_table_columns.length){
        const columns_suggestion = this.props.source_table_columns;
        columns_suggestion.map(function(item,index){
          this.state.fieldsSuggestions.push(item.Field);
        }.bind(this));
      }
    }
    if(typeof(this.props.sources) == 'undefined'){
      return(
        <h1>Loading...</h1>
      )
    } else {
      const { source_suggestion } = this.props.sources;
      if(typeof(this.state.ruleIndex) != 'undefined'){
        console.log('inside initialiseFormFields')
        this.initialiseFormFields();
      }
      console.log('in render',this.state)
      return(
        <div className="row">
          <div className="col col-lg-12">
            <div className="x_title">
              <h2>Maintain report rule <small>Add a new rule</small></h2>
              <div className="clearfix"></div>
            </div>
            <div className="x_content">
              <br />
              <form className="form-horizontal form-label-left"
                onSubmit={this.handleSubmit.bind(this)}
              >
                <div className="form-group">
                  <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="first-name">ID <span className="required">*</span></label>
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <input
                      value={this.state.form.id}
                      placeholder="System Reference ID"
                      readOnly="readonly"
                      type="text"
                      className="form-control col-md-7 col-xs-12"
                      onChange={
                        (event) => {
                          let form=this.state.form;
                          form.id = event.target.value;
                          this.setState({form:form});
                        }
                      }
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="first-name">Cell Calc Ref <span className="required">*</span></label>
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <input
                      placeholder="Enter Cell Calulation Ref"
                      value={this.state.form.cell_calc_ref}
                      type="text"
                      required="required"
                      readOnly={this.state.viewOnly || ! this.writeOnly}
                      className="form-control col-md-7 col-xs-12"
                      onChange={
                        (event) => {
                          let form=this.state.form;
                          form.cell_calc_ref = event.target.value;
                          this.setState({form:form});
                        }
                      }
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="first-name">Report ID <span className="required">*</span></label>
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <input value={this.state.form.report_id}  readOnly="readonly" type="text" className="form-control col-md-7 col-xs-12" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="first-name">Cell ID <span className="required">*</span></label>
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <input value={this.state.form.cell_id} readOnly="readonly" type="text" required="required" className="form-control col-md-7 col-xs-12" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="first-name">Sheet ID <span className="required">*</span></label>
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <input value={this.state.form.sheet_id}  type="text" required="required" className="form-control col-md-7 col-xs-12" readOnly="readonly" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="first-name">Source ID <span className="required">*</span></label>
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    {
                      (()=>{
                      if(this.state.requestType!='view' && this.writeOnly){
                         return(
                            <select
                              value = {this.state.form.source_id}
                              className="form-control"
                              onChange={
                                (event) => {
                                  let table_name = (event.target.options[event.target.selectedIndex].getAttribute('target'));
                                  let form=this.state.form;
                                  form.source_id = event.target.value;
                                  this.setState({form:form});
                                  console.log('Source ID............',this.state.form.source_id);
                                  this.props.fetchBusinessRulesBySourceId(this.state.form.source_id);
                                  console.log('table name in change event',table_name);
                                  this.props.fetchSourceColumnList(table_name);
                                }
                              }
                            >
                              <option>Choose option</option>
                              {
                                source_suggestion.map(function(item,index){
                                  return(
                                    <option key={index} target={item.source_table_name} value={item.source_id}>{item.source_id} - {item.source_table_name}</option>
                                  )
                                })
                              }
                            </select>);
                      }
                      else{
                        return(
                          <input value={this.state.form.source_id}  type="text" required="required" className="form-control col-md-7 col-xs-12" readOnly="readonly" />
                        );
                      }
                    })()
                  }
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="first-name">Report Rules <span className="required">*</span></label>
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    {
                      (()=>{
                        if(this.state.requestType!='view' && this.writeOnly){

                            return(
                              <ReactTags tags={rulesTags}
                              suggestions={rulesSuggestions}
                              handleDelete={this.handleDelete}
                              handleAddition={this.handleAddition}
                              handleDrag={this.handleDrag}
                              handleFilterSuggestions={this.searchAnywhere}
                              allowDeleteFromEmptyInput={false}
                              autocomplete={true}
                              minQueryLength={1}
                              classNames={{
                                tagInput: 'tagInputClass',
                                tagInputField: 'tagInputFieldClass form-control',
                                suggestions: 'suggestionsClass',
                              }}
                              placeholder="Enter Business Rule"
                            />);
                          }
                          else{
                              console.log(this.state.form.cell_business_rules);
                              return(
                                <input value={this.state.form.cell_business_rules}  type="text" required="required" className="form-control col-md-7 col-xs-12" readOnly="readonly" />
                              );

                          }
                  })()
                }
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="first-name">Aggregation Logic <span className="required">*</span></label>
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    {
                      (()=>{
                        if(this.state.requestType!='view' && this.writeOnly){
                          return(
                              <ReactTags tags={aggRefTags}
                              suggestions={fieldsSuggestions}
                              handleDelete={this.handleAggRefDelete}
                              handleAddition={this.handleAggRefAddition}
                              handleDrag={this.handleAggRefDrag}
                              classNames={{
                                tagInput: 'tagInputClass',
                                tagInputField: 'tagInputFieldClass form-control',
                                suggestions: 'suggestionsClass',
                              }}
                              placeholder="Enter Aggregation Definition"
                            />
                        );
                      }else{
                        return(
                          <input value={this.state.form.aggregation_ref}  type="text" required="required" className="form-control col-md-7 col-xs-12" readOnly="readonly" />
                        );

                    }
                    })()
                  }
                  </div>
                </div>

                <div className="form-group">
                  <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="first-name">Aggregation Funciton <span className="required">*</span></label>
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <input
                      type="text"
                      placeholder="Enter Aggregation function"
                      readOnly={this.state.viewOnly || ! this.writeOnly}
                      required="required"
                      className="form-control col-md-7 col-xs-12"
                      value={this.state.form.aggregation_func}
                      onChange={
                        (event) => {
                          let form=this.state.form;
                          form.aggregation_func = event.target.value;
                          this.setState({form:form});
                        }
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="first-name">Valid from <span className="required"> </span></label>
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <DatePicker
                        dateFormat="YYYYMMDD"
                        selected={this.state.form.valid_from}
                        onChange={console.log("this.handleValidFromDateChange.bind(this)")}
                        placeholderText="Rule Valid From"
                        readOnly="readonly"
                        className="view_data_date_picker_input form-control"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="first-name">Valid till <span className="required"> </span></label>
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <DatePicker
                        dateFormat="YYYYMMDD"
                        selected={this.state.form.valid_to}
                        onChange={console.log("this.handleValidTillDateChange.bind(this)")}
                        placeholderText="Rule Valid Till"
                        readOnly="readonly"
                        className="view_data_date_picker_input form-control"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="Comment">Comment <span className="required">*</span></label>
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <textarea
                      type="text"
                      placeholder="Enter a Comment"
                      required="required"
                      className="form-control col-md-7 col-xs-12"
                      value={this.state.audit_form.comment}
                      readOnly={this.state.viewOnly || ! this.writeOnly}
                      maxLength="1000"
                      minLength="20"
                      onChange={
                        (event) => {
                          let {audit_form}=this.state;
                          audit_form.comment = event.target.value;
                          this.setState({audit_form});
                        }
                      }
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="first-name">Last Updated by <span className="required">*</span></label>
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <input value="John Doe"  type="text" required="required" className="form-control col-md-7 col-xs-12" readOnly="readonly" />
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-md-9 col-sm-9 col-xs-12 col-md-offset-3">
                    <button type="button" className="btn btn-primary" onClick={()=>{this.handleCancel()}}>
                      Cancel</button>
                    {
                      (()=>{
                      if(this.state.requestType!='view' && this.writeOnly){
                        console.log("this.state.requestType........",this.state.requestType);
                        return(<button type="submit" className="btn btn-success" >Submit</button>);
                      }
                      })()
                    }
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )
    }
  }

  handleCancel(event){
    console.log('inside cancel');
    hashHistory.push(`/dashboard/drill-down?type=rules&report_id=${this.state.form.report_id}&sheet=${encodeURI(this.state.form.sheet_id)}&cell=${this.state.form.cell_id}`)
  }

  handleSubmit(event){
    console.log('inside submit',this.state.form);
    event.preventDefault();
    this.flatenTags();

    let data = {
      table_name:"report_calc_def",
      update_info:this.state.form
    };
    data['change_type']=this.state.requestType=='add'?'INSERT':(this.state.requestType=='update'?'UPDATE':'VIEW');

    let audit_info={
      id:this.state.form.id,
      maker: this.props.user,
      table_name:data.table_name,
      change_type:data.change_type,
      change_reference:`Rule: ${this.state.form.cell_calc_ref} of : ${this.state.form.report_id}->${this.state.form.sheet_id}->${this.state.form.cell_id} [ Source: ${this.state.form.source_id} ]`,
    };
    Object.assign(audit_info,this.state.audit_form);

    data['audit_info']=audit_info;

    console.log('inside submit', data, this.state.form);
    if(this.state.requestType == "add"){
      this.props.insertRuleData(data);
    }
    else if (this.state.requestType == "update"){
      this.props.updateRuleData(this.state.form.id,data);
    }

    hashHistory.push(`/dashboard/drill-down?type=rules&report_id=${this.state.form.report_id}&sheet=${encodeURI(this.state.form.sheet_id)}&cell=${this.state.form.cell_id}`);
  }
}
function mapStateToProps(state){
  console.log("On map state of Add report rule",state);
  return{
    sources:state.maintain_report_rules_store.sources,
    business_rule: state.maintain_report_rules_store.business_rules,
    source_table_columns: state.maintain_report_rules_store.source_table_columns,
    drill_down_result:state.captured_report.drill_down_result,
    user: state.login_store.name
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchBusinessRulesBySourceId:(sourceId) => {
      dispatch(actionFetchBusinessRulesBySourceId(sourceId));
    },
    fetchSources:(sourceId) => {
      dispatch(actionFetchSources(sourceId));
    },
    fetchSourceColumnList:(table_name) => {
      dispatch(actionFetchSourceColumnList(table_name));
    },
    insertRuleData:(data) => {
      dispatch(actionInsertRuleData(data));
    },
    updateRuleData:(id,data) => {
      dispatch(actionUpdateRuleData(id,data));
    },
    fetchAuditList: (id_list, table_name) => {
      dispatch(actionFetchAuditList(id_list, table_name));
    }
  }
}
const VisibleAddReportRules = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddReportRules);
export default VisibleAddReportRules;
