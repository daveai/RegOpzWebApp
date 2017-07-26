import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';

class CustomizeDashboard extends Component {
    constructor(props) {
        super(props);

        let indices = [];
        this.props.APIDetails.forEach((element, index) => {
            indices.push(index);
        });

        this.state = {
            APIDetails: this.props.APIDetails,
            indices: indices
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleIndexChange = this.handleIndexChange.bind(this);
        this.handleTileChange = this.handleTileChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let indices = [];
        nextProps.APIDetails.forEach((element, index) => {
            indices.push(index);
        });
        this.setState({
            APIDetails: nextProps.APIDetails,
            indices: indices
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.saveLayout(this.state.APIDetails);
    }

    handleTileChange(event, index) {
        let value = event.target.value;
        let APIDetails = this.state.APIDetails;
        APIDetails[index].tile = value;

        this.setState({ APIDetails: APIDetails });
    }

    handleIndexChange(event, index) {
        let value = event.target.value;
        let APIDetails = this.state.APIDetails;
        APIDetails[index].index = value;

        this.setState({ APIDetails: APIDetails });
    }

    render() {
        return (
            <div style={{ padding: '7px' }}>
                <form onSubmit={this.handleSubmit}>
                    {
                        this.state.APIDetails.map((element, index) => {
                            return (
                                <div>
                                    <FormGroup controlId="API Detail">
                                        <ControlLabel>{element.title}</ControlLabel>
                                        <FormControl
                                            componentClass="select"
                                            placeholder="Select Tile:"
                                            onChange={(event) => {
                                                this.handleTileChange(event, index);
                                            }}
                                        >
                                            {
                                                element.tile === "1" ?
                                                    <option value="1" selected>One Third</option> :
                                                    <option value="1">One Third</option>
                                            }
                                            {
                                                element.tile === "2" ?
                                                    <option value="2" selected>Half</option> :
                                                    <option value="2">Half</option>
                                            }
                                            {
                                                element.tile === "3" ?
                                                    <option value="3" selected>Full Width</option> :
                                                    <option value="3">Full Width</option>
                                            }
                                        </FormControl>
                                        <FormControl
                                            componentClass="select"
                                            placeholder="Select Index Location:"
                                            onChange={(event) => {
                                                this.handleIndexChange(event, index);
                                            }}
                                        >
                                            {
                                                this.state.indices.map(indexValue => {
                                                    if (element.index === indexValue)
                                                        return (
                                                            <option value={indexValue} selected>{indexValue}</option>
                                                        );
                                                    return (
                                                        <option value={indexValue}>{indexValue}</option>
                                                    );
                                                })
                                            }
                                        </FormControl>
                                    </FormGroup>
                                </div>
                            )
                        })
                    }
                    <Button type="submit">
                        Submit
                    </Button>
                </form>
            </div>
        );
    }
}

export default CustomizeDashboard;