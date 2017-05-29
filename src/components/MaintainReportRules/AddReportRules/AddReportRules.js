import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators, dispatch} from 'redux'
import { WithContext as ReactTags } from 'react-tag-input';
import {
  actionFetchBusinessRulesBySourceId,
  actionFetchSources
} from '../../../actions/MaintainReportRuleAction';
import './AddReportRules.css';
class AddReportRules extends Component {
  constructor(props){
    super(props);
    this.state = {
        tags: [],
        suggestions: [],
        form:{
          cell_calc_ref:null,
          report_id:this.props.location.query['report_id'],
          sheet:this.props.location.query['sheet'],
          cell:this.props.location.query['cell'],
          source_id:null,
        }
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }
  componentWillMount(){
    this.props.fetchSources();
  }
  handleDelete(i) {
        let tags = this.state.tags;
        tags.splice(i, 1);
        this.setState({tags: tags});
    }

    handleAddition(tag) {
        let tags = this.state.tags;
        tags.push({
            id: tags.length + 1,
            text: tag
        });
        this.setState({tags: tags});
    }

    handleDrag(tag, currPos, newPos) {
        let tags = this.state.tags;

        // mutate array
        tags.splice(currPos, 1);
        tags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: tags });
    }

  render(){
    const { tags, suggestions } = this.state;  
    if(typeof(this.props.business_rule) != 'undefined'){
      if(this.props.business_rule.source_suggestion[0].rules_suggestion.length){
        const rules_suggestion = this.props.business_rule.source_suggestion[0].rules_suggestion;
        rules_suggestion.map(function(item,index){
          this.state.suggestions.push(item.business_rule);
        }.bind(this));
      }
    }   
    if(typeof(this.props.sources) == 'undefined'){
      return(
        <h1>Loading...</h1>
      )
    } else {
      const { source_suggestion } = this.props.sources;
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
                      value={this.state.form.cell_calc_ref} 
                      type="text" 
                      required="required" 
                      className="form-control col-md-7 col-xs-12" 
                      onChange={
                        (event) => {
                          this.setState(
                            {
                              form:{
                                cell_calc_ref:event.target.value
                              }
                            }
                          );
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
                          this.state.form.source_id = event.target.value;
                          this.props.fetchBusinessRulesBySourceId(event.target.value);
                        }
                      }
                    >
                      <option>Choose option</option>
                      {
                        source_suggestion.map(function(item,index){
                          return(
                            <option key={index} value={item.source_id}>{item.source_id} - {item.source_table_name}</option>
                          )
                        })
                      }                      
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="first-name">Report Rules <span className="required">*</span></label>
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <ReactTags tags={tags}
                      suggestions={suggestions}
                      handleDelete={this.handleDelete}
                      handleAddition={this.handleAddition}
                      handleDrag={this.handleDrag}
                      classNames={{
                        tagInput: 'tagInputClass',
                        tagInputField: 'tagInputFieldClass form-control',
                        suggestions: 'suggestionsClass',
                      }}
                      placeholder="Start typing Business Rule"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="first-name">Aggregation Logic <span className="required">*</span></label>
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <input 
                      type="text" 
                      required="required" 
                      className="form-control col-md-7 col-xs-12"
                      value={this.state.form.aggregation_logic}
                      onChange={
                        (event) => {
                          this.setState({
                            form:{
                              aggregation_logic:event.target.value
                            }
                          });
                        }
                      }
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
                      value={this.state.form.aggregation_function}
                      onChange={
                        (event) => {
                          this.setState({
                            form:{
                              aggregation_function:event.target.value
                            }
                          });
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
                          this.setState({
                            form:{
                              valid_from:event.target.value
                            }
                          });
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
                      value={this.state.form.valid_till}
                      onChange={
                        (event) => {
                          this.setState({
                            form:{
                              valid_till:event.target.value
                            }
                          });
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
    event.preventDefault();
    console.log(this.state.form);
  }
}
function mapStateToProps(state){
  console.log("On map state of Add report rule",state);
  return{
    sources:state.maintain_report_rules_store.sources,
    business_rule: state.maintain_report_rules_store.business_rules
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchBusinessRulesBySourceId:(sourceId) => {
      dispatch(actionFetchBusinessRulesBySourceId(sourceId));
    },
    fetchSources:(sourceId) => {
      dispatch(actionFetchSources(sourceId));
    }
  }
}
const VisibleAddReportRules = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddReportRules);
export default VisibleAddReportRules;
