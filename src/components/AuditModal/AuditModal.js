import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal,Button} from 'react-bootstrap';

export default class AuditModal extends Component{
  constructor(props){
    super(props);
    this.state={
      showModal:this.props.showModal,
      form:{comment:null}
    };
  }

  componentWillReceiveProps(nextProps){
      this.setState({showModal:nextProps.showModal});
      //console.log('componentWillReceiveProps.....',this.state.showModal,nextProps.showModal);
  }

  render(){
    //console.log(this.state.showModal,this.props.showModal);
    return(
      <Modal show={this.state.showModal}>
        <Modal.Header>
          <Modal.Title>Please provide a comment </Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <form className="form-horizontal form-label-left"
            >
            <div className="form-group">
              <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="comment">Comment <span className="required">*</span></label>
              <div className="col-md-6 col-sm-6 col-xs-12">
                <textarea
                  value={this.state.form.comment}
                  placeholder="Comment"
                  type="text"
                  className="form-control col-md-7 col-xs-12"
                  maxLength="1000"
                  minLength="20"
                  onChange={(event)=>{
                    let form=this.state.form;
                    form.comment=event.target.value;
                    this.setState({form});

                    }
                  }
                />
              </div>
            </div>

          </form>


        </Modal.Body>

        <Modal.Footer>
        <Button onClick={(event) => {
            this.close();
            if(typeof(this.props.onClickOkay) != 'undefined')
              this.props.onClickOkay(this.state.form);
          }}>Ok</Button>
        </Modal.Footer>
      </Modal>
    );
  }

open(){
  this.setState({showModal:true});

}

close(){
  this.setState({showModal:false});
}
}
