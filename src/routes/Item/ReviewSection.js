import React from 'react'
import styled from 'styled-components'
import Link from 'components/Link'

import Review from './Review'

const ReviewSection = ({
  reviewsData,
  rating,
  geoId,
  geoTitle,
  chipId,
  chipTitle
}) => {
  const newReviewUrl =
    `/chips/` +
    `${geoId}-${encodeURIComponent(geoTitle)}/` +
    `${chipId}-${encodeURIComponent(chipTitle)}/review`

  if (reviewsData.length !== 0) {
    return (
      <>
        <h2>Reviews</h2>
        <StyledReviewSummary>
          <span>
            {reviewsData.length +
              (reviewsData.length === 1 ? ' review' : ' reviews')}
          </span>
          <span>Average Rating: {rating.toFixed(1)}</span>
        </StyledReviewSummary>

        <ReviewLinkWrapper>
          <Link to={newReviewUrl}>Write a Review</Link>
        </ReviewLinkWrapper>
        {reviewsData.map(review => (
          <Review key={review.id} {...review} />
        ))}
        <ReviewLinkWrapper>
          <Link to={newReviewUrl}>Write a Review</Link>
        </ReviewLinkWrapper>
      </>
    )
  } else {
    return (
      <>
        <h2>Reviews</h2>
        <div>
          Be the first to <Link to={newReviewUrl}>Write a Review</Link>
        </div>
      </>
    )
  }
}

const StyledReviewSummary = styled.div`
  display: flex
  justify-content: space-between;
  font-size: 14px;
`

const ReviewLinkWrapper = styled.div`
  text-align: right;
  margin: 16px 0;
`

export default ReviewSection
