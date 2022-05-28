import React from 'react'
import { Redirect } from 'react-router-dom'
import contactsRoutes from './views/contacts/ContactsRoutes'

const redirectRoute = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/contacts/default" />,
    },
]

const errorRoute = [
    {
        component: () => <Redirect to="/session/404" />,
    },
]

const routes = [
    ...contactsRoutes,
    ...redirectRoute,
    ...errorRoute,
]

export default routes
