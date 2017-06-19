import React, {Component} from 'react';
import ReactDOM from 'react-dom';
export default class RegOpzFlatGridHeader extends Component {
    constructor(props){
        super(props);
        this.direction = false;
    }
    render(){
        return(
            <div className="flat_grid_header_container">
                <div className="flat_grid_header_cell">
                  <input type="checkbox"></input>
                </div>
                {
                    this.props.columns.map(function(item,index){
                        return(
                            <div key={item} className="flat_grid_header_cell">

                                <span>{item}</span>

                            </div>
                        )
                    }.bind(this))
                }
            </div>
        )
    }
}
