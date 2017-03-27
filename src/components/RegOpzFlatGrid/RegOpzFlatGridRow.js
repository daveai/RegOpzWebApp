import React, {Component} from 'react';
import ReactDOM from 'react-dom';
export default class RegOpzFlatGridRow extends Component {
    constructor(props){
        super(props);
        this.data = props.data
    }
    render(){
        var _self = this;
        return(
            <div className="flat_grid_row_container">
                {
                    this.props.columns.map(function(item,index){
                        return(
                            <div key={index} className="flat_grid_row_cell">
                                <span>
                                    <input value={_self.props.data[item.identifier]} />
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
