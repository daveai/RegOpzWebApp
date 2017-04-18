import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal, Button} from 'react-bootstrap';
export default class ModalAlert extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
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
              }}>Ok</Button>
          </Modal.Footer>

        </Modal>

    );
  }
}
