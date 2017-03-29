import React, {Component} from 'react';
import ReactDOM from 'react-dom';
export default class RegOpzFlatGridCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.data[props.identifier],
        }
        this.inputElem = null;
    }
    render() {
        return (
            <div className="flat_grid_row_cell">
                <span onClick={this.handleCellClick.bind(this)}>
                    {this.state.value}
                </span>
            </div>
        )
    }
    handleCellClick(event) {
        this.inputElem = document.createElement("input");
        this.inputElem.value = this.state.value;
        this.inputElem.addEventListener('change', this.handleChange.bind(this), false);
        this.inputElem.addEventListener('blur', this.handleBlur.bind(this), false);
        event.target.appendChild(this.inputElem);
    }
    handleChange(event){
        this.setState({
            value:event.target.value
        });
    }
    handleBlur(event){        
        $(event.target).remove();
    }

}
