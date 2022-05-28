import useAuth from 'app/hooks/useAuth'
import React, { useState } from 'react'
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import {H2, Span} from 'app/components/Typography'
import { Card, Grid, Button } from '@mui/material'
import { TextValidator } from 'react-material-ui-form-validator'
import {JWTRegister, ValidatorFormStyle} from "./styled";
import {FlexBox} from "../login/styled";
import {setSnack} from "../../../redux/actions/AppAction";
import {useDispatch} from "react-redux";

const JwtRegister = () => {
    const navigate = useNavigate()
    const [state, setState] = useState({})
    const { register } = useAuth()
    const dispatch = useDispatch();

    const handleChange = ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        })
    }

    const handleFormSubmit = () => {
        try {
            register(state.username, state.password).then((res)=>{
                debugger
                if(res.status === 200){
                    dispatch(setSnack({open: true, message: 'User registered successfully', type: 'success'}));
                    navigate('/session/signin')
                }else{
                    dispatch(setSnack({open: true, message: 'Fail, user incorrect, please register', type: 'error'}));
                    navigate('/session/signup')
                }
            })

        } catch (e) {
            dispatch(setSnack({open: true, message: `Fail,+${e}`, type: 'error'}));
            console.log(e)
        }
    }

    let { username, password } = state

    return (
        <JWTRegister>
            <Card className="card">
                <Grid container>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Box p={4} height="100%">
                            <H2>Register</H2>
                            <ValidatorFormStyle onSubmit={handleFormSubmit}>
                                <TextValidator
                                    sx={{ mb: 3, width: '100%' }}
                                    variant="outlined"
                                    size="small"
                                    label="Username"
                                    onChange={handleChange}
                                    type="text"
                                    name="username"
                                    value={username || ''}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                                <TextValidator
                                    sx={{ mb: '16px', width: '100%' }}
                                    label="Password"
                                    variant="outlined"
                                    size="small"
                                    onChange={handleChange}
                                    name="password"
                                    type="password"
                                    value={password || ''}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                                <FlexBox>
                                    <Button
                                        type="submit"
                                        color="primary"
                                        variant="contained"
                                        sx={{ textTransform: 'capitalize' }}
                                    >
                                        Sign up
                                    </Button>
                                    <Span sx={{ mr: 1, ml: '20px' }}>or</Span>
                                    <Button
                                        sx={{ textTransform: 'capitalize' }}
                                        onClick={() => navigate("/session/signin")}
                                    >
                                        Sign in
                                    </Button>
                                </FlexBox>
                            </ValidatorFormStyle>
                        </Box>
                    </Grid>
                </Grid>
            </Card>
        </JWTRegister>
    )
}

export default JwtRegister
