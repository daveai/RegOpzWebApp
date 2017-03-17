import React, {Component} from 'react';
import ReactDOM from 'react-dom';
export default class RegOpzDataGridHeader extends Component {
    constructor(props) {
        super(props);
        this.columns = [];
        for (let i = 0; i < 50; i++) {
            this.columns.push(this.alphaSequence(i));
        }
        this.regHeaderStyle = {
            width: this.columns.length * 102
        }
        this.colStyle = [];
        this.rows = [
            {cell:'A1', value:"Sample", "merged":"V1"},
            {cell:'B1', value:"Sample"},
            {cell:'G4', value:"Sample"}
        ]
        this.matrix = [[]];
        for(let k = 0; k < 500; k++){
            this.matrix.push([]);
            for(let j = 0; j < this.columns.length; j++){
                this.matrix[k][j] = {
                    value:k + "," + j,
                    stylex:{
                        width:"100px",
                        height:"21px"
                    }
                }
            }
        }
        this.rows.map(function(item,index){
            let cell = item.cell;
            let merged =  item.merged;
            let coord = this.getRealCoords(cell);
            if(merged){
                let merged_coord = this.getRealCoords(merged);
                let y_dist = Math.abs(merged_coord.y - coord.y);
                let x_dist = Math.abs(merged_coord.x - coord.x);
                console.log("Distance: ",x_dist,y_dist);
                for(let i = coord.y + 1; i < y_dist + 1; i++){
                    this.matrix[i][coord.x].value = "merged";
                }
                for(let i = coord.x + 1; i < x_dist + 1; i++){
                    this.matrix[coord.y][i].value = "merged";
                }
                this.matrix[coord.y][coord.x].value = item.value;
                this.matrix[coord.y][coord.x].stylex.width = (x_dist + 1) * 98;
                this.matrix[coord.y][coord.x].stylex.height = (y_dist + 1) * 19;
            } else {
                if(this.matrix[coord.y][coord.x].value != "merged"){
                    this.matrix[coord.y][coord.x].value = item.value;
                }
            }

        }.bind(this));
    }
    render() {
        var _self = this;
        return (
            <div style={this.regHeaderStyle} className="reg_header">
                <div className="reg_col_first"></div>
                {this.columns.map(function(item, index) {
                    return (
                        <div key={index} className="reg_col">
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
                                        if(col.value != "merged"){
                                            return(
                                                <div key={cindex} className="reg_col">
                                                    <span style={col.stylex} >{col.value}</span>
                                                </div>
                                            )
                                        }

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
