import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import styled from 'styled-components'

const StyledLink = styled(({ isDark, ...rest }) => (
  <ReactRouterLink {...rest} />
))`
  text-decoration: none;
  color: ${({ isDark, theme }) =>
    isDark ? theme.color.black : theme.color.green};
  font-weight: bold;

  &:hover,
  &:active {
    text-decoration: underline;
  }
`

export default StyledLink
