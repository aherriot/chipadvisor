import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { view } from 'react-easy-state'

import Header from 'components/Header'
import Breadcrumb from 'components/Breadcrumb'
import Link from 'components/Link'
import Review from './Review'
import geosStore from 'store/geos'

const Item = view(({ match: { params: { geo, chip } } }) => {
  const geoId = parseInt(geo, 10)
  const chipId = parseInt(chip, 10)

  const [chipData, setChipData] = useState(null)
  const [reviews, setReviews] = useState([])
  useEffect(() => {
    const fetchChip = async () => {
      try {
        const resp = await fetch(`/api/chips/${chipId}`)
        const result = await resp.json()
        setChipData(result.data)
      } catch (e) {
        console.error(e)
      }
    }
    fetchChip()

    const fetchReviews = async () => {
      try {
        const resp = await fetch(`/api/reviews?chipId=${chipId}`)
        const result = await resp.json()
        setReviews(result.data)
      } catch (e) {
        console.error(e)
      }
    }
    fetchReviews()
  }, [chipId])

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
  if (reviews.length !== 0) {
    reviewContent = (
      <>
        <StyledReviewSummary>
          <span>
            {reviews.length + (reviews.length === 1 ? ' review' : ' reviews')}
          </span>
          <span>Average Rating: {chipData.rating.toFixed(1)}</span>
        </StyledReviewSummary>

        <ReviewLinkWrapper>
          <Link to={newReviewUrl}>Write a Review</Link>
        </ReviewLinkWrapper>
        {reviews.map(review => (
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
      <StyledWrapper>
        <StyleImg src={chipData.imgUrl} alt={chipData.title} />
        <StyledContent>
          <h2>{chipData.title}</h2>
          <p>{chipData.description}</p>

          <h2>Reviews</h2>
          {reviewContent}
        </StyledContent>
      </StyledWrapper>
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
  object-fit: cover;
  height: 300px;
`

const StyledContent = styled.div`
  padding: 8px 8px 0;
`

const StyledReviewSummary = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`

const ReviewLinkWrapper = styled.div`
  text-align: right;
  margin: 8px 0;
`

export default Item
