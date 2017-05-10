import React, {Component} from 'react';
import ReactDOM from 'react-dom';
export default class RegOpzDataGridHorizontalLines extends Component {
    constructor(props) {
        super(props);
        this.numberofRows = this.props.numberofRows;
        this.rowAttr = this.props.rowAttr
    }
    componentWillReceiveProps(nextProps){
      this.rowAttr = nextProps.rowAttr
    }
    render(){
        return(
          <div className="reg_horizontal_line_holder">
              {
                [... Array(parseInt(this.numberofRows))].map(function(item,index){
                    var stylex = {};
                    if(typeof(this.rowAttr[(index+1)+""]) != 'undefined') {
                      stylex.height = parseInt(this.rowAttr[(index+1)+""].height) * 2;
                    }
                    return (
                        <div key={index} style={stylex} className="reg_horizontal_line">
                            <div className="clearfix"></div>
                        </div>
                    )
                }.bind(this))
              }
          </div>
        )
    }
}
