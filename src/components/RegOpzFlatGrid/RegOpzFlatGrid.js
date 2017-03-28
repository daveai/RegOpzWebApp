import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import RegOpzFlatGridHeader from './RegOpzFlatGridHeader';
import RegOpzFlatGridRow from './RegOpzFlatGridRow';
require('./RegOpzFlatGridStyle.css');
export default class RegOpzFlatGrid extends Component {
    constructor(props){
        super(props);
        this.cols = props.columns;
        this.data = props.dataSource;
    }
    render(){
        return(
            <div className="flat_grid_container">
                <RegOpzFlatGridHeader columns={this.cols} />
                <div className="clearfix"></div>
                <RegOpzFlatGridRow columns={this.cols} data={this.data} />
            </div>
        )
    }
}
