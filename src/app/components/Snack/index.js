import React,{useState, useEffect} from "react";
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import MuiAlert from '@mui/material/Alert';
import { useSelector } from 'react-redux'
// import {setSnack} from "../../redux/actions/AppAction";

const Snack = () => {

    //const dispatch = useDispatch();
    const { snack } = useSelector((state) => state.appReducer);
    const [open, setOpen] = useState(false);

    useEffect(()=>{
        if(snack){
            setOpen(snack.open);
            // setTimeout(()=>{
            //     setOpen(false);
            //     dispatch(setSnack({open: false}));
            // },3000)
        }
    },[snack])

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Snackbar
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            TransitionComponent={Fade}
            onClose={handleClose}
            message={snack?.message}
            key={'top'}
        ><Alert onClose={handleClose} severity={snack?.type} sx={{ width: '100%' }}>
            {snack?.message}
        </Alert>
        </Snackbar>
    )
}

export default Snack;
