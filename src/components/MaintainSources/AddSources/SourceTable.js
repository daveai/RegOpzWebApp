import React, { Component } from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';

class SourceTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            types: [
                {
                    type: "int",
                    selected: false
                },
                {
                    type: "bigint",
                    selected: false
                },
                {
                    type: "float",
                    selected: false
                },
                {
                    type: "datetime",
                    selected: false
                },
                {
                    type: "varchar",
                    selected: false
                },
                {
                    type: "text",
                    selected: false
                },
            ],
            varcharSelected: false,
            varcharAmount: 200
        };

        this.checkVarCharSize = this.checkVarCharSize.bind(this);
        this.setVarChar = this.setVarChar.bind(this);
    }

    componentWillMount() {
        var selectedType = this.props.Type;
        var regex = /varchar\((\d+)\)/;
        if (regex.test(selectedType)) {
            var currentTypes = this.state.types;
            for (let i = 0; i < currentTypes.length; i++) {
                if (i === 4)
                    currentTypes[i].selected = true;
                else
                    currentTypes[i].selected = false;
            }
            var match = regex.exec(selectedType);
            var varcharAmount = parseInt(match[1]);
            var varcharSelected = true;
            this.setState({
                types: currentTypes,
                varcharAmount: varcharAmount,
                varcharSelected: varcharSelected
            });
        }
        else {
            var currentTypes = this.state.types;
            for (let i = 0; i < currentTypes.length; i++) {
                if (currentTypes[i].type === selectedType)
                    currentTypes[i].selected = true;
                else
                    currentTypes[i].selected = false;
            }
            this.setState({
                type: currentTypes,
                varcharAmount: 200,
                varcharSelected: false
            });
        }
    }


    componentWillReceiveProps(nextProps) {
        var selectedType = nextProps.Type;
        var regex = /varchar\((\d+)\)/;
        if (regex.test(selectedType)) {
            var currentTypes = this.state.types;
            for (let i = 0; i < currentTypes.length; i++) {
                if (i === 4)
                    currentTypes[i].selected = true;
                else
                    currentTypes[i].selected = false;
            }
            var match = regex.exec(selectedType);
            var varcharAmount = parseInt(match[1]);
            var varcharSelected = true;
            this.setState({
                types: currentTypes,
                varcharAmount: varcharAmount,
                varcharSelected: varcharSelected
            });
        }
        else {
            var currentTypes = this.state.types;
            for (let i = 0; i < currentTypes.length; i++) {
                if (currentTypes[i].type === selectedType)
                    currentTypes[i].selected = true;
                else
                    currentTypes[i].selected = false;
            }
            this.setState({
                type: currentTypes,
                varcharAmount: 200,
                varcharSelected: false
            });
        }
    }

    checkVarCharSize(event, index) {
        var value = event.target.value;
        if (value === 'varchar') {
            this.setState({ varcharSelected: true });
            let varcharValue = `varchar(${this.state.varcharAmount})`;
            this.props.handleChange({ target: { value: varcharValue } }, 'type', index);
        }
        else {
            this.setState({ varcharSelected: false });
            this.props.handleChange(event, 'type', index);
        }
    }

    setVarChar(event, index) {
        var value = event.target.value;
        value = value > 2000 ? 2000 : value;
        value = value <= 0 ? 1 : value;
        this.setState({ varcharAmount: value }, () => {
            var varcharValue = `varchar(${this.state.varcharAmount})`;
            this.props.handleChange({ target: { value: varcharValue } }, 'type', index);
        });
    }

    render() {
        return (
            <tr>
                <td>
                    <FormControl
                        type="text"
                        required="required"
                        maxLength="60"
                        placeholder="Enter field name"
                        value={this.props.Field}
                        onChange={(event) => { this.props.handleChange(event, 'field', this.props.index); }}
                        disabled={this.props.disabled}
                    />
                </td>
                <td>
                    <FormGroup controlId="typeSelect">
                        <FormControl
                            componentClass="select"
                            placeholder="select"
                            disabled={this.props.disabled}
                            onChange={(event) => { this.checkVarCharSize(event, this.props.index) }}
                        >
                            {
                                this.state.types.map(element => {
                                    return (
                                        <option
                                            value={element.type}
                                            selected={element.selected}
                                            key={element.type}
                                        >
                                            {element.type}
                                        </option>
                                    );
                                })
                            }
                        </FormControl>
                        {
                            this.state.varcharSelected &&
                            <FormControl
                                required="required"
                                type="number"
                                value={this.state.varcharAmount}
                                onChange={(event) => { this.setVarChar(event, this.props.index) }}
                                disabled={this.props.disabled}
                            />
                        }
                    </FormGroup>
                </td>
                <td>
                    <FormControl
                        required="required"
                        componentClass="select"
                        placeholder="Is Nullable"
                        value={this.props.Null}
                        onChange={(event) => { this.props.handleChange(event, 'nullable', this.props.index) }}
                        disabled={this.props.disabled}
                    >
                        <option key="YES" value="YES" selected={true}>YES</option>
                        <option key="NO" value="NO">NO</option>
                    </FormControl>
                </td>
                <td>
                    <FormControl
                        type="text"
                        placeholder="Enter the key if any"
                        value={this.props.Key}
                        onChange={(event) => { this.props.handleChange(event, 'key', this.props.index) }}
                    />
                </td>
                <td>
                    <FormControl
                        type="text"
                        placeholder="Enter a default if any"
                        value={this.props.Default}
                        onChange={(event) => { this.props.handleChange(event, 'default', this.props.index) }}
                    />
                </td>
                <td>
                    <FormControl
                        type="text"
                        placeholder="Enter any extra data"
                        value={this.props.Extra}
                        onChange={(event) => { this.props.handleChange(event, 'extra', this.props.index) }}
                    />
                </td>
                <td>
                    <div>
                        {
                            this.props.index !== 0 &&
                            <button
                                type="button"
                                className="btn btn-circle btn-primary btn-xs"
                                onClick={() => { this.props.moveRow(this.props.index, 'UP') }}
                            >
                                <i className="fa fa-arrow-up"></i>
                            </button>
                        }
                        {
                            this.props.index !== this.props.maxIndex &&
                            <button
                                type="button"
                                className="btn btn-circle btn-primary btn-xs"
                                onClick={() => { this.props.moveRow(this.props.index, 'DOWN') }}
                            >
                                <i className="fa fa-arrow-down"></i>
                            </button>
                        }
                        <button
                            type="button"
                            className="btn btn-circle btn-warning btn-xs"
                            onClick={() => { this.props.removeRow(this.props.index) }}
                            disabled={this.props.disabled}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        );
    }

}

export default SourceTable;
