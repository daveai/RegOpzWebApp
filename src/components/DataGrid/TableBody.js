import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ColResize from 'colresizable/colResizable-1.6.min'
export default class TableBody extends Component {
    constructor(props) {
        super(props);
        this.table = null;
        this.data = {
          matrix:[
            {"A2": "THE MONETARY AUTHORITY OF SINGAPORE\r\nTotal Foreign ExDhange Business TransaDted By LGT BANK (SINGAPORE) LTD"},
            {"U3": "Institution Code : D7117"},
            {"U4": "ACU S$000"},
            {"A5": "Type of Currency"}
          ]
        }
        this.rows = [[]];
        for (var i = 0; i < 50; i++){
            this.rows.push([]);
            for (var j = 0; j < 50; j++){
                if (j == 0){
                    this.rows[i].push(i);
                } else {
                    this.rows[i].push("");
                }
            }
        }
        this.state = {
            rows: this.rows
        }
    }
    render(){
      console.log(this.state.rows);
      var self = this;
      return(
        <tbody>
            {
                this.state.rows.map(function(col,cindex){
                    return(
                        <tr key={cindex}>
                            {
                                col.map(function(row,rindex){
                                    if (rindex != 0) {
                                        return(
                                            <td key={rindex}>
                                                <input className="gridInput" value={row} onChange={(input) => {
                                                    self.rows[cindex][rindex] = input.target.value;
                                                    self.setState({
                                                        row:self.rows
                                                    })
                                                  }} />
                                            </td>
                                        )
                                    }
                                    return(
                                        <td key={rindex}>
                                            {row + 1}
                                        </td>
                                    )
                                })
                            }
                        </tr>
                    )
                })
            }
        </tbody>
      )

    }

}
