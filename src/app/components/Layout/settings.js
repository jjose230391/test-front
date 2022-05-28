import layout1Settings from './Layout1/Layout1Settings'
import { themes } from '../Themes/initThemes'

export const LayoutSettings = {
    activeLayout: 'layout1',
    activeTheme: 'blue', // color
    perfectScrollbar: false,

    themes: themes,
    layout1Settings, // open Layout1/Layout1Settings.js

    secondarySidebar: {
        show: true,
        open: false,
        theme: 'slateDark1', // color
    },
    // Footer options
    footer: {
        show: false,
        fixed: false,
        theme: 'slateDark1', // color
    },
}
