import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import Header from 'components/Header'
import Link from 'components/Link'

const Profile = () => {
  const username = window.localStorage.getItem('username')
  const userId = window.localStorage.getItem('userId')

  if (!username) {
    return <Redirect to='/login' />
  }

  return (
    <div>
      <Header />
      <h1>Profile</h1>
      <p>You are logged in as {username}.</p>
      <Link to='/'>Home</Link>
      <br />
      <Link
        to={`/profile/${userId}`}
        onClick={e => {
          window.localStorage.removeItem('username')
          window.localStorage.removeItem('userId')
        }}>
        Logout
      </Link>
    </div>
  )
}

Profile.propTypes = {
  match: PropTypes.object.isRequired
}

export default Profile
