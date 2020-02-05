import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const UserText = ({ children }) =>
  children
    .split('\n')
    .map((paragraph, i) =>
      paragraph ? (
        <StyledP key={i}>{paragraph}</StyledP>
      ) : (
        <StyledP key={i}>&nbsp;</StyledP>
      )
    )

UserText.propTypes = {
  children: PropTypes.string
}

const StyledP = styled.p`
  font-size: 14px;
`

export default UserText
