
import React, { useState, useEffect } from "react";
import './Modal.css';
import { RiCloseLine } from "react-icons/ri";
import axios from "axios";
import client from "../../paths/client";

const CreateModal = (props) => {
  const [customers, setCustomers] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');

//   const SubmitHandler = async (event) => {
//     event.preventDefault();
//     try {
//       useEffect(() => {
//         async function fetchCustomersData() {
//           const response = await axios.get('http://localhost:5000/customers/getCustomers');
//           setCustomers(response.data);
//         }
//         fetchCustomersData();
//       }, [customers]);
//     } catch (error) {
//       console.error(error);
//     }
//   };

  const SubmitHandler = async (event) => {
    
    //event.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/Customers/customerPost', {
            firstName,
            lastName,
            age,
            dob,
            address
        });
    } catch (error) {
        console.error(error);
    }
    setFirstName('');
    setLastName('');
    setAge('');
    setDob('');
    setAddress('');
};

  return (
    <>
      <div className="darkBG" onClick={() => props.setIsOpen(false)} />
      <div className="centered">
        <div className="editModal">
          <div className="modalHeader">
            <h5 className="heading">Create New Customer Profile</h5>
          </div>
          <button className="closeBtn" onClick={() => props.setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className="modalContent">
              <form>
                <label htmlFor="firstName">First Name</label>
                <input className='label' type="text" value={firstName} id='firstName' onChange={ (e) => setFirstName(e.target.value)} />

                <label htmlFor="lastName">Last Name</label>
                <input className='label' type="text" value={lastName} id='lastName' onChange={ (e) => setLastName(e.target.value)} />

                <label htmlFor="age">Age</label>
                <input className='label' type="text" value={age} id='age' onChange={(e) => setAge(e.target.value)}/>

                <label htmlFor="dob">Date of Birth</label>
                <input className='label' type="text" value={dob} id='dob' onChange={ (e) => setDob(e.target.value)}/>

                <label htmlFor="address">Address</label>
                <input className='label' type="text" value={address} id='address' onChange={ (e) => setAddress(e.target.value)} />
              </form>
          </div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button type="submit" className="btn" onClick={() => {SubmitHandler(); props.setIsOpen(false);}}>
                Create
              </button>
              <button
                className="cancelBtn"
                onClick={() => props.setIsOpen(false)}
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

export default CreateModal;