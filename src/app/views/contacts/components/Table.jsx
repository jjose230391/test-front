import React, {useEffect, useState} from 'react'
import {Box} from '@mui/system'
import {
    Card,
    Icon,
    IconButton,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@mui/material'
import {CardHeader, ProductTable, Title} from "./styled";
import FormContact from "./Form";
import useFetchAPI from "../../../hooks/useFetchAPI";
import Tooltip from "@mui/material/Tooltip";
import Delete from "../../../components/Delete";


const Table = () => {

    const [formData, setFormData] = useState({id: 0, active: false, action: 'add'});
    const [contactList, setContactList] = useState([]);

    const {get} = useFetchAPI();

    useEffect(() => {
        fetchAll()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const fetchAll = () => {
        get('contacts').then((res) => {
            if (res.status === 200) {
                setContactList(res.data.results)
            }
        })
    };

    const handleForm = (id, action = 'edit') => {
        setFormData({active: true, id, action})
    };

    const handleRefresh = (refresh) => {
        setFormData({...formData, active: false});
        if (refresh) {
            fetchAll();
        }
    };

    return (
        <Card elevation={3} sx={{pt: '20px', mb: 3}}>
            <CardHeader>
                <Title>contacts
                    <Tooltip title="Add"><IconButton onClick={()=>handleForm(null, 'add')}>
                        <Icon color="primary">add</Icon>
                    </IconButton>
                    </Tooltip>
                </Title>
            </CardHeader>

            <Box overflow="auto">
                <ProductTable>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{px: 3}} colSpan={4}>
                                First Name
                            </TableCell>
                            <TableCell sx={{px: 0}} colSpan={2}>
                                Last Name
                            </TableCell>
                            <TableCell sx={{px: 0}} colSpan={2}>
                                Phone
                            </TableCell>
                            <TableCell sx={{px: 0}} colSpan={1}>
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contactList.map((contact, index) => (
                            <TableRow key={index} hover>
                                <TableCell
                                    colSpan={4}
                                    align="left"
                                    sx={{px: 0, textTransform: 'capitalize'}}
                                >
                                    {contact.firstName}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    colSpan={2}
                                    sx={{px: 0, textTransform: 'capitalize'}}
                                >
                                    {contact.lastName}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    colSpan={2}
                                    sx={{px: 0, textTransform: 'capitalize'}}
                                >
                                    {contact.phone}
                                </TableCell>
                                <TableCell sx={{px: 0}} colSpan={1}>
                                    <Tooltip title="Edit">
                                        <IconButton onClick={() => handleForm(contact.id)}>
                                            <Icon color="primary">edit</Icon>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton onClick={() => handleForm(contact.id, 'delete')}>
                                            <Icon color="error">delete</Icon>
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </ProductTable>
            </Box>
            <FormContact formData={formData} handleCloseForm={(refresh) => handleRefresh(refresh)}/>
            <Delete domain={'contacts'} formData={formData} handleCloseForm={(refresh) => handleRefresh(refresh)}/>
        </Card>
    )
}

export default Table
