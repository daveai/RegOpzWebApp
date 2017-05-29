import React, {Component} from 'react';
import ReactDOM from 'react-dom';
export default class RegOpzDataGridSideMarker extends Component {
    constructor(props) {
        super(props);
        this.numberofRows = this.props.numberofRows;
        this.rowAttr = this.props.rowAttr;
    }
    componentWillReceiveProps(nextProps){
      this.rowAttr = nextProps.rowAttr;
    }
    render() {
        return (
            <div className="reg_grid_row_marker_holder">
                {
                    [...Array(parseInt(this.numberofRows))].map(function(item,index){
                        //console.log(`Height of ${index+1} is`,this.props.rowAttr[(index+1)+""]);
                        var stylex = {};
                        if(typeof(this.rowAttr[(index+1)+""]) != 'undefined') {
                          stylex.height = parseInt(this.rowAttr[(index+1)+""].height) * 2;
                        }
                        return (
                          <div className="rowMarker" style={stylex} key={index}>
                            <span></span>
                            <div className="clearfix"></div>
                          </div>
                        )
                    }.bind(this))
                }
            </div>
        );
    }
}
