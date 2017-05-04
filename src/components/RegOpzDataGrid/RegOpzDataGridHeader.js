import React, {Component} from 'react';
import ReactDOM from 'react-dom';
export default class RegOpzDataGridHeader extends Component {
    constructor(props) {
        super(props);
        this.numberofCols = this.props.numberofCols;
        this.colAttr = this.props.colAttr;
        this.columns = [];
        for(let i = 0; i < this.numberofCols; i++){
            this.columns[i] = this.alphaSequence(i);
        }

    }
    render() {
        var _self = this;
        return (
            <div className="reg_header">
                <div className="reg_col_first">
                  <span></span>
                </div>
                {
                    this.columns.map(function(item, index) {
                        let colStyleForHeader = {};
                        if(typeof(this.colAttr[item]) != 'undefined'){
                          colStyleForHeader = {...this.colAttr[item]};
                          colStyleForHeader.width += 1;
                        }
                        return (
                            <div key={index} className="reg_col">
                                <span style={colStyleForHeader}>{item}</span>
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
    numberFromWord(val) {
        var base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            i,
            j,
            result = 0;

        for (i = 0, j = val.length - 1; i < val.length; i += 1, j -= 1) {
            result += Math.pow(base.length, j) * (base.indexOf(val[i]) + 1);
        }

        return result -1;
    }
    sliptNumbersAndChars(string){
        return string.match(/[A-Z]+|[0-9]+/g);
    }
    getRealCoords(cell){
        let cell_split = this.sliptNumbersAndChars(cell);
        console.log(cell_split);
        let x = this.numberFromWord(cell_split[0]);
        let y = cell_split[1] - 1;
        return {x,y};
    }
}
