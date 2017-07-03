import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { WithContext as ReactTags } from 'react-tag-input';
import {connect} from 'react-redux';
import {bindActionCreators, dispatch} from 'redux';
import _ from 'lodash';
import {
  actionFetchReportTemplate
} from '../../actions/MaintainReportRuleAction';
import './MaintainReportRules.css';
import Collapsible from '../CollapsibleModified/Collapsible';
class MaintainReportRules extends Component {
  constructor(props){
    super(props);
    this.tags = {
        countryTags: [],
        countrySuggestions: [],
        reportTags: [],
        reportSuggestions: []
    };
    this.handleDeleteReport = this.handleDeleteReport.bind(this);
    this.handleAdditionReport = this.handleAdditionReport.bind(this);
    this.handleDragReport = this.handleDragReport.bind(this);

    this.handleDeleteCountry = this.handleDeleteCountry.bind(this);
    this.handleAdditionCountry = this.handleAdditionCountry.bind(this);
    this.handleDragCountry = this.handleDragCountry.bind(this);

    this.searchAnywhere = this.searchAnywhere.bind(this);
  }
  searchAnywhere(textInputValue, possibleSuggestionsArray) {
    var lowerCaseQuery = textInputValue.toLowerCase()

    return possibleSuggestionsArray.filter(function(suggestion)  {
        return suggestion.toLowerCase().includes(lowerCaseQuery)
    })
  }
  convertTagsToString(tags){
    let selectedTags = [];
    for(let i = 0; i < tags.length; i++){
      selectedTags.push(tags[i].text)
    }
    return selectedTags.toString();
  }
  handleDeleteReport(i) {
      let tags = this.tags.reportTags;
      tags.splice(i, 1);
      this.setState({reportTags: tags});
      let reports = this.convertTagsToString(this.tags.reportTags)
      let country = this.convertTagsToString(this.tags.countryTags)
      this.props.fetchReportTemplateList(reports ? reports:'ALL', country ? country:'ALL');

  }

  handleAdditionReport(tag) {
      let tags = this.tags.reportTags;
      tags.push({
          id: tags.length + 1,
          text: tag.toLocaleUpperCase()
      });
      this.setState({reportTags: tags});
      let reports = this.convertTagsToString(this.tags.reportTags)
      let country = this.convertTagsToString(this.tags.countryTags)
      this.props.fetchReportTemplateList(reports ? reports:'ALL', country ? country:'ALL');
  }

  handleDragReport(tag, currPos, newPos) {
      let tags = this.tags.reportTags;
      // mutate array
      tags.splice(currPos, 1);
      tags.splice(newPos, 0, tag);
      // re-render
      this.setState({ reportTags: tags });
  }
  handleDeleteCountry(i) {
      let tags = this.tags.countryTags;
      tags.splice(i, 1);
      this.setState({countryTags: tags});
      let reports = this.convertTagsToString(this.tags.reportTags)
      let country = this.convertTagsToString(this.tags.countryTags)
      this.props.fetchReportTemplateList(reports ? reports:'ALL', country ? country:'ALL');
  }

  handleAdditionCountry(tag) {
      let tags = this.tags.countryTags;
      tags.push({
          id: tags.length + 1,
          text: tag.toLocaleUpperCase()
      });
      this.setState({countryTags: tags});
      let reports = this.convertTagsToString(this.tags.reportTags)
      let country = this.convertTagsToString(this.tags.countryTags)
      this.props.fetchReportTemplateList(reports ? reports:'ALL', country ? country:'ALL');
  }

  handleDragCountry(tag, currPos, newPos) {
      let tags = this.tags.countryTags;

      // mutate array
      tags.splice(currPos, 1);
      tags.splice(newPos, 0, tag);

      // re-render
      this.setState({ countryTags: tags });
  }
  componentWillMount(){
    this.props.fetchReportTemplateList();
  }
  render() {
      if(typeof this.props.report_template_list == 'undefined'){
        return(
          <h1>Loading...</h1>
        )
      }
      this.tags.countrySuggestions = [];
      this.tags.reportSuggestions = [];
      this.props.report_template_list.country_suggestion.map(function(country,index){
        this.tags.countrySuggestions.push(country.country)
      }.bind(this))

      this.props.report_template_list.report_suggestion.map(function(report,index){
        this.tags.reportSuggestions.push(report.report_id)
      }.bind(this))
      const { reportTags, reportSuggestions } = this.tags;
      const { countryTags, countrySuggestions } = this.tags;
      console.log('before coolapsible countrylist',this.props.report_template_list);
      return (
          <div className="reg_maintain_report_rules_container container">
            <div className="row">
              <div className="col col-lg-6">
                <ReactTags
                    tags={reportTags}
                    suggestions={reportSuggestions}
                    handleDelete={this.handleDeleteReport}
                    handleAddition={this.handleAdditionReport}
                    handleDrag={this.handleDragReport}
                    handleFilterSuggestions={this.searchAnywhere}
                    allowDeleteFromEmptyInput={false}
                    autocomplete={true}
                    minQueryLength={1}
                    placeholder="Enter Report ID"
                    classNames={{
                      tagInput: 'tagInputClass',
                      tagInputField: 'tagInputFieldClass form-control',
                      suggestions: 'suggestionsClass',
                    }}
                />
              </div>
              <div className="col col-lg-6">
                <ReactTags
                    tags={countryTags}
                    suggestions={countrySuggestions}
                    handleDelete={this.handleDeleteCountry}
                    handleAddition={this.handleAdditionCountry}
                    handleDrag={this.handleDragCountry}
                    handleFilterSuggestions={this.searchAnywhere}
                    allowDeleteFromEmptyInput={false}
                    autocomplete={true}
                    minQueryLength={1}
                    placeholder="Enter Country"
                    classNames={{
                      tagInput: 'tagInputClass',
                      tagInputField: 'tagInputFieldClass form-control',
                      suggestions: 'suggestionsClass',
                    }}
                />
              </div>
            </div>
            {
                  this.props.report_template_list.country.map(function(countrylist,countrylistindex){
                  return(
                  <div className="maintain_rep_rules_accordion_holder" >
                    <Collapsible trigger={countrylist.country} >
                      {
                        this.props.report_template_list.country[countrylistindex].report.map(function(reportlist,reportlistindex){
                          return(
                            <Collapsible trigger={reportlist.report_id} key={reportlist.reportlistindex} >
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th>Report ID</th>
                                    <th>Report Valid From</th>
                                    <th>Report Valid To</th>
                                    <th>Updated By</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {
                                    this.props.report_template_list.country[countrylistindex].report[reportlistindex].reportversions.map(function(reportversion,reportversionindex){
                                      return(
                                        <tr>
                                          <td><a href={`#/dashboard/data-grid?report_id=${reportversion.report_id}`}>{reportversion.report_id}</a></td>
                                          <td>{reportversion.valid_from}</td>
                                          <td>{reportversion.valid_to}</td>
                                          <td>{reportversion.last_updated_by}</td>
                                        </tr>
                                        )
                                      }.bind(this))
                                  }
                                </tbody>
                              </table>
                            </Collapsible>
                          )
                        }.bind(this))
                      }
                    </Collapsible>
                  </div>
                )
              }.bind(this))
            }
          </div>
      )

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchReportTemplateList:(reports,country)=>{
      dispatch(actionFetchReportTemplate(reports,country))
    },
  }
}
function mapStateToProps(state){
  console.log("on map state",state);
  return {
    report_template_list:state.maintain_report_rules_store.report_template_list
  }
}
const VisibleMaintainReportRules = connect(
  mapStateToProps,
  mapDispatchToProps
)(MaintainReportRules);
export default VisibleMaintainReportRules;
