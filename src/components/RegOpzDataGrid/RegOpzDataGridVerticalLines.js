import React, {Component} from 'react';
import ReactDOM from 'react-dom';
export default class RegOpzDataGridVerticallLines extends Component {
    constructor(props) {
        super(props);
        this.numberofCols = this.props.numberofCols;
        this.style = {
            height:this.props.height
        }
    }
    render(){
        return(
          <div style={this.style} ref={(regVerticalLineHolder) => {
              this.regVerticalLineHolder = regVerticalLineHolder;
            }}
            className="reg_vertical_line_holder"
            >
              {
                [... Array(parseInt(this.numberofCols))].map(function(item,index){
                    return (
                        <div key={index} className="reg_vertical_line">
                        </div>
                    )
                })
              }
          </div>
        )
    }
}
