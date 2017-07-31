import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';

class AddService extends Component {
    constructor(props) {
        super(props);

        this.state = {
            APIs: this.props.APIs,
            currentAPI: this.props.APIs[0].value,
            currentChart: '1',
            currentTile: '1'
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAPIChange = this.handleAPIChange.bind(this);
        this.handleChartChange = this.handleChartChange.bind(this);
        this.handleTileChange = this.handleTileChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            APIs: nextProps.APIs,
            currentAPI: nextProps.APIs[0].value
        });

    }

    handleAPIChange(event) {
        this.setState({ currentAPI: event.target.value });
    }

    handleChartChange(event) {
        this.setState({ currentChart: event.target.value });
    }

    handleTileChange(event) {
        this.setState({ currentTile: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        let API = this.state.currentAPI;
        let chart = this.state.currentChart;
        let tile = this.state.currentTile;

        this.props.addService(API, chart, tile);
    }

    render() {
        return (
            <div style={{ padding: '7px' }}>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="formAPISelect">
                        <ControlLabel>Select API:</ControlLabel>
                        <FormControl componentClass="select" placeholder="Select API:" onChange={this.handleAPIChange}>
                            {
                                this.props.APIs.map(element => {
                                    return (
                                        <option value={element.value}>{element.data}</option>
                                    );
                                })
                            }
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="chartTypeSelect">
                        <ControlLabel>Select Type of Chart:</ControlLabel>
                        <FormControl componentClass="select" placeholder="Select Chart:" onChange={this.handleChartChange}>
                            <option value="1">Bar</option>
                            <option value="2">Line</option>
                            <option value="3">Pie</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="tileSizeSelect">
                        <ControlLabel>Select Tile Size:</ControlLabel>
                        <FormControl componentClass="select" placeholder="Select Tile:" onChange={this.handleTileChange}>
                            <option value="1">One Third</option>
                            <option value="2">Half</option>
                            <option value="3">Full Width</option>
                        </FormControl>
                    </FormGroup>
                    <Button type="submit">
                        Submit
                    </Button>
                </form>
            </div>
        );
    }
}

export default AddService;