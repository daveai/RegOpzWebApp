import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import RegOpzDataGridHeader from './RegOpzDataGridHeader';
require('./RegOpzDataGrid.css');
export default class RegOpzDataGrid extends Component {
  constructor(props){
    super(props);        
  }
  render(){
    return(
      <div className="reg_gridHolder">
        <RegOpzDataGridHeader />

      </div>
    )
  }
}
