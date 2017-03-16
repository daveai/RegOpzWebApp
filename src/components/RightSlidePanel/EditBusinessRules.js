import React, {Component} from 'react';
import ReactDOM from 'react-dom';
export default class EditBusinessRules extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-12 col-xs-12">
                    <div className="x_title">
                        <h2 className="slidePanelHeading">Rule Maintainance</h2>
                        <div className="clearfix"></div>
                    </div>
                    <div className="col-md-8 col-xs-8">
                        <div className="form-group">
                            <input placeholder="NO BANK" type="text" className="form-control "/>
                        </div>
                    </div>
                    <div className="col-md-8 col-xs-8">
                        <div className="form-group">
                            <select className="form-control">
                                <option>Select Column</option>
                                <option>Option one</option>
                                <option>Option two</option>
                                <option>Option three</option>
                                <option>Option four</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-4 col-xs-4">
                        <button className="btn btn-secondary" type="button">Add</button>
                    </div>
                    <div className="col-md-12 col-xs-12">
                        <div className="form-group">
                            <textarea className="form-control" rows="3" placeholder="bank, "></textarea>
                        </div>
                        <div className="form-group">
                            <textarea className="form-control" rows="3" placeholder="bank==NON-Bank"></textarea>
                        </div>
                    </div>
                    <div style={{textAlign:"center"}} className="col-md-6 col-xs-6">
                        <button className="btn btn-success" type="button">Save</button>
                    </div>
                    <div style={{textAlign:"center"}} className="col-md-6 col-xs-6">
                        <button className="btn btn-danger" type="button">Cancel</button>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>
        )
    }
}
