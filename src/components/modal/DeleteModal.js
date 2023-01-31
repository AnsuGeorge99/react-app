import React from "react";
import './Modal.css';
import { RiCloseLine } from "react-icons/ri";
import axios from "axios";
import { format } from 'react-string-format';

const DeleteModal = (props) => {
    const handleDelete = async (id) => {
        try {
            await axios.delete(format('http://localhost:5000/Customers/deleteCustomers/{0}', id));
        } catch (error) {
            console.error(error);
        }
    };

  return (
    <>
      <div className="darkBG" onClick={() => {props.setIsOpen(false)}} />
      <div className="centered">
        <div className="deleteModal">
          <div className="modalHeader">
            <h5 className="heading">Delete Confirmation</h5>
          </div>
          <button className="closeBtn" onClick={() => props.setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className="modalContent">
            Are you sure you want to delete the customer?
          </div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button className="btn" onClick={() => {handleDelete(props.id); props.setIsOpen(false);}}>
                Delete
              </button>
              <button
                className="cancelBtn"
                onClick={() => {props.setIsOpen(false)}}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;