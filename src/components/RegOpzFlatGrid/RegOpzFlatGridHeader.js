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
                            <div key={item} className="flat_grid_header_cell">
                                <span>{item}</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
