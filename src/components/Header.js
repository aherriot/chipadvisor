import React from 'react'
import styled from 'styled-components'
import Link from 'components/Link'

function Header(props) {
  const username = window.localStorage.getItem('username')
  const userId = window.localStorage.getItem('userId')
  return (
    <StyledHeader>
      <StyledLeft>
        <StyledLogo src='/potato128.png' alt='ChipAdvisor Logo' />
        <Link isLight to='/'>
          ChipAdvisor
        </Link>
      </StyledLeft>
      <div>
        <Link
          isLight
          to={
            username
              ? `/profiles/${userId}`
              : {
                  pathname: '/login',
                  state: { referrer: window.location.pathname }
                }
          }>
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

const StyledLeft = styled.div`
  display: flex;
  align-items: center;
`

const StyledLogo = styled.img`
  width: 24px;
  margin-right: 8px;
`

export default Header
