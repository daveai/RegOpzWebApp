/*
 * ViewRole: Common component to display role informations
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { Label } from 'react-bootstrap';

export default class ViewRole extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      const { item } = this.props;
      if (typeof item !== 'undefined' && item != null) {
          return(
              <div className="x_panel_overflow x_panel tile fixed_height_320">
                <div className="x_title role_label">
                    <h2>{ item.role }
                      <small>Role Details</small>
                    </h2>
                  <ul className="nav navbar-right panel_toolbox">
                    <li>
                      <Link key={item.id} to={`/dashboard/manage-roles/add-roles?role=${item.role}`}>
                        <i className="fa fa-wrench" rel="tooltip" title="Edit Role"></i>
                      </Link>
                    </li>
                  </ul>
                  <div className="clearfix"></div>
                </div>
                <div className="x_content">
                  <div className="dashboard-widget-content">
                    <ul className="to_do">
                      {
                        item.components.map((comp, index) => {
                          return(
                            <li key={index}>
                              <h4><i className="fa fa-support"></i> <Label bsStyle="primary">{comp.component}</Label></h4>
                                {
                                  comp.permissions.map((perm, index) => {
                                    let defaultChecked = null;
                                    let permDisabled = null;
                                    if (perm.permission_id) {
                                      defaultChecked = "checked";
                                      permDisabled ="checked"
                                    }
                                    return(
                                        <div key={index}>
                                          <input
                                            type="checkbox"
                                            defaultChecked={defaultChecked}
                                            disabled={true}/>
                                        <span className="perm_label">
                                          { perm.permission }
                                        </span>
                                      </div>
                                    );
                                  })
                                }
                            </li>
                          );
                        })
                      }
                    </ul>
                  </div>
                </div>
              </div>
          );
      }
  }
}
