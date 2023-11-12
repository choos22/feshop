// const ModalDelete = (props) => {
//   <>
//     <Modal.Dialog show={props.show}>
//       <Modal.Header closeButton>
//         <Modal.Title>Modal title</Modal.Title>
//       </Modal.Header>

//       <Modal.Body>
//         <p>Modal body text goes here.</p>
//       </Modal.Body>

//       <Modal.Footer>
//         <Button variant="secondary">Close</Button>
//         <Button variant="primary">Save changes</Button>
//       </Modal.Footer>
//     </Modal.Dialog>
//   </>;
// };

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';

function ModalDelete(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Xóa người dùng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Bạn chắc là xóa {props.dataModal.email} chưa douma?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={props.comfirmDeleteUser}>
          Yes sir!!!!!!!!!!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDelete;

// export default ModalDelete;
