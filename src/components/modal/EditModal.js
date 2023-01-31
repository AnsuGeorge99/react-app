
import React, { useState, useEffect } from "react";
import './Modal.css';
import { RiCloseLine } from "react-icons/ri";
import axios from "axios";

const EditModal = (props) => {
  const [customers, setCustomers] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');

  const SubmitHandler = async (event) => {
    event.preventDefault();
    try {
      useEffect(() => {
        async function fetchCustomersData() {
          const response = await axios.get('http://localhost:5000/customers/getCustomers');
          setCustomers(response.data);
        }
        fetchCustomersData();
      }, [customers]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id) => {
        const customer = customers.find((c) => c.customerId === id);
        console.log("customersdata", customer);
        const updatedCustomer = {
        };
        try {
            await fetch(`http://localhost:5000/Customers/customerPut`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(customer),
            });

            const updatedCustomers = customers.map((c) => {
                if (c.customerId === id) {
                    return updatedCustomer;
                }
                return c;
            });
            setCustomers(updatedCustomers);
        } catch (error) {
            console.error(error);
        }
    };

  return (
    <>
      <div className="darkBG" onClick={() => props.setIsOpen(false)} />
      <div className="centered">
        <div className="editModal">
          <div className="modalHeader">
            <h5 className="heading">Edit Customer Profile</h5>
          </div>
          <button className="closeBtn" onClick={() => props.setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className="modalContent">
              <form onSubmit={SubmitHandler}>
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
              <button className="btn" onClick={() => {handleEdit(props.id); props.setIsOpen(false);}}>
                Edit
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

export default EditModal;