import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { view } from 'react-easy-state'

import Header from 'components/Header'
import Breadcrumb from 'components/Breadcrumb'
import Link from 'components/Link'
import ErrorMessage from 'components/ErrorMessage'

import useApi from 'utils/useApi'

import Review from './Review'
import geosStore from 'store/geos'

const Item = view(({ match: { params: { geo, chip } } }) => {
  const geoId = parseInt(geo, 10)
  const chipId = parseInt(chip, 10)

  const [chipData, chipIsLoading, chipError] = useApi(`/api/chips/${chipId}`)

  const [reviewsData, reviewsAreLoading, reviewsError] = useApi(
    `/api/reviews?chipId=${chipId}`,
    []
  )
  geosStore.fetch()

  if (!chipData) {
    return null
  }

  const geoTitle = geosStore.byId[geoId]?.title ?? ''
  const chipTitle = chipData.title
  const newReviewUrl =
    `/chips/` +
    `${geoId}-${encodeURIComponent(geoTitle)}/` +
    `${chipId}-${encodeURIComponent(chipTitle)}/review`

  let reviewContent
  if (reviewsData.length !== 0) {
    reviewContent = (
      <>
        <StyledReviewSummary>
          <span>
            {reviewsData.length +
              (reviewsData.length === 1 ? ' review' : ' reviews')}
          </span>
          <span>Average Rating: {chipData.rating.toFixed(1)}</span>
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
    reviewContent = (
      <div>
        Be the first to <Link to={newReviewUrl}>Write a Review</Link>
      </div>
    )
  }

  let content
  if (chipIsLoading || reviewsAreLoading) {
    content = <div>loading...</div>
  } else if (chipError) {
    content = <ErrorMessage>{JSON.stringify(chipError)}</ErrorMessage>
  } else if (reviewsError) {
    content = <ErrorMessage>{JSON.stringify(reviewsError)}</ErrorMessage>
  } else if (chipData) {
    content = (
      <>
        <a href={chipData.imgUrl}>
          <StyleImg src={chipData.imgUrl} alt={chipData.title} />
        </a>
        <StyledContent>
          <h2>{chipData.title}</h2>
          <StyledDescription>
            {chipData.description
              .split('\n')
              .map((paragraph, i) =>
                paragraph ? (
                  <StyledP key={chipData.id + i}>{paragraph}</StyledP>
                ) : (
                  <StyledP key={chipData.id + i}>&nbsp;</StyledP>
                )
              )}
          </StyledDescription>
          <h2>Reviews</h2>
          {reviewContent}
        </StyledContent>
      </>
    )
  }

  return (
    <StyledItem>
      <Header />
      <Breadcrumb
        crumbs={[
          { url: `/chips`, title: 'Cities' },
          { url: `/chips/${geoId}`, title: geoTitle },
          { title: chipTitle }
        ]}
      />
      <StyledWrapper>{content}</StyledWrapper>
    </StyledItem>
  )
})

Item.propTypes = {
  match: PropTypes.object.isRequired
}

const StyledItem = styled.div`
  width: 100%;
`

const StyledWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
`

const StyleImg = styled.img`
  width: 100%;
  margin: 0 auto;
  padding: 8px;
  object-fit: contain;
  height: 200px;
  background: ${({ theme }) => theme.color.white};
`

const StyledContent = styled.div`
  padding: 8px 8px 0;
`

const StyledDescription = styled.div``

const StyledP = styled.p``

const StyledReviewSummary = styled.div`
  display: flex
  justify-content: space-between;
  font-size: 14px;
`

const ReviewLinkWrapper = styled.div`
  text-align: right;
  margin: 16px 0;
`

export default Item
