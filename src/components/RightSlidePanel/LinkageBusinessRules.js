import React, {Component} from 'react';
import ReactDOM from 'react-dom';
export default class LinkageBusinessRules extends Component {
    constructor(props){
        super(props);
    }
    render() {
        console.log("Selected data on linkage: ",this.props.data);
        return (
            <div className="row">
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="x_panel">
                        <div className="x_title">
                            <h2>Report Linked to rule
                                <small>{this.props.data.business_rule}</small>
                            </h2>
                            <div className="clearfix"></div>
                        </div>
                        <div className="x_content">


                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
