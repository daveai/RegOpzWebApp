import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import RegOpzFlatGridCell from './RegOpzFlatGridCell';
export default class RegOpzFlatGridRow extends Component {
    constructor(props){
        super(props);
        this.textField = null;
    }
    render(){
        return(
            <div>{
                this.props.data.map(function(item,index){
                    return(
                        <div key={index} className="flat_grid_row_container">
                            {
                                this.props.columns.map(function(citem,cindex){
                                    return(
                                      <RegOpzFlatGridCell key={cindex} data={item} identifier={citem} />
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
