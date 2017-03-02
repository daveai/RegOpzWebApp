import React, {Component} from 'react';
import ReactDOM from 'react-dom';
export default class DashboardIndex extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-4 col-sm-4 col-xs-12">
                    <div className="x_panel">
                        <div className="x_title">
                            <h2>Meta Data
                                <small>History</small>
                            </h2>
                            <div className="clearfix"></div>
                        </div>
                        <div className="x_content">
                            <div className="dashboard-widget-content">
                                <ul className="list-unstyled timeline widget">
                                    <li>
                                        <div className="block">
                                            <div className="block_content">
                                                <h2 className="title">
                                                    <a>Who Needs Sundance When You’ve Got&nbsp;Crowdfunding?</a>
                                                </h2>
                                                <div className="byline">
                                                    <span>13 hours ago</span>
                                                    by
                                                    <a>Jane Smith</a>
                                                </div>
                                                <p className="excerpt">Film festivals used to be do-or-die moments for movie makers. They were where you met the producers that could fund your project, and if the buyers liked your flick, they’d pay to Fast-forward and…
                                                    <a>Read&nbsp;More</a>
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="block">
                                            <div className="block_content">
                                                <h2 className="title">
                                                    <a>Who Needs Sundance When You’ve Got&nbsp;Crowdfunding?</a>
                                                </h2>
                                                <div className="byline">
                                                    <span>13 hours ago</span>
                                                    by
                                                    <a>Jane Smith</a>
                                                </div>
                                                <p className="excerpt">Film festivals used to be do-or-die moments for movie makers. They were where you met the producers that could fund your project, and if the buyers liked your flick, they’d pay to Fast-forward and…
                                                    <a>Read&nbsp;More</a>
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="block">
                                            <div className="block_content">
                                                <h2 className="title">
                                                    <a>Who Needs Sundance When You’ve Got&nbsp;Crowdfunding?</a>
                                                </h2>
                                                <div className="byline">
                                                    <span>13 hours ago</span>
                                                    by
                                                    <a>Jane Smith</a>
                                                </div>
                                                <p className="excerpt">Film festivals used to be do-or-die moments for movie makers. They were where you met the producers that could fund your project, and if the buyers liked your flick, they’d pay to Fast-forward and…
                                                    <a>Read&nbsp;More</a>
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="block">
                                            <div className="block_content">
                                                <h2 className="title">
                                                    <a>Who Needs Sundance When You’ve Got&nbsp;Crowdfunding?</a>
                                                </h2>
                                                <div className="byline">
                                                    <span>13 hours ago</span>
                                                    by
                                                    <a>Jane Smith</a>
                                                </div>
                                                <p className="excerpt">Film festivals used to be do-or-die moments for movie makers. They were where you met the producers that could fund your project, and if the buyers liked your flick, they’d pay to Fast-forward and…
                                                    <a>Read&nbsp;More</a>
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
        )
    }
    componentDidMount() {
        document.title = "RegOpz Dashboard | Capture Report Template ";
    }
}
