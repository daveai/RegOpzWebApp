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
      var _self = this;
        return(
            <div className="flat_grid_container">
                <RegOpzFlatGridHeader columns={this.cols} />
                <div className="clearfix"></div>
                {
                  this.data.map(function(item,index){
                    return(
                      <RegOpzFlatGridRow key={index} columns={_self.cols} data={item} />
                    )
                  })
                }
            </div>
        )
    }
}
