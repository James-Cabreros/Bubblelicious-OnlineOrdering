import React from "react";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn,
} from "mdb-react-ui-kit";

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <MDBModal show={isOpen} setShow={onClose} tabIndex="-1">
      <MDBModalDialog centered>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Confirm Logout</MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={onClose}></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <p>Are you sure you want to log out?</p>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={onClose}>
              Cancel
            </MDBBtn>
            <MDBBtn color="danger" onClick={onConfirm}>
              Log Out
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};

export default LogoutModal;
