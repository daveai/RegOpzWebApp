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
                                <button className="btn flat_grid_header_filter_button" >
                                    <i onClick={(event) => {
                                        $(event.target).parent().next(".flat_grid_filter_input_holder").toggle();

                                    }} className="fa fa-filter"></i>
                                </button>
                                <div className="flat_grid_filter_input_holder">
                                    <input 
                                        type="text" 
                                        onChange={
                                            (event) => {

                                            }                                        
                                        }
                                        onKeyPress={
                                            (event) => {
                                                if(event.key == "Enter"){
                                                    this.props.onFilter({
                                                        field_name:item,
                                                        value:event.target.value
                                                    })
                                                    $(event.target).parent(".flat_grid_filter_input_holder").toggle();   
                                                }
                                            }
                                        }
                                    />
                                </div>
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
