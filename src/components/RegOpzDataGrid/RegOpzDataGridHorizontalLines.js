import React, {Component} from 'react';
import ReactDOM from 'react-dom';
export default class RegOpzDataGridHorizontalLines extends Component {
    constructor(props) {
        super(props);
        this.numberofRows = this.props.numberofRows;

    }
    render(){
        return(
          <div className="reg_horizontal_line_holder">
              {
                [... Array(parseInt(this.numberofRows))].map(function(item,index){
                    return (
                        <div key={index} className="reg_horizontal_line">
                            <div className="clearfix"></div>
                        </div>
                    )
                })
              }
          </div>
        )
    }
}
