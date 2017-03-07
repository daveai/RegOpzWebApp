import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import RightSlidePanel from './RightSlidePanel';
import TableGrid from './TableGrid';
require ('./DataGridStyle.css');
export default class DataGrid extends Component {
    constructor(props){
        super(props);        
    }
    render(){
        return(
            <TableGrid row={this.props.route.row} col={this.props.route.col} />
        );
    }
}
