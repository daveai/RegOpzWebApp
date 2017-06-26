import React, {Component} from 'react';
import ReactDOM from 'react-dom';
export default class RegOpzDataGridVerticallLines extends Component {
    constructor(props) {
        super(props);
        this.numberofCols = this.props.numberofCols;
        this.style = {
            height:this.props.height,
            width:this.props.width
        }
        this.colAttr = this.props.colAttr;
        this.columns = [];
        for(let i = 0; i < this.numberofCols; i++){
            this.columns[i] = this.alphaSequence(i);
        }
    }
    componentWillReceiveProps(nextProps){
      this.colAttr = nextProps.colAttr;
      this.numberofCols = nextProps.numberofCols;
      this.style = {
          height:nextProps.height,
          width:nextProps.width
      }
      this.columns = [];
      for(let i = 0; i < this.numberofCols; i++){
          this.columns[i] = this.alphaSequence(i);
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
