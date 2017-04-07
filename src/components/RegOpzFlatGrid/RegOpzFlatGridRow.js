import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import RegOpzFlatGridCell from './RegOpzFlatGridCell';
export default class RegOpzFlatGridRow extends Component {
    constructor(props){
        super(props);
        this.textField = null;
        this.data = props.data;
        this.cols = props.columns;
    }
    componentWillReceiveProps(nextProps){
        console.log("will receive props in row ",this.data);
        this.cols = nextProps.columns;
        this.data = nextProps.data;
    }
    render(){
        console.log("will receive props in row render ",this.data);
        return(
            <div>{
                this.data.map(function(item,index){
                    return(
                        <div onClick={(event) => {
                            this.props.onSelect(index);
                        } } key={index} className="flat_grid_row_container">
                            {
                                this.cols.map(function(citem,cindex){
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
