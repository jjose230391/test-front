import React, { Fragment, useState, Children } from 'react'
import useSettings from 'app/hooks/useSettings'
import { styled, Box } from '@mui/system'
import { Menu, ThemeProvider } from '@mui/material'

const MenuButton = styled(Box)(({ theme }) => ({
    display: 'inline-block',
    color: theme.palette.text.primary,
    '& div:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}))

const Index = (props) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const children = Children.toArray(props.children)
    let { shouldCloseOnItemClick = true, horizontalPosition = 'left' } = props
    const { settings } = useSettings()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <Fragment>
            <MenuButton onClick={handleClick}>
                {props.menuButton}
            </MenuButton>
            <ThemeProvider theme={settings.themes[settings.activeTheme]}>
                <Menu
                    elevation={8}
                    getContentAnchorEl={null}
                    anchorEl={anchorEl}
                    open={!!anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: horizontalPosition,
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: horizontalPosition,
                    }}
                >
                    {children.map((child, index) => (
                        <div
                            onClick={
                                shouldCloseOnItemClick ? handleClose : () => { }
                            }
                            key={index}
                        >
                            {child}
                        </div>
                    ))}
                </Menu>
            </ThemeProvider>
        </Fragment>
    )
}

export default Index
