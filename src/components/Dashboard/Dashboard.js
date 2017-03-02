import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import LeftMenu from './LeftMenu'
import TopNav from './TopNav';
import RightPane from './RightPane';
import {
    Router,
    Route,
    Link,
    IndexRoute,
    hashHistory,
    browserHistory
} from 'react-router';
class Dashboard extends Component {
    render() {
      return(
          <div className="container body">
            <div className="main_container">
                <LeftMenu />
                <TopNav />
                <div className="right_col" role="main">
                  <RightPane />
                {this.props.children}
                </div>
            </div>
          </div>
      );

    }
    componentDidMount() {
        document.body.classList.remove('login');
        document.body.classList.add('nav-md');
        document.title = "RegOpz Dashboard";
    }

}
export default Dashboard;
