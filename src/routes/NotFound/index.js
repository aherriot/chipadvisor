import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Header from 'components/Header'
import Link from 'components/Link'

const NotFound = () => {
  return (
    <div>
      <Header />
      <StyledNotFound>
        <h1>404 - Page not found</h1>
        <Link to='/'>Return Home</Link>
      </StyledNotFound>
    </div>
  )
}

NotFound.propTypes = {
  match: PropTypes.object.isRequired
}

const StyledNotFound = styled.div`
  text-align: center;
  margin: 16px;
`

export default NotFound
