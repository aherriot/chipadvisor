import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'
import Link from 'components/Link'
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
    <StyledListCell>
      <StyledImg src={imgUrl} alt={title} />
      <StyledContent>
        <StyledTitle>
          <RouterLink
            to={
              `/chips/` +
              `${geoId}-${encodeURIComponent(geoTitle)}` +
              `/${id}-${encodeURIComponent(title)}`
            }>
            {`${rank}. ${title}`}
          </RouterLink>
        </StyledTitle>
        <StyledRating>
          {rating == null ? (
            <Link
              to={
                `/chips/` +
                `${geoId}-${encodeURIComponent(geoTitle)}` +
                `/${id}-${encodeURIComponent(title)}`
              }>
              No Reviews Yet
            </Link>
          ) : (
            <>
              <BubbleRating rating={rating} />{' '}
              <span>
                {numOfReviews} {numOfReviews !== 1 ? ' Reviews' : ' Review'}
              </span>
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
  background-color: ${({ theme }) => theme.color.white};
  object-fit: contain;
`

const StyledContent = styled.div`
  grid-area: summary;
  padding: 10px;
`

const StyledTitle = styled.h2`
  margin-top: 4px;
  font-size: 22px;

  & > a {
    text-decoration: none;
    color: ${({ theme }) => theme.color.black};

    &:visited {
      color: ${({ theme }) => theme.color.black};
    }
  }
`

const StyledRating = styled.div`
  display: flex;
  align-items: center;
  & > span {
    margin-left: 8px;
    margin-bottom: 2px;
    font-size: 14px;
  }
`

const StyledDescription = styled.div`
  grid-area: description;
  padding: 2px 10px 10px;
  max-height: 100px;
  overflow: hidden;
`

const StyledP = styled.p`
  font-size: 14px;
`

export default ListCell
