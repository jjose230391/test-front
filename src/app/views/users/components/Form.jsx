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
        username: '',
        password: ''
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
                        username: res.data.results.username
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
            post('users', data).then((res) => {
                if (res.status === 200) {
                    dispatch(setSnack({open: true, message: 'User add successfully', type: 'success'}));
                    handleClose(true);
                }
            })
        } else {
            put('users', data, formData.id).then((res) => {
                if (res.status === 200) {
                    dispatch(setSnack({open: true, message: 'User edited successfully', type: 'success'}));
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
            <DialogTitle id="form-dialog-title">User</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <DialogContentText>
                       Username
                    </DialogContentText>
                    <TextField
                        autoFocus
                        value={data?.username}
                        onChange={handleInputChange}
                        margin="dense"
                        id="username"
                        name="username"
                        label="Username"
                        type="text"
                        fullWidth
                    />
                    <DialogContentText>
                        Password
                    </DialogContentText>
                    <TextField
                        autoFocus
                        value={data?.password}
                        onChange={handleInputChange}
                        margin="dense"
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
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