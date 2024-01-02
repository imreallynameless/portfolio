import React from 'react'
import { Description, Home, DataObject } from '@mui/icons-material'
export const NavBarData = [
    {
        title: "Home",
        icon: <Home />,
        link: "/home",
    },

    {
        title: "Resume",
        icon: <Description />,
        link: "/resume",
    },

    {
        title: "Projects",
        icon: <DataObject />,
        link: "/projects",
    }

]