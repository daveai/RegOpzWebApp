import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, dispatch} from 'redux';
import ReactDOM from 'react-dom';
import DataGrid from 'react-datagrid';
require('react-datagrid/dist/index.css');
require('./MaintainBusinessRules.css');
export default class MaintainBusinessRules extends Component {
    constructor(props) {
        super(props);
        this.data = [
            {
                id: '1',
                n1: 'John',
                n2: 'Bobson'
            }, {
                id: '2',
                n1: 'Bob',
                n2: 'Mclaren'
            }
        ]
        this.columns = [];
        for(var i = 0; i < 100; i++){
            this.columns.push({name:"n" + i,title:"N" + i})
        }

    }
    render() {
        return (
            <div className="dataGridHolder">
                <h1>Hello</h1>
                <DataGrid idProperty="id"
                     dataSource={this.data}
                     columns={this.columns}
                     onColumnResize={(firstCol, firstSize, secondCol, secondSize)=>{
                        firstCol.width = firstSize
                        this.setState({});
                     }}
                  />
            </div>

        );
    }
}
