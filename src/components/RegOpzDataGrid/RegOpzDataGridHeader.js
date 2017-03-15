import React, {Component} from 'react';
import ReactDOM from 'react-dom';
export default class RegOpzDataGridHeader extends Component {
  constructor(props){
    super(props);
    this.columns = [];
    for(let i = 0; i < 5000; i++ ){
      this.columns.push(this.alphaSequence(i));
    }
    this.regHeaderStyle = {
      width: this.columns.length * 102
    }
  }

  render(){
    return(
      <div style={this.regHeaderStyle} className="reg_header">
        <div className="reg_col">
        </div>
        {
          this.columns.map(function(item,index){
            return(
              <div key={index} className="reg_col">
                <span>{item}</span>
              </div>
            )
          })
        }
      </div>
    )
  }
  alphaSequence(i){
       return i < 0 ? "" : this.alphaSequence((i / 26) - 1) + String.fromCharCode((65 + i % 26) + "");
  }
}
