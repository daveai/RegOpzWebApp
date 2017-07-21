// This Component is not being used yet
// This Component will render a single role on te screen
// Can be used by AddRoles (for single entry) as well as ManageRoles (for multiple entry)

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class ViewRole extends Component {
  constructor(props) {
    super(props);
    this.dataSource = this.props.data;
  }

  render() {
      ((item, index) => {
          console.log(index, item);
            <div key={index} className="col-md-4 col-sm-4 col-xs-12">
              <div className="x_panel_overflow x_panel tile fixed_height_320">
                <div className="x_title">
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
                          console.log("component", comp);
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
                                        <div>
                                          <input
                                            key={index}
                                            type="checkbox"
                                            defaultChecked={defaultChecked}
                                            disabled={this.state.checked}/>
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
            </div>
            );
          })
        return(role_list);
    })(this.dataSource)
  }
}
