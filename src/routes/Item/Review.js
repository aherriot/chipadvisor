import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import BubbleRating from 'components/BubbleRating'
import Link from 'components/Link'
import UserText from 'components/UserText'

function Review({
  id,
  userId,
  chipId,
  username,
  rating,
  description,
  createdAt
}) {
  return (
    <StyledReview>
      <StyledAuthorLine>
        <Link to={`/profiles/${userId}-${username}`}>{username}</Link>
        <StyledDate>{new Date(createdAt).toLocaleString()}</StyledDate>
      </StyledAuthorLine>
      <StyledRatingLine>
        <BubbleRating rating={rating} />
      </StyledRatingLine>
      <UserText>{description}</UserText>
    </StyledReview>
  )
}

Review.propTypes = {
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  chipId: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired
}

const StyledReview = styled.div`
  margin: 10px -8px 0;
  background-color: #fff;
  padding: 12px 16px;
`

const StyledAuthorLine = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledRatingLine = styled.div`
  margin: 8px 0;
`

const StyledDate = styled.span`
  font-size: 13px;
`

export default Review
