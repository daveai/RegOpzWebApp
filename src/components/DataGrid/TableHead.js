import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ColResize from 'colresizable/colResizable-1.6.min'
export default class TableGrid extends Component {
    constructor(props) {
        super(props);
        this.table = null;
    }
    alphaSequence(i){
         return i < 0 ? "" : this.alphaSequence((i / 26) - 1) + String.fromCharCode((65 + i % 26) + "");
    }
    render(){
        var headerItems = [];
        headerItems.push("");
        for (var i = 0; i < 20000; i++) {
            headerItems.push(this.alphaSequence(i));
        }
      return(
        <thead>
            <tr>
                {
                    headerItems.map(function(item,index){
                        return <th key={ index }>{item}</th>;
                    })
                }
            </tr>
        </thead>
      )
    }
}
