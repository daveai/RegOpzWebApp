import React,{Component} from 'react';
import DatePicker from 'react-datepicker';
import {hashHistory,Link} from 'react-router';
import {connect} from 'react-redux';
import {dispatch} from 'redux';
import {
  actionInsertRuleData,
  actionUpdateRuleData
} from '../../actions/MaintainReportRuleAction';

class AddReportAggRules extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestType: this.props.location.query['request'],
      form: {
        id: null,
        country: null,
        report_id: this.props.location.query['report_id'],
        sheet_id: this.props.location.query['sheet_id'],
        cell_id: this.props.location.query['cell_id'],
        comp_agg_ref: null,
        reporting_scale: null,
        rounding_option: null,
        valid_from: null,
        valid_to: null,
        last_updated_by: null
      }
    }
    // this.aggRulesList = new RegExp('[A-Z0-9]+') Options are included
    this.aggRulesPattern = /(\w+([\+\-\*\/]\w+)?)|(\(\w+\))/g;
  }

 componentWillMount(){
  //console.log('Before assignment.....',this.state.form);
  Object.assign(this.state.form, this.props.drill_down_result.comp_agg_rules[0]);
  //console.log(this.props.drill_down_result.comp_agg_rules[0]);
  //console.log(this.state.form);
 }

  render() {
    return(
      <div className="row">
        <div className="col col-lg-12">
          <div className="x_title">
            <h2>Maintain report rule <small>Add a new aggregation rule</small></h2>
            <div className="clearfix"></div>
          </div>
          <form className="form-horizontal form-label-left" onSubmit={this.handleSubmit.bind(this)}>

            <div className="form-group">
              <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="report-id">Report ID <span className="required">*</span></label>
              <div className="col-md-3 col-sm-3 col-xs-12">
                <input
                  value={this.state.form.report_id}
                  type="text"
                  className="form-control col-md-7 col-xs-12"
                  readOnly="true"
                />
              </div>
              </div>

              <div className="form-group">
                <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="sheet-id">Sheet ID <span className="required">*</span></label>
                <div className="col-md-3 col-sm-3 col-xs-12">
                  <input
                    value={this.state.form.sheet_id}
                    type="text"
                    className="form-control col-md-7 col-xs-12"
                    readOnly="true"
                  />
                </div>
                </div>

                <div className="form-group">
                  <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="cell-id">Cell ID <span className="required">*</span></label>
                  <div className="col-md-3 col-sm-3 col-xs-12">
                    <input
                      value={this.state.form.cell_id}
                      type="text"
                      className="form-control col-md-7 col-xs-12"
                      readOnly="true"
                    />
                  </div>
                  </div>

                  <div className="form-group">
                    <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="comp-agg-ref">Composite Aggregation Reference <span className="required">*</span></label>
                    <div className="col-md-6 col-sm-6 col-xs-12">
                      <input
                        value={this.state.form.comp_agg_ref}
                        type="text"
                        className="form-control col-md-7 col-xs-12"
                        onChange={(event) => {
                          let newState = {...this.state};
                          var nstr = ''
                          var str = event.target.value;
                          do {
                            nstr = str.replace(this.aggRulesPattern, '0');
                          } while (nstr !== str && ((str = nstr) || 1));
                          if (str === '0') {
                            console.log("valid");
                          } else {
                            console.log("invalid");
                          }
                          newState.form.comp_agg_ref = event.target.value;
                          this.setState(newState);
                         }
                        }
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="reporting-scale">Reporting Scale<span className="required">*</span></label>
                    <div className="col-md-1 col-sm-1 col-xs-12">
                      <input
                        value={this.state.form.reporting_scale}
                        type="text"
                        className="form-control col-md-7 col-xs-12"
                        onChange={(event) => {
                            let newState = {...this.state};
                            newState.form.reporting_scale = event.target.value;
                            this.setState(newState);
                          }
                        }
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="rounding-option">Rounding Option<span className="required">*</span></label>
                    <div className="col-md-3 col-sm-3 col-xs-12">
                      <input
                        value={this.state.form.rounding_option}
                        type="text"
                        className="form-control col-md-7 col-xs-12"
                        onChange={(event) => {
                          let newState = {...this.state};
                          newState.form.rounding_option = event.target.value;
                          this.setState(newState);
                          }
                        }
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="valid-from">Valid From<span className="required">*</span></label>
                    <div className="col-md-3 col-sm-3 col-xs-12">
                      <input
                        value={this.state.form.valid_from}
                        type="text"
                        className="form-control col-md-7 col-xs-12"
                        onChange={(event) => {
                          let newState = {...this.state};
                          newState.form.valid_from = event.target.value;
                          this.setState(newState);
                          }
                        }
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="valid-to">Valid To<span className="required">*</span></label>
                    <div className="col-md-3 col-sm-3 col-xs-12">
                      <input
                        value={this.state.form.valid_to}
                        type="text"
                        className="form-control col-md-7 col-xs-12"
                        onChange={(event) => {
                          let newState = {...this.state};
                          newState.form.valid_to = event.target.value;
                          this.setState(newState);
                        }
                      }
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="last-update-by">Last Updated By<span className="required">*</span></label>
                    <div className="col-md-3 col-sm-3 col-xs-12">
                      <input
                        value={this.state.form.last_updated_by}
                        type="text"
                        className="form-control col-md-7 col-xs-12"
                        onChange={(event) => {
                          let newState = {...this.state};
                          newState.form.last_updated_by = event.target.value;
                          this.setState(newState);
                          }
                        }
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-md-9 col-sm-9 col-xs-12 col-md-offset-3">
                      <button type="button" className="btn btn-primary" onClick={this.handleCancel.bind(this)}>
                        Cancel</button>
                      <button type="submit" className="btn btn-success" >Submit</button>
                    </div>
                  </div>


          </form>

        </div>
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.form);
    let data = {
      table_name: "report_comp_agg_def",
      update_info: this.state.form
    };

    if (this.state.requestType == "add") {
      this.props.insertRuleData(data);
    } else {
      this.props.updateRuleData(this.state.form.id,data);
    }

    hashHistory.push(`/dashboard/drill-down?report_id=${this.state.form.report_id}&sheet=${encodeURI(this.state.form.sheet_id)}&cell=${this.state.form.cell_id}`);
  }

  handleCancel() {
    const url=`/dashboard/drill-down?report_id=${this.state.form.report_id}&sheet=${this.state.form.sheet_id}&cell=${this.state.form.cell_id}`;
    const encodedUrl = encodeURI(url);
    hashHistory.push(encodedUrl);
  }

}

function mapStateToProps(state) {
  return{
    drill_down_result:state.captured_report.drill_down_result
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    insertRuleData:(data) => {
      dispatch(actionInsertRuleData(data));
    },
    updateRuleData:(id, data) => {
      dispatch(actionUpdateRuleData(id, data));
    }
  };
}

const VisibleAddReportAggRules = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddReportAggRules);

export default VisibleAddReportAggRules;
