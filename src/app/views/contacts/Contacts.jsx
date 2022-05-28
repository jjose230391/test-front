import React, { Fragment } from 'react'
import { Grid } from '@mui/material'
import { styled } from '@mui/system'
import Table from './components/Table'

const ContentBox = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))

const Contacts = () => {

    return (
        <Fragment>
            <ContentBox className="analytics">
                <Grid container spacing={3}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Table />
                    </Grid>
                </Grid>
            </ContentBox>
        </Fragment>
    )
}

export default Contacts
