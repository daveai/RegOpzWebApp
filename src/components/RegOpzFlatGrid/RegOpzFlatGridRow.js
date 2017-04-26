import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import RegOpzFlatGridCell from './RegOpzFlatGridCell';
import _ from 'lodash';
export default class RegOpzFlatGridRow extends Component {
    constructor(props){
        super(props);
        this.textField = null;
        this.data = props.data;
        this.cols = props.columns;
        this.selectedRows = [];
    }
    componentWillReceiveProps(nextProps){
        this.cols = nextProps.columns;
        this.data = nextProps.data;
    }
    isBusinessRulePresent(item){
      let row = _.where(this.selectedRows, item);
      if(row.length != 0){
        return true
      }  else {
        return false
      }
    }
    render(){
        return(
            <div className="flat_grid_rows_container">{
                this.data.map(function(item,index){
                    return(
                        <div
                            onClick={
                                (event) => {
                                    this.props.onSelect(index,item);
                                }
                            }
                            key={index}
                            className="flat_grid_row_container">
                                <div
                                    onClick={
                                        (event) => {
                                            if(this.isBusinessRulePresent(item)){
                                              var index = this.selectedRows.indexOf(item);
                                              this.selectedRows.splice(index, 1);
                                            } else {
                                              this.selectedRows.push(item);
                                            }
                                            this.props.onFullSelect(this.selectedRows);
                                            $(event.target).parent(".flat_grid_row_container").toggleClass("flat_grid_selected_row");
                                        }
                                    }
                                    key={index}
                                    className="flat_grid_header_cell">
                                </div>
                                {
                                    this.cols.map(function(citem,cindex){
                                        return(
                                          <RegOpzFlatGridCell
                                            key={cindex}
                                            data={item}
                                            identifier={citem}
                                            onUpdateRow={this.props.onUpdateRow}
                                         />
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
