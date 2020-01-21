import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { view } from 'react-easy-state'

import Header from 'components/Header'
import Breadcrumb from 'components/Breadcrumb'
import Link from 'components/Link'
import Review from './Review'
import geosStore from 'store/geos'

const Item = view(({ match: { params: { geoId, chipId } } }) => {
  const [chip, setChip] = useState(null)
  const [reviews, setReviews] = useState([])
  useEffect(() => {
    const fetchChip = async () => {
      try {
        const resp = await fetch(`/api/chips/${chipId}`)
        const result = await resp.json()
        setChip(result.data)
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

  if (!chip) {
    return null
  }

  const noReviews = reviews.length === 0

  return (
    <StyledItem>
      <Header />
      <Breadcrumb
        crumbs={[
          { url: '/', title: 'Home' },
          { url: `/chips`, title: 'Cities' },
          { url: `/chips/${geoId}`, title: geosStore.byId[geoId]?.title ?? '' },
          { url: `/chips/${geoId}/${chipId}`, title: chip.title }
        ]}
      />
      <StyledWrapper>
        <StyleImg src={chip.imgUrl} alt={chip.title} />
        <StyledContent>
          <h2>{chip.title}</h2>
          <p>{chip.description}</p>

          <h2>Reviews</h2>
          <StyledReviewSummary>
            <span>
              {reviews.length + (reviews.length === 1 ? ' review' : ' reviews')}
            </span>
            {reviews.length != 0 && (
              <span>Average Rating: {chip.rating.toFixed(1)}</span>
            )}
          </StyledReviewSummary>
          <ReviewLinkWrapper>
            <Link to={`/chips/${geoId}/${chipId}/review`}>Write a Review</Link>
          </ReviewLinkWrapper>
        </StyledContent>
        {reviews.map(review => (
          <Review key={review.id} {...review} />
        ))}
        <BottomNewReviewLink>
          <Link to={`/chips/${geoId}/${chipId}/review`}>Write a Review</Link>
        </BottomNewReviewLink>
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

const BottomNewReviewLink = styled.div`
  text-align: right;
  margin: 8px;
`

export default Item
