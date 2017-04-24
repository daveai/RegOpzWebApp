import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal, Button} from 'react-bootstrap';
export default class ModalAlert extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.isDiscardToBeShown = this.props.showDiscard;
  }

  close() {
    this.setState({ showModal: false });
  }

  open(msg) {
    this.msg = msg;
    this.setState({ showModal: true });
  }
  render(){
    return (

        <Modal show={this.state.showModal}>
          <Modal.Header>
            <Modal.Title>Attention!</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {this.msg}
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={(event) => {
                this.close();
                if(typeof(this.props.onClickOkay) != 'undefined')
                  this.props.onClickOkay();
              }}>Ok</Button>
            {
              (() => {
                if(this.isDiscardToBeShown){
                  return(
                    <Button onClick={(event) => {
                        this.close();
                        if(typeof(this.props.onClickDiscard) != 'undefined')
                          this.props.onClickDiscard();
                    }}>Discard</Button>
                  )
                }
              })()
            }

          </Modal.Footer>

        </Modal>

    );
  }
}
