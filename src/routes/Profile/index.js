import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Header from 'components/Header'
import Link from 'components/Link'
import BubbleRating from 'components/BubbleRating'
import ErrorMessage from 'components/ErrorMessage'
import useApi from 'utils/useApi'

const Profile = ({
  match: {
    params: { user }
  },
  history
}) => {
  const userId = parseInt(user, 10)
  const loggedInUserId = parseInt(window.localStorage.getItem('userId'), 10)

  const [userData, userIsLoading, userError] = useApi(
    `/api/users/${userId}`,
    {}
  )

  const [reviewData, reviewIsLoading, reviewError] = useApi(
    `/api/reviews/byUserId/${userId}`,
    []
  )

  let ownProfileContent
  if (userId === loggedInUserId) {
    ownProfileContent = (
      <Link
        to={`/profiles/${userId}`}
        onClick={e => {
          window.localStorage.removeItem('username')
          window.localStorage.removeItem('userId')
          window.location = '/'
        }}>
        Logout
      </Link>
    )
  }

  let content
  if (userIsLoading || reviewIsLoading) {
    content = <div>loading...</div>
  } else if (userError) {
    content = <ErrorMessage>{JSON.stringify(userError)}</ErrorMessage>
  } else if (reviewError) {
    content = <ErrorMessage>{JSON.stringify(reviewError)}</ErrorMessage>
  } else if (userData && reviewData) {
    content = (
      <>
        <h1>Profile: {userData.username}</h1>
        <h2>Reviews</h2>
        {reviewData.map((review, index) => (
          <Link
            key={review.id}
            to={`/chips/0/${review.chipId}-${encodeURIComponent(
              review.chipTitle
            )}`}>
            <StyledReview>
              <StyledReviewNumber>{index + 1}</StyledReviewNumber>
              <BubbleRating rating={review.rating} />
              <StyledReviewText>{review.chipTitle}</StyledReviewText>
            </StyledReview>
          </Link>
        ))}
      </>
    )
  }

  return (
    <StyledProfile>
      <Header />
      <StyledContent>
        {content}

        {ownProfileContent}
      </StyledContent>
    </StyledProfile>
  )
}

Profile.propTypes = {
  match: PropTypes.object.isRequired
}

const StyledProfile = styled.div`
  overflow-x: hidden;
`

const StyledContent = styled.div`
  padding: 8px;
  max-width: 600px;
  margin: 0 auto;
`

const StyledReview = styled.div`
  display: flex;
  align-items: center;
  margin: 4px 0;
`
const StyledReviewNumber = styled.span`
  display: inline-block;
  margin-right: 10px;
`

const StyledReviewText = styled.span`
  /* flex: 1 0; */
  flex-wrap: none;
  white-space: nowrap;
  margin: 0 0 4px 8px;
`

export default Profile
