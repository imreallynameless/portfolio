import React from 'react'
import styled from 'styled-components'
import { ArrowBack } from '@mui/icons-material'

const Nav = styled.nav`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 50px;
  height: 50px;
`

const CustomLink = styled.a`
  width: 100%;
  height: 100%;
  display: block;
  text-decoration: none; /* Add this line to remove underline */
`

function TopNav() {
  return (
    <Nav>
      <CustomLink href="/">
        <ArrowBack style={{ fontSize: 40, color: "black" }} />
      </CustomLink>
    </Nav>
  )
}

export default TopNav
