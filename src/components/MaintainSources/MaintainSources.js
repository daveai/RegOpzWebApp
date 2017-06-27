import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { WithContext as ReactTags } from 'react-tag-input';
import {connect} from 'react-redux';
import {bindActionCreators, dispatch} from 'redux';
import {
        Link,
        hashHistory
      } from 'react-router';
import _ from 'lodash';
import {
  actionFetchSources
} from '../../actions/MaintainSourcesAction';
import './MaintainSources.css';
import Collapsible from '../CollapsibleModified/Collapsible';
class MaintainSources extends Component {
  constructor(props){
    super(props);
    this.tags = {
        countryTags: [],
        countrySuggestions: [],
        sourceTags: [],
        sourceSuggestions: []
    };
    this.handleDeleteSource = this.handleDeleteSource.bind(this);
    this.handleAdditionSource = this.handleAdditionSource.bind(this);
    this.handleDragSource = this.handleDragSource.bind(this);

    this.handleDeleteCountry = this.handleDeleteCountry.bind(this);
    this.handleAdditionCountry = this.handleAdditionCountry.bind(this);
    this.handleDragCountry = this.handleDragCountry.bind(this);
    this.nextPropsCount = 0;
  }
  convertTagsToString(tags){
    let selectedTags = [];
    for(let i = 0; i < tags.length; i++){
      selectedTags.push(tags[i].text)
    }
    return selectedTags.toString();
  }
  handleDeleteSource(i) {
      let tags = this.tags.sourceTags;
      tags.splice(i, 1);
      this.setState({sourceTags: tags});
      console.log('delete source',this.tags);
      let sources = this.convertTagsToString(this.tags.sourceTags)
      let country = this.convertTagsToString(this.tags.countryTags)
      this.props.fetchSources(sources ? sources:'ALL', country ? country:'ALL');
  }

  handleAdditionSource(tag) {
      let tags = this.tags.sourceTags;
      tags.push({
          id: tags.length + 1,
          text: tag.toLocaleUpperCase()
      });
      console.log('Add source',this.tags);
      let sources = this.convertTagsToString(this.tags.sourceTags)
      let country = this.convertTagsToString(this.tags.countryTags)
      this.props.fetchSources(sources ? sources:'ALL', country ? country:'ALL');
  }

  handleDragSource(tag, currPos, newPos) {
      let tags = this.tags.sourceTags;
      // mutate array
      tags.splice(currPos, 1);
      tags.splice(newPos, 0, tag);
      // re-render
      this.setState({ sourceTags: tags });
  }
  handleDeleteCountry(i) {
      let tags = this.tags.countryTags;
      tags.splice(i, 1);
      this.setState({countryTags: tags});
      console.log('delete country',this.tags);
      let sources = this.convertTagsToString(this.tags.sourceTags)
      let country = this.convertTagsToString(this.tags.countryTags)
      this.props.fetchSources(sources ? sources:'ALL', country ? country:'ALL');
  }

  handleAdditionCountry(tag) {
      let tags = this.tags.countryTags;
      tags.push({
          id: tags.length + 1,
          text: tag.toLocaleUpperCase()
      });
      this.setState({countryTags: tags});
      console.log('Add country',this.tags);
      let sources = this.convertTagsToString(this.tags.sourceTags)
      let country = this.convertTagsToString(this.tags.countryTags)
      this.props.fetchSources(sources ? sources:'ALL', country ? country:'ALL');

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
    this.props.fetchSources();
  }
  componentWillReceiveProps(nextProps){
    console.log('Inside componentWillReceiveProps',(this.props.source_feeds.sources !== nextProps.source_feeds.sources));
    if (this.props.source_feeds !== nextProps.source_feeds && this.nextPropsCount == 0) {
      console.log('Inside if of componentWillReceiveProps',this.props.source_feeds.sources , nextProps.source_feeds.sources);
      nextProps.fetchSources();
      this.nextPropsCount = this.nextPropsCount + 1;
    }
  };
  render() {
      if(this.props.source_feeds.length == 0){
        return(
          <h1>Loading...</h1>
        )
      }
      this.tags.countrySuggestions = [];
      this.tags.sourceSuggestions = [];
      console.log("on render",this.props.source_feeds)
      console.log('before country suggestions',this.props.source_feeds.sources.country_suggestion);
      this.props.source_feeds.sources.country_suggestion.map(function(country,index){
        this.tags.countrySuggestions.push(country.country)
      }.bind(this))

      this.props.source_feeds.sources.source_suggestion.map(function(report,index){
        this.tags.sourceSuggestions.push(report.source_table_name)
      }.bind(this))
      const { sourceTags, sourceSuggestions } = this.tags;
      const { countryTags, countrySuggestions } = this.tags;
      console.log('before coolapsible sourcelist',sourceTags,countryTags,this.props.source_feeds.sources);
      console.log('before coolapsible sourcelist suggestion lists',sourceSuggestions,countrySuggestions);
      return (
          <div className="reg_maintain_report_rules_container container">
            <div className="row">
              <div className="col col-lg-6">
                <ReactTags
                    tags={sourceTags}
                    suggestions={sourceSuggestions}
                    handleDelete={this.handleDeleteSource}
                    handleAddition={this.handleAdditionSource}
                    handleDrag={this.handleDragSource}
                    placeholder="Enter Source Name"
                    classNames={{
                      tagInput: 'tagInputClass',
                      tagInputField: 'tagInputFieldClass form-control',
                      suggestions: 'suggestionsClass',
                    }}
                />
              </div>
              <div className="col col-lg-4">
                <ReactTags
                    tags={countryTags}
                    suggestions={countrySuggestions}
                    handleDelete={this.handleDeleteCountry}
                    handleAddition={this.handleAdditionCountry}
                    handleDrag={this.handleDragCountry}
                    placeholder="Enter Country"
                    classNames={{
                      tagInput: 'tagInputClass',
                      tagInputField: 'tagInputFieldClass form-control',
                      suggestions: 'suggestionsClass',
                    }}
                />
              </div>
              <div className="col col-lg-2">
                  <button className="btn btn-success" onClick={()=>{this.handleNewCountry()}}>New Country</button>
              </div>
            </div>
            {
                  this.props.source_feeds.sources.country.map(function(countrylist,countrylistindex){
                  return(
                  <div className="maintain_rep_rules_accordion_holder" >
                    <Collapsible trigger={countrylist.country} key={countrylist.countrylistindex}>
                      <div className="form-group">
                        <button className="btn btn-success" onClick={()=>{this.handleAdd(countrylist.country)}}>Add</button>
                        {
                            <table className="table">
                              <thead>
                                <tr>
                                  <th>Source ID</th>
                                  <th>Source Table Name</th>
                                  <th>Description</th>
                                  <th>Last modified</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  this.props.source_feeds.sources.country[countrylistindex].source.map(function(source,sourceindex){
                                    return(
                                      <tr>
                                        <td><Link to={`/dashboard/maintain-sources/add-sources?request=update&source_table_name=${source.source_table_name}&source_id=${source.source_id}&id=${source.id}&country=${source.country}&source_description=${source.source_description}&source_file_name=${source.source_file_name}&source_file_delimiter=${source.source_file_delimiter}&last_updated_by=${source.last_updated_by}`}>{source.source_id}</Link></td>
                                        <td><Link to={`/dashboard/maintain-sources/add-sources?request=update&source_table_name=${source.source_table_name}&source_id=${source.source_id}&id=${source.id}&country=${source.country}&source_description=${source.source_description}&source_file_name=${source.source_file_name}&source_file_delimiter=${source.source_file_delimiter}&last_updated_by=${source.last_updated_by}`}>{source.source_table_name}</Link></td>
                                        <td>{source.source_description}</td>
                                        <td>{source.last_updated_by}</td>
                                      </tr>
                                      )
                                    }.bind(this))
                                }
                              </tbody>
                            </table>
                        }
                      </div>
                    </Collapsible>
                  </div>
                )
              }.bind(this))
            }
          </div>
      )

  }
  handleNewCountry(event){
    console.log('inside NewCountry');
    hashHistory.push(`/dashboard/maintain-sources/add-sources?request=add`)
  }
  handleAdd(country){
    console.log('inside Add source for existing country');
    hashHistory.push(`/dashboard/maintain-sources/add-sources?request=add&country=${country}`)
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchSources:(sources,country)=>{
      dispatch(actionFetchSources(sources,country))
    },
  }
}
function mapStateToProps(state){
  console.log("on map state",state);
  return {
    source_feeds:state.source_feeds,
  }
}
const VisibleMaintainSources = connect(
  mapStateToProps,
  mapDispatchToProps
)(MaintainSources);
export default VisibleMaintainSources;
