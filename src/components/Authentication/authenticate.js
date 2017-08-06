import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { componentMaptoName } from '../../utils/componentMap';
import getDisplayName from 'recompose/getDisplayName';
import _ from 'lodash';

export default function authenticate(ComposedComponent) {
    class Authentication extends Component {
        constructor(props) {
            super(props);
        }

        render() {
            let name = componentMaptoName[getDisplayName(ComposedComponent).replace("Connect(",'').replace(")",'')];
            //console.log("Render function called, Authentication.....", this.props.login_details);
            if (name == "DrillDown") {
                let type = this.props.location.query['type'];
                if (typeof type !== undefined || type !== null) {
                    switch (type) {
                        case 'rules':
                            name = "Maintain Report Rules";
                            break;
                        case 'report':
                            name = "View Report"
                            break;
                        default:
                            return (
                                <div>
                                    <h2>
                                        Invalid DrillDown Requested. Please contact the administrator.
                                    </h2>
                                </div>
                            );
                    }
                }
            }
            console.log("Render function,Authentication.....", name);
            const component = _.find(this.props.login_details.permission, { component: name });
            if(! component) {
                return (
                    <div>
                        <h2>
                            You do not have privilege to perform this functionality. Please contact the administrator.
                        </h2>
                    </div>
                );
            }
            console.log("Render function called, Authentication.....", component);
            const newProps = { user: this.props.login_details.user, privileges: component.permissions };

            return (<ComposedComponent {...this.props} {...newProps}/>);
        }
    }

    function mapStatetoProps(state) {
        console.log("Inside mapStatetoProps, authenticate.....", state);
        return {
            login_details: state.login_store
        };
    }

    return connect(mapStatetoProps)(Authentication);
}
