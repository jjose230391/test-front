import AuthGuard from 'app/auth/AuthGuard'
import Index from 'app/views/page/notFound'
import contactsRoutes from 'app/views/contacts/ContactsRoutes'
import usersRoutes from 'app/views/users/UsersRoutes'
import sessionRoutes from 'app/views/page/SessionRoutes'
import Layout from '../components/Layout/Layout'
import { Navigate } from 'react-router-dom'

export const AllPages = () => {
    const all_routes = [
        {
            element: (
                <AuthGuard>
                    <Layout />
                </AuthGuard>
            ),
            children: [...contactsRoutes, ...usersRoutes],
        },
        ...sessionRoutes,
        {
            path: '/',
            element: <Navigate to="contacts/default" />,
        },
        {
            path: '*',
            element: <Index />,
        },
    ]

    return all_routes
}
