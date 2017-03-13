import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ColResize from 'colresizable/colResizable-1.6.min'
import { connect } from 'react-redux';
import { bindActionCreators, dispatch } from 'redux';
import { actionFetchReportData } from '../../actions/DataGridAction';
class TableBody extends Component {
    constructor(props) {
        super(props);
        this.table = null;
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
    componentWillMount(){
        this.props.fetchReportData("MAS00103");
    }
    updateRows(data){
        let lookup = {
            'A':0,
            'B':1,
            'C':2,
            'D':3,
            'E':4,
            'F':5,
            'G':6,
            'H':7,
            'I':8,
            'J':9,
            'K':10,
            'L':11,
            'M':12,
            'N':13,
            'O':14,
            'P':15,
            'Q':16,
            'R':17,
            'S':18,
            'T':19,
            'U':20,
            'V':21,
            'W':22,
            'X':23,
            'Y':24,
            'Z':25
        }
        if(data.length){
            let sheet_1 = data[0];
            console.log("Table body data: ", sheet_1.matrix);
            for(var i = 0; i < sheet_1.matrix.length; i++){
                let cell = sheet_1.matrix[i];
                let coords = cell.cell;
                let x = coords.charAt(0);
                let y = coords.charAt(1);
                console.log("Coordinate: ", x,y, cell.value);
                let real_x = lookup[x];
                console.log("real x,y: ", real_x,y);
                this.rows[y -1][real_x + 1] = cell.value;
            }
        }
    }
    render(){
        this.updateRows(this.props.report)
        //this.rows[0][2] = "lll";
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
const mapDispatchToProps = (dispatch) => {
  return {
    fetchReportData: (id) => {
      dispatch(actionFetchReportData(id))
    }
  }
}
function mapStateToProps(state){
  return {
    report:state.report
  }
}
const VisibleTableBody = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableBody);
export default VisibleTableBody;
