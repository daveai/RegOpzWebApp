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
                                <button className="btn flat_grid_header_sort_button" onClick={(event) => {                                 
                                        this.props.onSort(item, this.direction)
                                        this.direction = ~this.direction;
                                        if (this.direction == false){
                                            $(event.target).children('i').addClass('fa-caret-down');
                                            $(event.target).children('i').removeClass('fa-caret-up');
                                        } else {
                                            $(event.target).children('i').removeClass('fa-caret-down');
                                            $(event.target).children('i').addClass('fa-caret-up');
                                        }
                                        
                                    }}
                                >
                                    <i className="fa fa-caret-down" aria-hidden="true"></i>
                                </button>
                            </div>
                        )
                    }.bind(this))
                }
            </div>
        )
    }
}
