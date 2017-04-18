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
                <div className="flat_grid_header_cell"></div>
                {
                    this.props.columns.map(function(item,index){
                        return(
                            <div key={item} className="flat_grid_header_cell">
                                <span>{item}</span>
                                <button onClick={(event) => {                                 
                                        this.props.onSort(item, this.direction)
                                        this.direction = ~this.direction;
                                        if (this.direction == false){
                                            event.target.innerText = "Sort ASC";
                                        } else {
                                            event.target.innerText = "Sort DESC";
                                        }
                                        
                                    }}
                                >Sort ASC</button>
                            </div>
                        )
                    }.bind(this))
                }
            </div>
        )
    }
}
