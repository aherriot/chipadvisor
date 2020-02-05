import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { view } from 'react-easy-state'

import Header from 'components/Header'
import Breadcrumb from 'components/Breadcrumb'
import ErrorMessage from 'components/ErrorMessage'
import UserText from 'components/UserText'

import useApi from 'utils/useApi'

import ReviewSection from './ReviewSection'
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
            <UserText>{chipData.description}</UserText>
          </StyledDescription>
          <ReviewSection
            reviewsData={reviewsData}
            rating={chipData.rating}
            geoId={geoId}
            geoTitle={geoTitle}
            chipId={chipId}
            chipTitle={chipTitle}
          />
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

export default Item
