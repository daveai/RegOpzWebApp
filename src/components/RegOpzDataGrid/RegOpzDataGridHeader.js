import React, {Component} from 'react';
import ReactDOM from 'react-dom';
export default class RegOpzDataGridHeader extends Component {
    constructor(props) {
        super(props);
        this.columns = [];
        for (let i = 0; i < 1000; i++) {
            this.columns.push(this.alphaSequence(i));
        }
        this.regHeaderStyle = {
            width: this.columns.length * 102
        }
        this.colStyle = [];
        this.rows = [
            {cell:'A1', value:"Sample"},
            {cell:'B1', value:"Sample"},
            {cell:'G4', value:"Sample"}
        ]
        this.matrix = [[]];
        for(let k = 0; k < this.rows.length; k++){
            console.log("Loop: ",k);
            this.matrix.push([]);
            for(let j = 0; j < this.columns.length; j++){
                this.matrix[k][j] = k + "," + j;
            }
        }
        /*this.rows.map(function(item,index){
            let cell = item.cell;
            let coord = this.getRealCoords(cell);
            this.matrix[coord.y][coord.x] = item.value;
        }.bind(this));*/
    }
    render() {
        var _self = this;
        return (
            <div style={this.regHeaderStyle} className="reg_header">
                <div className="reg_col_first"></div>
                {this.columns.map(function(item, index) {
                    return (
                        <div onClick={(event)=>{
                                _self.colStyle["reg_resize" + index] = {
                                    width:"300px"
                                }
                                _self.setState({});
                            }} key={index} className="reg_col" style={_self.colStyle["reg_resize" + index]}>
                            <span>{item}</span>
                        </div>
                    )
                })
                }

                {
                    this.matrix.map(function(row,rindex){
                        return (
                            <div key={rindex}>
                                <div className="clearfix"></div>
                                <div className="reg_col_first">{rindex}</div>
                                {
                                    row.map(function(col,cindex){
                                        return(
                                            <div key={cindex} className="reg_col" style={_self.colStyle["reg_resize" + cindex]}>
                                                <span>{col}</span>
                                            </div>
                                        )
                                    }.bind(_self))
                                }
                            </div>

                        )
                    }.bind(_self))
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
