import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators, dispatch } from 'redux';
import RegOpzFlatGrid from '../RegOpzFlatGrid/RegOpzFlatGrid';
import InfoModal from '../InfoModal/InfoModal';
import ModalAlert from '../ModalAlert/ModalAlert';

class ManageUsersComponent extends Component {
  constructor(props) {
    super(props);
    this.isMenuPanelOpen = 0;
    this.dataSource = null;
    this.currentPage = 0;
    this.pages = -1;
    this.flatGrid = null;
    this.selectedIndexOfGrid = 0;
    this.selectedItems = [];
    this.infoModal = null;
    this.modalAlert = null;
  }

  render() {
    return(<div>Not Implemented Yet!</div>);
    // Display Buttons
    // Display DataGrid
    // Add infoModal for Error and Status Update
    // Add modalAlert for confirming user request
  }
}

function mapStateToProps(state) {
  console.log("On map state of Manage Users:", state);
  return {
    userDetails: state.UserReducer
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => {
      dispatch(actionFetchUsers());
    }
  };
};

const VisibleManageUsers = connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageUsersComponent);

export default VisibleManageUsers;
