import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ColResize from 'colresizable/colResizable-1.6.min'
export default class TableBody extends Component {
    constructor(props) {
        super(props);
        this.table = null;
    }
    render(){
      return(
        <tbody>
            <tr>
                <td>1</td>
                <td>Alfreds Futterkiste</td>
                <td>Maria Anders</td>
                <td>Germany</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Centro comercial Moctezuma</td>
                <td>Francisco Chang</td>
                <td>Mexico</td>
            </tr>
            <tr>
                <td>3</td>
                <td>Ernst Handel</td>
                <td>Roland Mendel</td>
                <td>Austria</td>
            </tr>
            <tr>
                <td>4</td>
                <td>Island Trading</td>
                <td>Helen Bennett</td>
                <td>UK</td>
            </tr>
            <tr>
                <td>5</td>
                <td>Laughing Bacchus Winecellars</td>
                <td>Yoshi Tannamuri</td>
                <td>Canada</td>
            </tr>
            <tr>
                <td>6</td>
                <td>Magazzini Alimentari Riuniti</td>
                <td>Giovanni Rovelli</td>
                <td>Italy</td>
            </tr>
        </tbody>
      )
    }
}
