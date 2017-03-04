import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import RightPane from './RightPane';
export default class DashboardIndex extends Component {
    render() {
        return (
            <div>
                <RightPane/>
                <div className="row">
                    <div className="col-md-4 col-sm-4 col-xs-12">
                        <div className="x_panel">
                            <div className="x_title">
                                <h2>Meta Data
                                    <small>History</small>
                                </h2>
                                <ul className="nav navbar-right panel_toolbox">
                                    <li>
                                        <a data-toggle="tooltip" data-placement="top" title="" data-original-title="Upload new">
                                            <i className="fa fa-plus"></i>
                                        </a>
                                    </li>

                                </ul>
                                <div className="clearfix"></div>
                            </div>
                            <div className="x_content">
                                <div className="dashboard-widget-content">
                                    <ul className="list-unstyled timeline widget">
                                        <li>
                                            <div className="block">
                                                <div className="block_content">
                                                    <h2 className="title">
                                                        <a>MAS0003</a>
                                                    </h2>
                                                    <div className="byline">
                                                        <span>13 hours ago</span>
                                                        Uploaded by
                                                        <a>
                                                            Dave</a>
                                                    </div>
                                                    <p className="excerpt">
                                                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="block">
                                                <div className="block_content">
                                                    <h2 className="title">
                                                        <a>MAS0004</a>
                                                    </h2>
                                                    <div className="byline">
                                                        <span>13 hours ago</span>
                                                        Uploaded by
                                                        <a>
                                                            Dave</a>
                                                    </div>
                                                    <p className="excerpt">
                                                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-12">
                        <div className="x_panel tile fixed_height_320 x_panel_blank overflow_hidden">
                            <div className="x_content x_content_plush">
                                <i className="fa fa-plus"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount() {
        document.title = "RegOpz Dashboard | Capture Report Template ";
    }
}
