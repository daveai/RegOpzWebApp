import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal, Button} from 'react-bootstrap';
export default class InfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.isDiscardToBeShown = this.props.showDiscard;
    this.title = this.props.title;
  }
  componentWillReceiveProps(){
    this.isDiscardToBeShown = this.props.showDiscard;
    this.body = this.props.body;
    this.title = this.props.title;
  }
  close() {
    this.setState({ showModal: false });
  }

  open(msg) {
    this.setState({ showModal: true });
  }
  render(){
    return (

        <Modal show={this.state.showModal}>
          <Modal.Header>
            <Modal.Title>{this.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {this.props.children}
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
