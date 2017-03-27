import React, {Component} from 'react';
import ReactDOM from 'react-dom';
export default class RegOpzFlatGridHeader extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="flat_grid_header_container">
                {
                    this.props.columns.map(function(item,index){
                        return(
                            <div key={index} className="flat_grid_header_cell">
                                <span>{item.display}</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
