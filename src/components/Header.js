import React from 'react'
import styled from 'styled-components'
import Link from 'components/Link'

function Header(props) {
  const username = window.localStorage.getItem('username')
  const userId = window.localStorage.getItem('userId')
  return (
    <StyledHeader>
      <div>
        <Link isLight to='/'>
          ChipAdvisor
        </Link>
      </div>
      <div>
        <Link isLight to={username ? `/profile/${userId}` : '/login'}>
          {username || 'Login'}
        </Link>
      </div>
    </StyledHeader>
  )
}

Header.propTypes = {}

const StyledHeader = styled.header`
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.main};

  height: 60px;

  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export default Header
