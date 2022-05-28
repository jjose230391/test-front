import React, {Suspense} from 'react'
import {Layouts} from './index'
import {Loading} from 'app/components'
import useSettings from 'app/hooks/useSettings'


const Layout = (props) => {
    const {settings} = useSettings()
    const Layout = Layouts[settings.activeLayout]

    return (
        <>
            <Suspense fallback={<Loading />}>
                    <Layout {...props} />
            </Suspense>
        </>
    )
}

export default Layout
