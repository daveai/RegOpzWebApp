import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ColResize from 'colresizable/colResizable-1.6.min'
import TableHead from './TableHead';
import TableBody from './TableBody';
export default class TableGrid extends Component {
    constructor(props) {
        super(props);
        this.table = null;

    }
    componentDidMount(){
        $(this.table).colResizable({
          resizeMode:'overflow'
        });
    }
    render() {
        return (
            <div className="dataGridHolder">
              <table id="dataGrid" ref={(table) => {this.table = table}}>
                  <TableHead />
                  <TableBody />
              </table>
              <br />
              <div className="clearfix"></div>
            </div>
        );
    }
}
