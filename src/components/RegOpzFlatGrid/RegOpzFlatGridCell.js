import React, {Component} from 'react';
import ReactDOM from 'react-dom';
export default class RegOpzFlatGridCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.data[props.identifier],
            style:{display:'none'}
        }

    }
    render() {
        return (
            <div className="flat_grid_row_cell">
                <span onClick={this.handleCellClick.bind(this)}>
                    {this.state.value}
                    <input
                        value={this.state.value}
                        style={this.state.style}
                        onChange={this.handleChange.bind(this)}
                        onBlur={this.handleBlur.bind(this)}
                    />
                </span>
            </div>
        )
    }
    handleCellClick(event) {
        this.setState({
            style:{display:'block'}
        });
    }
    handleChange(event){
        this.setState({
            value:event.target.value
        });
    }
    handleBlur(event){
        this.setState({
            style:{display:'none'}
        });
    }

}
