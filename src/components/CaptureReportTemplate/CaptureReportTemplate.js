import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { hashHistory } from 'react-router';
import { routerContext } from 'react-router';
import npro from '../../../bower_components/nprogress/nprogress';
require('../../../bower_components/nprogress/nprogress.css');
export default class RightPane extends Component {
  constructor(props){
    super(props);
    this.fileInput = null;
    this.uploadForm = null;
    this.state = {
      report_id:""
    };
  }
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
            <form encType="multipart/form-data" id="uploadForm" ref={(uploadForm) => {this.uploadForm = uploadForm}} onSubmit={this.handleFormSubmit.bind(this)} className="dropzone">
              <input
                type="text"
                name="report_id"
                onChange={
                  (event) => {
                    this.setState( {
                      report_id:event.target.value
                    });
                  }
                }
                className="form-control"
                placeholder="Report Id"
                value={this.state.report_id}
                 />
              <input id="file"
                onChange={this.handleFileSelect.bind(this)}
                ref={(fileInput) => {this.fileInput = fileInput}}
                type="file"
                className="form-control" />
              <div className="fileUploadIconHolder">
                <i className="fa fa-file-excel-o" aria-hidden="true" onClick={this.handleFileInputClick.bind(this)}></i>
                <div className="clearfix"></div>
                <div className="dz-default dz-message"><span>No File Selected</span></div>
              </div>
            </form>
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
  handleFileInputClick(event){
    this.fileInput.value = null;
    this.fileInput.click();
  }
  handleFormSubmit(event){
    event.preventDefault();
  }
  handleFileSelect(event){
    var report_id = this.state.report_id;
    npro.start();
    var data = new FormData($("#uploadForm")[0]);
    $.each($('#file')[0].files, function(i, file) {
        data.append('file', file);
    });
    $.ajax({
      type: 'POST',
      crossDomain: true,
      async: true,
      cache: false,
      contentType: false,
      processData: false,
      data:data,
      url: 'http://localhost:3000/api/v1.0.0/document',
      success: function(response) {
        npro.done();
        hashHistory.push("/dashboard/data-grid?report_id="+report_id);
        console.log(response);

      },
      error:function(response){
        npro.done();
        alert(response.responseJSON.msg);
      }
    });
  }
}
