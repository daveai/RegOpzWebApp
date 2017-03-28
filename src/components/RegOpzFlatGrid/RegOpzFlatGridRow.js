import React, {Component} from 'react';
import ReactDOM from 'react-dom';
export default class RegOpzFlatGridRow extends Component {
    constructor(props){
        super(props);

    }
    render(){
        var _self = this;
        return(
            <div>{
                this.props.data.map(function(item,index){
                    return(
                        <div className="flat_grid_row_container">
                            {
                                this.props.columns.map(function(citem,cindex){
                                    return(
                                        <div className="flat_grid_row_cell">
                                            <span>                                              
                                              <input value={item[citem]} />
                                            </span>
                                        </div>
                                    )
                                }.bind(this))
                            }

                        </div>
                    )
                }.bind(this))
            }</div>
        )
    }
}
