import { connect } from 'react-redux';
import SourceTreeInfoComponent from './SourceTreeInfoComponent';
import {
  ViewSourceComponent,
  mapDispatchToProps,
  mapStateToProps
} from '../SourceTreeInfo/ViewSourceComponent';

class ViewReportComponent extends ViewSourceComponent {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchDates(this.state.startDate ? moment(this.state.startDate).format('YYYYMMDD') : "19000101",this.state.endDate ? moment(this.state.endDate).format('YYYYMMDD') : "30200101", 'report_catalog');
  }

  handleStartDateChange(date) {
    this.setState({startDate: date});this.props.fetchDates(date ? moment(date).format('YYYYMMDD') : "19000101",this.state.endDate ? moment(this.state.endDate).format('YYYYMMDD') : "30200101",'report_catalog');
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
