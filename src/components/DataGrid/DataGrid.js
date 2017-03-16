import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, dispatch } from 'redux';
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
            <TableGrid />
        );
    }
}
