import {Box, styled} from "@mui/system";
import {CircularProgress} from "@mui/material";
import { ValidatorForm } from 'react-material-ui-form-validator'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'center',
}))

const ContentBox = styled(Box)(() => ({
    height: '100%',
    padding: '32px',
    position: 'relative',
    background: 'rgba(0, 0, 0, 0.01)',
}))

const JWTRoot = styled(JustifyBox)(() => ({
    background: '#1A2038',
    minHeight: '100vh !important',
    '& .card': {
        maxWidth: 800,
        borderRadius: 12,
        margin: '1rem',
    },
}))

const StyledProgress = styled(CircularProgress)(() => ({
    position: 'absolute',
    top: '6px',
    left: '25px',
}))

const ValidatorFormStyle = styled(ValidatorForm)(() => ({
    marginTop: '15px'
}))

export {StyledProgress, JWTRoot, ContentBox, JustifyBox, FlexBox, ValidatorFormStyle}