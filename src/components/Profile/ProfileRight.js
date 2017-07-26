import React, { Component } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import AddService from './AddService';
import CustomizeDashboard from './CustomizeDashboard';

class ProfileRightPane extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-md-9 col-sm-9 col-xs-12">
                <div>
                    <Tabs defaultActiveKey={1}>
                        <Tab eventKey={1} title="Customize Dashboard">
                            <CustomizeDashboard
                                APIDetails={[
                                    {
                                        title: 'Hello World API',
                                        tile: '1',
                                        index: 2
                                    },
                                    {
                                        title: 'Music API',
                                        tile: '2',
                                        index: 0
                                    },
                                    {
                                        title: 'Chuck Norris API',
                                        tile: '3',
                                        index: 1
                                    }
                                ]}
                                saveLayout={(APIDetails) => {
                                    console.log(APIDetails);
                                }}
                            />
                        </Tab>
                        <Tab eventKey={2} title="Add Service">
                            <AddService
                                APIs={[
                                    {
                                        value: '1',
                                        data: 'Some Data Here'
                                    },
                                    {
                                        value: '2',
                                        data: 'Some More Data'
                                    }
                                ]}
                                addService={(API, chart, tile) => {
                                    console.log(API);
                                    console.log(chart);
                                    console.log(tile);
                                }}
                            />
                        </Tab>
                        <Tab eventKey={3} title="Something Else">
                            Lorem Ipsum
                        </Tab>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default ProfileRightPane;