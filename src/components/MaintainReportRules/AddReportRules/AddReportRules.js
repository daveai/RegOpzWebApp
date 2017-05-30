import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators, dispatch} from 'redux'
import { WithContext as ReactTags } from 'react-tag-input';
import {
  actionFetchBusinessRulesBySourceId,
  actionFetchSources,
  actionFetchSourceColumnList
} from '../../../actions/MaintainReportRuleAction';
import './AddReportRules.css';
class AddReportRules extends Component {
  constructor(props){
    super(props);
    this.state = {
        rulesTags: [],
        aggRefTags:[],
        rulesSuggestions: [],
        fieldsSuggestions:[],
        form:{
          cell_calc_ref:null,
          report_id:this.props.location.query['report_id'],
          sheet:this.props.location.query['sheet'],
          cell:this.props.location.query['cell'],
          source_id:null,
          cell_business_rules:null,
          aggregation_ref:null,
          aggregation_func:null,
          valid_from:null,
          valid_to:null,
          last_updated_by:null,
          last_updated_by:null,
          id:null
        }
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);

    this.handleAggRefDelete = this.handleAggRefDelete.bind(this);
    this.handleAggRefAddition = this.handleAggRefAddition.bind(this);
    this.handleAggRefDrag = this.handleAggRefDrag.bind(this);
  }
  componentWillMount(){
    this.props.fetchSources();
  }
  handleDelete(i) {
        let rulesTags = this.state.rulesTags;
        rulesTags.splice(i, 1);
        this.setState({rulesTags: rulesTags});
    }

    handleAddition(tag) {
        let rulesTags = this.state.rulesTags;
        rulesTags.push({
            id: rulesTags.length + 1,
            text: tag
        });
        this.setState({rulesTags: rulesTags});
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
      console.log(this.state)
      return(
        <div className="row">
          <div className="col col-lg-12">
            <div className="x_title">
              <h2>Maintain report rule <small>Add a new rule</small></h2>
              <div className="clearfix"></div>
            </div>
            <div className="x_content">
              <br />
              <form className="form-horizontal form-label-left" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="first-name">Cell Calc Ref <span className="required">*</span></label>
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <input
                      placeholder="Enter Cell Calulation Ref"
                      value={this.state.form.cell_calc_ref}
                      type="text"
                      required="required"
                      className="form-control col-md-7 col-xs-12"
                      onChange={
                        (event) => {
                          this.state.form.cell_calc_ref = event.target.value;
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
                    <input value={this.state.form.cell} readOnly="readonly" type="text" required="required" className="form-control col-md-7 col-xs-12" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="first-name">Sheet ID <span className="required">*</span></label>
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <input value={this.state.form.sheet}  type="text" required="required" className="form-control col-md-7 col-xs-12" readOnly="readonly" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="first-name">Source ID <span className="required">*</span></label>
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <select
                      className="form-control"
                      onChange={
                        (event) => {
                          let table_name = (event.target.options[event.target.selectedIndex].getAttribute('target'));
                          this.state.form.source_id = event.target.value;
                          this.props.fetchBusinessRulesBySourceId(event.target.value);
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
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="first-name">Report Rules <span className="required">*</span></label>
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <ReactTags tags={rulesTags}
                      suggestions={rulesSuggestions}
                      handleDelete={this.handleDelete}
                      handleAddition={this.handleAddition}
                      handleDrag={this.handleDrag}
                      classNames={{
                        tagInput: 'tagInputClass',
                        tagInputField: 'tagInputFieldClass form-control',
                        suggestions: 'suggestionsClass',
                      }}
                      placeholder="Enter Business Rule"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="first-name">Aggregation Logic <span className="required">*</span></label>
                  <div className="col-md-6 col-sm-6 col-xs-12">
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
                  </div>
                </div>

                <div className="form-group">
                  <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="first-name">Aggregation Funciton <span className="required">*</span></label>
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <input
                      type="text"
                      required="required"
                      className="form-control col-md-7 col-xs-12"
                      value={this.state.form.aggregation_func}
                      onChange={
                        (event) => {
                          this.state.form.aggregation_func = event.target.value;
                        }
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="first-name">Valid from <span className="required">*</span></label>
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <input
                      type="text"
                      required="required"
                      className="form-control col-md-7 col-xs-12"
                      value={this.state.form.valid_from}
                      onChange={
                        (event) => {
                          this.state.form.valid_from = event.target.value;
                        }
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="first-name">Valid till <span className="required">*</span></label>
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <input
                      type="text"
                      required="required"
                      className="form-control col-md-7 col-xs-12"
                      value={this.state.form.valid_to}
                      onChange={
                        (event) => {
                          this.state.form.valid_to = event.target.value;
                        }
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="first-name">Country <span className="required">*</span></label>
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <select className="form-control">
                      <option>Choose option</option>
                      <option value={"SG"}>SG</option>
                    </select>
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
                    <button type="button" className="btn btn-primary">Cancel</button>
                    <button type="reset" className="btn btn-primary">Reset</button>
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
  handleSubmit(event){
    console.log('inside submit',this.state.form);
    event.preventDefault();
  }
}
function mapStateToProps(state){
  console.log("On map state of Add report rule",state);
  return{
    sources:state.maintain_report_rules_store.sources,
    business_rule: state.maintain_report_rules_store.business_rules,
    source_table_columns: state.maintain_report_rules_store.source_table_columns,
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
    }
  }
}
const VisibleAddReportRules = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddReportRules);
export default VisibleAddReportRules;
