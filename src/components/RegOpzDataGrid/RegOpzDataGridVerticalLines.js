import React, {Component} from 'react';
import ReactDOM from 'react-dom';
export default class RegOpzDataGridVerticallLines extends Component {
    constructor(props) {
        super(props);
        this.numberofCols = this.props.numberofCols;
        this.style = {
            height:this.props.height
        }
        this.colAttr = this.props.colAttr;
    }
    componentWillReceiveProps(nextProps){
      this.colAttr = nextProps.colAttr;
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
                    //console.log("number from word",this.alphaSequence(index));
                    let colStyleForCell = {};
                    if(typeof(this.colAttr[this.alphaSequence(index)]) != 'undefined'){
                      colStyleForCell.width = parseInt(this.colAttr[this.alphaSequence(index)]['width']) * 9 + 1;
                    }
                    return (
                        <div key={index} style={colStyleForCell} className="reg_vertical_line">
                        </div>
                    )
                }.bind(this))
              }
          </div>
        )
    }
    alphaSequence(i) {
        return i < 0
            ? ""
            : this.alphaSequence((i / 26) - 1) + String.fromCharCode((65 + i % 26) + "");
    }
}
