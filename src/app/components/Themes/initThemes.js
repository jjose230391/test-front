import { forEach, merge } from 'lodash'
import { themeColors } from './themeColors'
import { createTheme } from '@mui/material'
import { red } from '@mui/material/colors'

function createThemes() {
    let themes = {}
    const themeOptions = {
        typography: {
            fontSize: 14,
            body1: {
                fontSize: '14px',
            },
        },
        status: {
            danger: red[500],
        },
    }

    forEach(themeColors, (value, key) => {
        themes[key] = createTheme(merge({}, themeOptions, value))
    })
    return themes
}
export const themes = createThemes()
