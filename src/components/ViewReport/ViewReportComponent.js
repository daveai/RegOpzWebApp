import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators, dispatch } from 'redux';
import TreeView from 'react-treeview';
import _ from 'lodash';
import Collapsible from '../CollapsibleModified/Collapsible';
import ReportTreeInfoComponent from './ReportTreeInfoComponent';
import {
  ViewSourceComponent,
  mapDispatchToProps,
  mapStateToProps
} from '../SourceTreeInfo/ViewSourceComponent';
import {
  actionFetchDates,
  actionFetchReportFromDate,
  actionFetchSource,
  actionFetchReportLinkage,
  actionInsertSourceData,
  actionUpdateSourceData,
  actionDeleteFromSourceData,
  actionFetchDatesForReport
} from '../../actions/ViewDataAction';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import RegOpzFlatGrid from '../RegOpzFlatGrid/RegOpzFlatGrid';
import InfoModal from '../InfoModal/InfoModal';
import ModalAlert from '../ModalAlert/ModalAlert';
import { BASE_URL } from '../../Constant/constant';
import axios from 'axios';
require('react-datepicker/dist/react-datepicker.css');
require('../../../node_modules/react-treeview/react-treeview.css');
require('../ViewData/ViewDataComponentStyle.css');

class ViewReportComponent extends ViewSourceComponent {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchDates(this.state.startDate ? moment(this.state.startDate).format('YYYYMMDD') : "19000101",this.state.endDate ? moment(this.state.endDate).format('YYYYMMDD') : "30200101", 'report_catalog');
  }

  renderAccordions() {
    this.dataSource = this.props.data_date_heads;

    if (this.dataSource == null) {
      return(
        <h1>Loading...</h1>
      )
    } else {
      if (this.dataSource.length == 0) {
        return(
          <h1>No data found</h1>
        )
      }
      return(
        <div>
          {
            this.dataSource.map((node, i) => {
              return(
                <Collapsible trigger={node.year} key={i}>
                  {
                    Object.keys(node.month).map((item,index) => {
                      return(
                        <Collapsible trigger={item} key={index}>
                          {
                              node.month[item].map((date_item,date_index) => {
                                return(
                                  <ReportTreeInfoComponent
                                    year={node.year}
                                    month={item}
                                    date={date_item}
                                    key={date_index}
                                    /*apiFor={this.props.apiFor}*/
                                  />
                                )
                              })

                          }
                        </Collapsible>
                      )
                    })
                  }
                </Collapsible>
              )
            })
          }
        </div>
      )
    }
  }

  handleStartDateChange(date) {
    this.setState({startDate: date});
    this.props.fetchDates(date ? moment(date).format('YYYYMMDD') : "19000101",this.state.endDate ? moment(this.state.endDate).format('YYYYMMDD') : "30200101",'report_catalog');
  }

  handleEndDateChange(date) {
    this.setState({endDate: date});
    this.props.fetchDates(this.state.startDate ? moment(this.state.startDate).format('YYYYMMDD') : "19000101",date ? moment(date).format('YYYYMMDD') : "30200101",'report_catalog');
  }
}

const VisibleViewReportComponent = connect(
  mapStateToProps,
  mapDispatchToProps
) (ViewReportComponent);

export default VisibleViewReportComponent;
