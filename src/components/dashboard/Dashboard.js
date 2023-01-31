import React, { useState, useEffect } from "react";
import axios from "axios";
import EditModal from "../modal/EditModal";
import DeleteModal from "../modal/DeleteModal";
import CreateModal from "../modal/CreateModal";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import '../modal/Modal.css';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

const Dashboard = (props) => {
    const [customers, setCustomers] = useState([]);
    const [editIsOpen, setEditIsOpen] = useState(false);
    const [deleteIsOpen, setDeleteIsOpen] = useState(false);
    const [createIsOpen, setCreateIsOpen] = useState(false);
    
    const { classes } = props;

    useEffect(() => {
        async function fetchCustomersData() {
            const response = await axios.get('http://localhost:5000/customers/getCustomers');
            setCustomers(response.data);
        }
        fetchCustomersData();
    }, [customers]);

    const fetchCustomerById = (event) => {
        setCustomers({
            ...customers, // Copy the old fields
            firstName: event.target.value, // But override this one
            lastname: event.target.value,
            age: event.target.value,
            dob: event.target.value,
            address: event.target.value
        });
    }

    return (
        <div>
            <button  className="btn" onClick={() => setCreateIsOpen(true)}>
                Add Customer
            </button>
            {createIsOpen && <CreateModal setIsOpen={setCreateIsOpen}/>}
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell align="right">Last Name</TableCell>
                            <TableCell align="right">Age</TableCell>
                            <TableCell align="right">Date of Birth</TableCell>
                            <TableCell align="right">House Address</TableCell>
                            <TableCell align="right">Edit</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map((obj) => (
                            <TableRow key={obj.customerId}>
                                <TableCell component="th" scope="row">{obj.firstname}</TableCell>
                                <TableCell align="right">{obj.lastname}</TableCell>
                                <TableCell align="right">{obj.age}</TableCell>
                                <TableCell align="right">{obj.dob}</TableCell>
                                <TableCell align="right">{obj.address}</TableCell>
                                <TableCell align="right">
                                    <i className="fa fa-edit" onClick={() => setEditIsOpen(true)} />
                                    {editIsOpen && <EditModal setIsOpen={setEditIsOpen} customer={fetchCustomerById} />}
                                </TableCell>
                                <TableCell align="right">
                                    <i className="fa fa-trash" onClick={() => setDeleteIsOpen(true)} />
                                    {deleteIsOpen && <DeleteModal setIsOpen={setDeleteIsOpen} id={obj.customerId} />}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>

    );
};

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);



