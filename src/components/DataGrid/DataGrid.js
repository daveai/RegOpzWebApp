import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactDataGrid from 'react-datagrid';
import RightSlidePanel from './RightSlidePanel';
require('react-datagrid/index.css');
export default class DashboardIndex extends Component {
    constructor() {
        super();
        this.data = [
          { id: '1', firstName: 'John', lastName: 'Bobson'},
          { id: '2', firstName: 'Bob', lastName: 'Mclaren'},
          { id: '3', firstName: 'Bob', lastName: 'Mclaren'},
          { id: '4', firstName: 'Bob', lastName: 'Mclaren'},
          { id: '5', firstName: 'Bob', lastName: 'Mclaren'},
          { id: '6', firstName: 'Bob', lastName: 'Mclaren'},
          { id: '7', firstName: 'Bob', lastName: 'Mclaren'},
          { id: '8', firstName: 'Bob', lastName: 'Mclaren'},
          { id: '9', firstName: 'Bob', lastName: 'Mclaren'},
          { id: '10', firstName: 'Bob', lastName: 'Mclaren'},
          { id: '11', firstName: 'Bob', lastName: 'Mclaren'},
          { id: '12', firstName: 'Bob', lastName: 'Mclaren'},
          { id: '13', firstName: 'Bob', lastName: 'Mclaren'},
          { id: '14', firstName: 'Bob', lastName: 'Mclaren'},
          { id: '15', firstName: 'Bob', lastName: 'Mclaren'},
        ]
        this.columns = [
          { name: 'firstName'},
          { name: 'lastName'}
        ]
        this.SELECTED_ID = 0;
    }
    componentDidMount() {

    }
    handleClick(newSelectedId, data){
        console.log(data);
        this.refs.rpanel.toggleMe();
    }
    render() {
        return (
            <div className="row">
                <div id="gridCont" className="col-md-12 col-sm-12 col-xs-12">
                    <RightSlidePanel ref="rpanel" />
                    <div className="x_panel">
                        <div className="x_title">
                            <h2>Sample </h2>
                            <div className="clearfix"></div>
                        </div>
                        <div className="x_content">
                            <ReactDataGrid idProperty="id" dataSource={this.data} columns={this.columns} onSelectionChange={this.handleClick.bind(this)}
                                selected={this.SELECTED_ID}                                
                             />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
