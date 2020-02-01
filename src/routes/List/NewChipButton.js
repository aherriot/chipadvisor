import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

function NewChipButton({ geoId, geoTitle }) {
  return (
    <StyledContainer>
      <Link
        to={`/chips/${geoId}-${encodeURIComponent(geoTitle)}/new`}
        title='Add New Chip'>
        <StyledNewChipButton tabIndex={0}>＋</StyledNewChipButton>
      </Link>
    </StyledContainer>
  )
}

NewChipButton.propTypes = {
  geoId: PropTypes.number.isRequired,
  geoTitle: PropTypes.string
}

const StyledContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  max-width: 800px;
  padding: 24px 24px;
`

const StyledNewChipButton = styled.div`
  float: right;
  width: 50px;
  height: 50px;

  background: ${({ theme }) => theme.color.main};
  color: white;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.5);

  &:hover,
  &:active,
  &:focus {
    transform: translate(0, -1px);
    box-shadow: 1px 3px 10px rgba(0, 0, 0, 0.5);
  }

  font-size: 32px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
`

export default NewChipButton
