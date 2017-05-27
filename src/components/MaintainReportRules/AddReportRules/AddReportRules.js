import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators, dispatch} from 'redux'
import { WithContext as ReactTags } from 'react-tag-input';
export default class AddReportRules extends Component {
  constructor(props){
    super(props);
    this.state = {
        tags: [],
        suggestions: ['ACU','DBU']
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);

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
    return(
      <div className="row">
        <div className="col col-lg-12">
          <div className="x_title">
            <h2>Maintain report rule <small>Add a new rule</small></h2>
            <div className="clearfix"></div>
          </div>
          <div className="x_content">
            <br />
            <form className="form-horizontal form-label-left">
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">Cell Calc Ref <span class="required">*</span></label>
                <div className="col-md-6 col-sm-6 col-xs-12">
                  <input type="text" required="required" className="form-control col-md-7 col-xs-12" />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">Report ID <span class="required">*</span></label>
                <div className="col-md-6 col-sm-6 col-xs-12">
                  <input readOnly="readonly" type="text" className="form-control col-md-7 col-xs-12" />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">Cell ID <span class="required">*</span></label>
                <div className="col-md-6 col-sm-6 col-xs-12">
                  <input readOnly="readonly" type="text" required="required" className="form-control col-md-7 col-xs-12" />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">Sheet ID <span class="required">*</span></label>
                <div className="col-md-6 col-sm-6 col-xs-12">
                  <input  type="text" required="required" className="form-control col-md-7 col-xs-12" readOnly="readonly" />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">Source ID <span class="required">*</span></label>
                <div className="col-md-6 col-sm-6 col-xs-12">
                  <select className="form-control">
                    <option>Choose option</option>
                    <option>1 - FX_ALL_DATA</option>
                    <option>2 - FX_ALL_DATA</option>
                    <option>3 - FX_ALL_DATA</option>
                    <option>4 - FX_ALL_DATA</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">Report Rules <span class="required">*</span></label>
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
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">Aggregation Logic <span class="required">*</span></label>
                <div className="col-md-6 col-sm-6 col-xs-12">
                  <input  type="text" required="required" className="form-control col-md-7 col-xs-12"  />
                </div>
              </div>

              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">Aggregation Funciton <span class="required">*</span></label>
                <div className="col-md-6 col-sm-6 col-xs-12">
                  <input  type="text" required="required" className="form-control col-md-7 col-xs-12" />
                </div>
              </div>

              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">Valid from <span class="required">*</span></label>
                <div className="col-md-6 col-sm-6 col-xs-12">
                  <input  type="text" required="required" className="form-control col-md-7 col-xs-12"  />
                </div>
              </div>


              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">Valid till <span class="required">*</span></label>
                <div className="col-md-6 col-sm-6 col-xs-12">
                  <input  type="text" required="required" className="form-control col-md-7 col-xs-12"  />
                </div>
              </div>

              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">Country <span class="required">*</span></label>
                <div className="col-md-6 col-sm-6 col-xs-12">
                  <select className="form-control">
                    <option>Choose option</option>
                    <option>1 - FX_ALL_DATA</option>
                    <option>2 - FX_ALL_DATA</option>
                    <option>3 - FX_ALL_DATA</option>
                    <option>4 - FX_ALL_DATA</option>
                  </select>
                </div>
              </div>


              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">Last Updated by <span class="required">*</span></label>
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
