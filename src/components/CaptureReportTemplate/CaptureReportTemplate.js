import React, {Component} from 'react';
import ReactDOM from 'react-dom';
export default class RightPane extends Component {
  render(){
    return(
      <div className="row">
        <div className="col-md-12 col-sm-12 col-xs-12">
          <div className="x_panel">
            <div className="x_title">
              <h2>Drop report template file</h2>
              <div className="clearfix"></div>
            </div>
            <div className="x_content">
              <p>Supported files are .xlsx .xlx, .csv, .odt</p>
            <form action="form_upload.html" className="dropzone"></form>
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    )
  }
  componentDidMount(){
    document.title = "RegOpz Dashboard | Capture Report Template ";
  }
}
