import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import DialogActions from "@mui/material/DialogActions";
import useFetchAPI from "../../hooks/useFetchAPI";
import {setSnack} from "../../redux/actions/AppAction";
import { useDispatch } from 'react-redux'

const Delete = (props) => {

    let {formData, handleCloseForm, domain} = props;

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const {del} = useFetchAPI();

    useEffect(() => {
        if (formData && formData.action === 'delete') {
            setOpen(formData.active);
        }
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [formData]);

    const handleSubmit = () => {
        del(domain, formData.id).then((res) => {
            if (res.status === 200) {
                dispatch(setSnack({open: true, message: 'Contact deleted successfully', type: 'success'}));
                handleClose(true)
            }
        })
    };

    const handleClose = (close = false) => {
        setOpen(!open);
        handleCloseForm(close);
    };


    return (
        <Dialog
            open={open}
            onClose={() => handleClose(false)}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Delete this item?</DialogTitle>
            <DialogActions>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleClose()}>
                    Cancel
                </Button>
                <LoadingButton loading={false} variant="contained" onClick={() => handleSubmit()}>
                    Delete
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}
// const mapStateToProps = state => ({
//     state: state.appReducer.state
// });
// const mapDispatchToProps = dispatch => ({
//     setSnack: value => dispatch(setSnack(value))
// });

export default Delete;
