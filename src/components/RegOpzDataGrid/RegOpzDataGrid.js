import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import RegOpzDataGridHeader from './RegOpzDataGridHeader';
import RegOpzDataGridSideMarker from './RegOpzGridSideMarker';
import RegOpzDataGridHorizontalLines from './RegOpzDataGridHorizontalLines';
import RegOpzDataGridVerticalLines from './RegOpzDataGridVerticalLines';
import RegOpzDataGridBody from './RegOpzDataGridBody';
require('./RegOpzDataGrid.css');
export default class RegOpzDataGrid extends Component {
  constructor(props){
    super(props);
    this.numberofCols = 26;
    this.numberofRows = 1000;
    this.data = [
      {cell:"A1", value:"A1"},
      {cell:"B1", value:"B1", merged:"F4"},
      {cell:"A12", value:"A12"},
      {cell:"H1", value:"H1"},
      {cell:"D6", value:"D6", merged:"I9"},
    ]
  }
  render(){
    return(
      <div className="reg_gridHolder">
        <RegOpzDataGridHeader numberofCols={this.numberofCols} />
        <div className="clearfix"></div>
        <RegOpzDataGridSideMarker numberofRows={this.numberofRows} />
        <div className="reg_grid_drawing_container">
            <RegOpzDataGridHorizontalLines numberofRows={this.numberofRows} />
            <RegOpzDataGridVerticalLines numberofCols={this.numberofCols} height={this.numberofRows * 30} />
            <RegOpzDataGridBody data={this.data} />
        </div>
      </div>
    )
  }
}
