import React, {Component} from 'react';
import ReactDOM from 'react-dom';
export default class RegOpzDataGridBody extends Component {
    constructor(props) {
        super(props);
        this.data = this.props.data;
        this.delTop = 30;
        this.delLeft = 101;
        this.delHeight = 29;
        this.delWidth = 100;
        this._delHeight = 30;
        this._delWidth = 101;
        this.colAttr = this.props.colAttr;

    }
    render(){
        console.log('colAttr ', this.colAttr);
        var totalWidthDisplacement = 0;
        for (const key of Object.keys(this.colAttr)) {
            //console.log(key, this.colAttr[key]['width']);
            totalWidthDisplacement += this.colAttr[key]['width'] - 99;
        }
        return(
            <div>
                {
                    this.data.map(function(item,index){
                        let cell = item.cell;
                        let value = item.value;
                        let coord = this.getRealCoords(cell);
                        let merged = item.merged;

                        if(merged){
                            var stylex = {
                              top:coord.y*this.delTop,
                              left:coord.x*this.delLeft,
                              width:this.delWidth,
                              height:this.delHeight
                            }
                            let merged_coord = this.getRealCoords(merged);
                            let width_adjust = Math.abs(merged_coord.x - coord.x);
                            let height_adjust = Math.abs(merged_coord.y - coord.y);
                            stylex.width = ((width_adjust + 1) * this._delWidth) - 1 + totalWidthDisplacement;
                            stylex.height = ((height_adjust + 1) * this._delHeight) -1;
                        } else {
                          var stylex = {
                            top:coord.y*this.delTop,
                            left:coord.x*this.delLeft + totalWidthDisplacement,
                            width:this.delWidth,
                            height:this.delHeight
                          }
                        }
                        return(
                            <div key={index} className="reg_cell" style={stylex}>
                                <span>{value}</span>
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
        //console.log(cell_split);
        let x = this.numberFromWord(cell_split[0]);
        let y = cell_split[1] - 1;
        return {x,y,col:cell_split[0],row:cell_split[1] - 1};
    }
}
