import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const Contacts = Loadable(lazy(() => import("./Contacts")));

const contactsRoutes = [
    {
        path: '/contacts/default',
        element: <Contacts />,
    },
]

export default contactsRoutes
