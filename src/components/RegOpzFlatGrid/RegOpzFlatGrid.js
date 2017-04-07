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
        console.log("The data in cnstructor ",this.data);
    }
    componentWillReceiveProps(nextProps){
        console.log("will receive props ",this.data);
        this.cols = nextProps.columns;
        this.data = nextProps.dataSource;
    }
    render(){
        return(
            <div className="flat_grid_container">
                <RegOpzFlatGridHeader columns={this.cols} />
                <div className="clearfix"></div>
                <RegOpzFlatGridRow onSelect={this.props.onSelectRow} columns={this.cols} data={this.data} />
            </div>
        )
    }
}
