import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import custom from '../../../js/custom';
class LeftMenu extends Component {
    render() {
        return (
            <div className="col-md-3 left_col">
                <div className="left_col scroll-view">
                    <div className="navbar nav_title">
                        <a href="#/dashboard" className="site_title">
                            <i className="fa fa-paw"></i>
                            <span> RegOpz Dash!</span>
                        </a>
                    </div>
                    <div className="clearfix"></div>
                    <div className="profile clearfix">
                        <div className="profile_pic">
                            <img src="images/img.jpg" alt="..." className="img-circle profile_img"/>
                        </div>
                        <div className="profile_info">
                            <span>Welcome,</span>
                            <h2>John Doe</h2>
                        </div>
                    </div>
                    <br/>
                    <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
                        <div className="menu_section">
                            <h3>General</h3>
                            <ul className="nav side-menu">
                                <li>
                                    <a>
                                        <i className="fa fa-home"></i> Meta Data<span className="fa fa-chevron-down"></span>
                                    </a>
                                    <ul className="nav child_menu">
                                        <li>
                                            <a href="#/dashboard/capture-report-template">Capture Report Template1</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount(){      
      var customScript = new custom();
      customScript.runScript();

    }
}
export default LeftMenu;
