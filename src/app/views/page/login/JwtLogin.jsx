import {
    Card,
    Grid,
    Button
} from '@mui/material'
import React, { useState } from 'react'
import useAuth from 'app/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { Box, useTheme } from '@mui/system'
import { TextValidator } from 'react-material-ui-form-validator'
import { Paragraph, Span, H2 } from 'app/components/Typography'
import {ContentBox, FlexBox, JWTRoot, StyledProgress, ValidatorFormStyle} from "./styled";
import {useInputChange} from "../../../hooks/useInputChange";



const JwtLogin = () => {
    const navigate = useNavigate()
    const { login } = useAuth();
    const [inputs, handleInputChange] = useInputChange();
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const { palette } = useTheme()
    const textError = palette.error.main

    const handleFormSubmit = async() => {
        setLoading(true)
        try {
            await login(inputs.username, inputs.password).then(()=>{
                navigate('/')
            })
        } catch (e) {
            console.log(e)
            setMessage(e.message)
            setLoading(false)
        }
    }

    return (
        <JWTRoot>
            <Card className="card">
                <Grid container>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <ContentBox>
                                <H2>Login</H2>
                            <ValidatorFormStyle onSubmit={handleFormSubmit}>
                                <TextValidator
                                    sx={{ mb: 3, width: '100%' }}
                                    variant="outlined"
                                    size="small"
                                    label="Username"
                                    onChange={handleInputChange}
                                    type="text"
                                    name="username"
                                    value={inputs.username}
                                    errorMessages={[
                                        'this field is required'
                                    ]}
                                />
                                <TextValidator
                                    sx={{ mb: '12px', width: '100%' }}
                                    label="Password"
                                    variant="outlined"
                                    size="small"
                                    onChange={handleInputChange}
                                    name="password"
                                    type="password"
                                    value={inputs.password}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />

                                {message && (
                                    <Paragraph sx={{ color: textError }}>
                                        {message}
                                    </Paragraph>
                                )}

                                <FlexBox mb={2} flexWrap="wrap">
                                    <Box position="relative">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={loading}
                                            type="submit"
                                        >
                                            Sign in
                                        </Button>
                                        {loading && (
                                            <StyledProgress
                                                size={24}
                                                className="buttonProgress"
                                            />
                                        )}
                                    </Box>
                                    <Span sx={{ mr: 1, ml: '20px' }}>or</Span>
                                    <Button
                                        sx={{ textTransform: 'capitalize' }}
                                        onClick={() =>
                                            navigate('/session/signup')
                                        }
                                    >
                                        Sign up
                                    </Button>
                                </FlexBox>
                            </ValidatorFormStyle>
                        </ContentBox>
                    </Grid>
                </Grid>
            </Card>
        </JWTRoot>
    )
}

export default JwtLogin
