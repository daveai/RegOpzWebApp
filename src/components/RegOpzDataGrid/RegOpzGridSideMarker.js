import React, {Component} from 'react';
import ReactDOM from 'react-dom';
export default class RegOpzDataGridSideMarker extends Component {
    constructor(props) {
        super(props);
        this.numberofRows = this.props.numberofRows;
    }
    render() {
        return (
            <div className="reg_grid_row_marker_holder">
                {
                    [...Array(parseInt(this.numberofRows))].map(function(item,index){
                        return (
                          <div className="rowMarker" key={index}>
                            <span>{index+1}</span>
                            <div className="clearfix"></div>
                          </div>
                        )
                    })
                }
            </div>
        );
    }
}
