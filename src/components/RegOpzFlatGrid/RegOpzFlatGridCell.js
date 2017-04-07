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
    componentWillReceiveProps(newProps){
        /*this.setState ({
            value: newProps.data[newProps.identifier],
        })*/
        this.state = {
            value: newProps.data[newProps.identifier],
        }
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
        console.log("The editing data (data,identifier,id)", this.props.data[this.props.identifier], this.props.identifier,this.props.data['id']);
        this.inputElem = document.createElement("input");
        this.inputElem.value = this.state.value;
        this.inputElem.addEventListener('change', this.handleChange.bind(this), false);
        this.inputElem.addEventListener('blur', this.handleBlur.bind(this), false);
        event.target.appendChild(this.inputElem);
        this.inputElem.focus();
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
