// import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import styled from 'styled-components'

const StyledLink = styled(ReactRouterLink)`
  text-decoration: none;
  color: ${({ isLight, theme }) =>
    isLight ? theme.color.white : theme.color.main};
  font-weight: bold;

  &:hover,
  &:active {
    text-decoration: underline;
  }
`

// function Link(props) {
// return <StyledLink {...props} />
// }

export default StyledLink
