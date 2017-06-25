import React,{Component} from 'react';
import {dispatch} from 'redux';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import {actionFetchVarianceData,
        actionSetVarianceChartData
        } from '../../actions/VarianceAnalysisAction';
import RegOpzDataGridHeader from '../RegOpzDataGrid/RegOpzDataGridHeader';
import RegOpzDataGridSideMarker from '../RegOpzDataGrid/RegOpzGridSideMarker';
import RegOpzDataGridHorizontalLines from '../RegOpzDataGrid/RegOpzDataGridHorizontalLines';
import RegOpzDataGridVerticalLines from '../RegOpzDataGrid/RegOpzDataGridVerticalLines';
import RegOpzDataGridBody from './VarianceAnalysisGridBody';
import '../RegOpzDataGrid/RegOpzDataGrid.css';
import './VarianceAnalysis.css';
import _ from 'lodash';



class VarianceAnalysisGrid extends Component{
  constructor(props){
    super(props);
    this.numberofCols = 26;
    this.numberofRows = 100;
    this.data = [];
    this.selectedSheet = 0;
    this.selectedCell = null;
    this.selectedSheetName = null;
    this.gridHight = 0;

  }

  componentWillMount(){
    if(typeof(this.props.data_imported)!='undefined'){
        const {report_id,first_date,subsequent_date}=this.props.data_imported;
        //console.log(report_id,first_date,subsequent_date);
        this.props.fetchVarianceData(report_id,first_date,subsequent_date);
    }

  }


  renderBackgroundColor(){
    const {data_imported}=this.props;
    //console.log(this.data.length);
    for(let i=0;i<this.data.length;i++){
      if(Math.abs(this.data[i].pct) >= data_imported.variance_percentage ){
        this.data[i]['background']='#99A2A6';
      }
      else{
        this.data[i]['background']='white';
      }

    }
  }


  render(){

    if(typeof this.props.variance_report=='undefined'){
      return(
        <h1> Loading...</h1>
      );
    }

    this.data=this.props.variance_report[this.selectedSheet].matrix;
    this.numberofRows = this.data.length;
    let row_attr = this.props.variance_report[this.selectedSheet].row_attr;
    let col_attr = this.props.variance_report[this.selectedSheet].col_attr;
    console.log('no of rows...',row_attr,row_attr.length);
    this.numberofRows = Object.keys(row_attr).length;
    this.numberofCols = Object.keys(col_attr).length;
    this.gridHight = 0;
    [... Array(parseInt(this.numberofRows))].map(function(item,index){
        //var stylex = {};
        if(typeof(row_attr[(index+1)+""]) != 'undefined') {
          this.gridHight += parseInt(row_attr[(index+1)+""].height) * 2;
        }
    }.bind(this));
    console.log('grid hight',this.gridHight);

    this.renderBackgroundColor();

    return(
      <div className="reg_gridHolder">
        <div className="row">
          <div className="col col-lg-12 reg_sheet_buttons_holder">
            <div className="btn-group">
              {
                  this.props.variance_report.map((item,index) => {
                    return(
                      <button
                        key={index}
                        target={index}
                        type="button"
                        className="btn btn-primary"
                        onClick={(event) => {
                          this.selectedSheet = event.target.getAttribute("target");

                          this.forceUpdate();
                        }}
                      >
                        {item['sheet']}
                      </button>
                    );
                  })
              }

            </div>
          </div>
        </div>

        <RegOpzDataGridHeader
          numberofCols={this.numberofCols}
          colAttr={this.props.variance_report[this.selectedSheet].col_attr}
        />

        <div className="clearfix"></div>

      <RegOpzDataGridSideMarker
        numberofRows={this.numberofRows}
        rowAttr={this.props.variance_report[this.selectedSheet].row_attr}
        />

        <div className="reg_grid_drawing_container">
            <RegOpzDataGridHorizontalLines
              numberofRows={this.numberofRows}
              rowAttr={this.props.variance_report[this.selectedSheet].row_attr}
              />

            <RegOpzDataGridVerticalLines
              numberofCols={this.numberofCols}
              height={this.gridHight}
              colAttr={this.props.variance_report[this.selectedSheet].col_attr}
              />
              <RegOpzDataGridBody
                data={this.data}
                colAttr={this.props.variance_report[this.selectedSheet].col_attr}
                rowAttr={this.props.variance_report[this.selectedSheet].row_attr}
                onSelect = {
                  (item) => {
                    this.selectedCell = item;
                    const obj=_.findWhere(this.data,{cell:this.selectedCell})
                    console.log("On select",this.selectedCell,obj);
                    this.props.setVarianceChartData(obj);
                    hashHistory.push('/dashboard/variance-analysis/variance-chart');
                  }
                }
              />
        </div>
      </div>
    );
  }


}



function mapStateToProps(state){
  return {
    data_imported:state.variance_analysis_store.data_exported,
    variance_report:state.variance_analysis_store.variance_report
  };
}

const mapDispatchToProps=(dispatch)=>{
  return{
    fetchVarianceData:(report_id,first_date,subsequent_date)=>{
      dispatch(actionFetchVarianceData(report_id,first_date,subsequent_date));
    },
    setVarianceChartData:(data)=>{
      dispatch(actionSetVarianceChartData(data));
    }
  };
}

const VisibleVarianceAnalysisGrid=connect(mapStateToProps,mapDispatchToProps)(VarianceAnalysisGrid);

export default VisibleVarianceAnalysisGrid;
