import React, {useState, useEffect} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import useFetchAPI from "../../../hooks/useFetchAPI";
import {useInputChange} from "../../../hooks/useInputChange";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch } from 'react-redux'
import {setSnack} from "../../../redux/actions/AppAction";

const FormContact = (props) => {
    let {formData, handleCloseForm} = props;

    const {getById, put, post} = useFetchAPI();
    const [inputs, handleInputChange] = useInputChange();
    const dispatch = useDispatch();

    let initialData = {
        firstName: '',
        lastName: '',
        phone: 0,
    }

    const [open, setOpen] = useState(false);
    const [data, setData] = useState(initialData)

    useEffect(() => {
        if (formData && formData.action === 'edit') {
            setOpen(formData.active);
            fetchContact(formData.id)
        }
        if (formData && formData.action === 'add') {
            setOpen(formData.active);
            setData(initialData)
        }
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [formData]);

    useEffect(() => {
        setData(inputs)
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [inputs]);

    const fetchContact = (id) => {
        getById('contacts', id).then((res) => {
            if (res.status === 200) {
                setData(
                    {
                        firstName: res.data.results.firstName,
                        lastName: res.data.results.lastName,
                        phone: res.data.results.phone,
                    })
            }
        })
    };

    const handleClose = (close = false) => {
        setOpen(!open);
        handleCloseForm(close);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.action === 'add') {
            post('contacts', data).then((res) => {
                if (res.status === 200) {
                    dispatch(setSnack({open: true, message: 'Contact add successfully', type: 'success'}));
                    handleClose(true);
                }
            })
        } else {
            put('contacts', data, formData.id).then((res) => {
                if (res.status === 200) {
                    dispatch(setSnack({open: true, message: 'Contact edited successfully', type: 'success'}));
                    handleClose(true);
                }
            })
        }
    };

    return (
        <Dialog
            open={open}
            onClose={() => handleClose(false)}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Contact</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <DialogContentText>
                       First Name
                    </DialogContentText>
                    <TextField
                        autoFocus
                        value={data?.firstName}
                        onChange={handleInputChange}
                        margin="dense"
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        type="text"
                        fullWidth
                    />
                    <DialogContentText>
                        Last Name
                    </DialogContentText>
                    <TextField
                        autoFocus
                        value={data?.lastName}
                        onChange={handleInputChange}
                        margin="dense"
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        type="text"
                        fullWidth
                    />
                    <DialogContentText>
                        Phone
                    </DialogContentText>
                    <TextField
                        autoFocus
                        value={data?.phone}
                        onChange={handleInputChange}
                        margin="dense"
                        id="phone"
                        name="phone"
                        label="Phone"
                        type="number"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleClose(false)}>
                        Cancel
                    </Button>
                    <LoadingButton loading={false} variant="contained" type="submit">
                        Submit
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>

    )
}
export default FormContact;