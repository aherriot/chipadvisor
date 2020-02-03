import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { Link as RouterLink } from 'react-router-dom'
import BubbleRating from 'components/BubbleRating'

function ListCell({
  geoId,
  geoTitle,
  id,
  title,
  description,
  rank,
  rating,
  numOfReviews,
  imgUrl
}) {
  return (
    <RouterLink
      to={
        `/chips/` +
        `${geoId}-${encodeURIComponent(geoTitle)}` +
        `/${id}-${encodeURIComponent(title)}`
      }
      css={`
        text-decoration: none;
      `}>
      <StyledListCell>
        <StyledImg src={imgUrl} alt={title} />
        <StyledContent>
          <StyledTitle>{`${rank}. ${title}`}</StyledTitle>
          <StyledRating>
            {rating == null ? (
              <StyledHighligh>No reviews yet</StyledHighligh>
            ) : (
              <>
                <BubbleRating rating={rating} />{' '}
                <StyledRatingDescription>
                  {numOfReviews} {numOfReviews !== 1 ? ' Reviews' : ' Review'}
                </StyledRatingDescription>
              </>
            )}
          </StyledRating>
        </StyledContent>
        <StyledDescription>
          {description
            .split('\n')
            .map((paragraph, i) =>
              paragraph ? (
                <StyledP key={i}>{paragraph}</StyledP>
              ) : (
                <StyledP key={i}>&nbsp;</StyledP>
              )
            )}
        </StyledDescription>
      </StyledListCell>
    </RouterLink>
  )
}

ListCell.propTypes = {
  geoId: PropTypes.number.isRequired,
  geoTitle: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
  rating: PropTypes.number,
  numOfReviews: PropTypes.number.isRequired,
  imgUrl: PropTypes.string.isRequired
}

const StyledListCell = styled.div`
  margin: 0 auto;
  margin-bottom: 10px;
  max-width: 800px;
  width: 100%;
  background-color: #fff;

  display: grid;

  color: ${({ theme }) => theme.color.black};
  text-decoration: none;

  &:hover,
  &:focus,
  &:active {
    color: ${({ theme }) => theme.color.black};
    text-decoration: none;
  }

  /* large */
  /* height: 200px; */
  grid-template-columns: 200px 1fr;
  grid-template-rows: 100px auto;
  grid-template-areas:
    'image summary'
    'image description';

  /* medium */
  @media only screen and (max-width: 600px) {
    grid-template-columns: minmax(100px, 150px) auto;
    grid-template-rows: 100px auto;
    grid-template-areas:
      'image summary'
      'description description';
  }

  /* small */
  @media only screen and (max-width: 400px) {
    grid-template-columns: auto;
    grid-template-rows: 100px auto minmax(min-content, auto);
    grid-template-areas:
      'image'
      'summary'
      'description';
  }
`

const StyledImg = styled.img`
  grid-area: image;

  max-width: 100%;
  max-height: 100%;
  height: 100%;
  width: 100%;
  object-fit: contain;
  padding: 6px 0;
  background-color: ${({ theme }) => theme.color.white};
`

const StyledContent = styled.div`
  grid-area: summary;
  padding: 10px 10px 4px;
`

const StyledTitle = styled.h2`
  margin-top: 4px;
  font-size: 20px;
`

const StyledRating = styled.div`
  display: flex;
  align-items: center;
`

const StyledRatingDescription = styled.span`
  margin-left: 8px;
  margin-bottom: 2px;
  font-size: 14px;
`

const StyledDescription = styled.div`
  grid-area: description;
  padding: 2px 10px 10px;
  max-height: 100px;
  overflow: hidden;
  margin-bottom: 4px;
`

const StyledP = styled.p`
  font-size: 14px;
`
const StyledHighligh = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.color.green};
`

export default ListCell
