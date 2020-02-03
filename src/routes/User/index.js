import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Header from 'components/Header'

function List({
  match: {
    params: { userId }
  }
}) {
  return (
    <div>
      <Header />
      {userId}
    </div>
  )
}

List.propTypes = {
  match: PropTypes.object.isRequired
}

export default List
