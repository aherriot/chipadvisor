import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'
import Link from 'components/Link'
import BubbleRating from 'components/BubbleRating'

function ListCell({
  geoId,
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
      <RouterLink to={`/chips/${geoId}/${id}`}>
        <StyledImg src={imgUrl} alt={title} />
      </RouterLink>
      <StyledContent>
        <StyledTitle>
          <RouterLink to={`/chips/${geoId}/${id}`}>
            {`${rank}. ${title}`}
          </RouterLink>
        </StyledTitle>
        <StyledRating>
          {rating == null ? (
            <Link to={`/chips/${geoId}/${id}`}>No Reviews Yet</Link>
          ) : (
            <>
              <BubbleRating rating={rating} />{' '}
              <span>
                {numOfReviews} {numOfReviews !== 1 ? ' Reviews' : ' Review'}
              </span>
            </>
          )}
        </StyledRating>
        <StyledDescription>{description}</StyledDescription>
      </StyledContent>
    </StyledListCell>
  )
}

ListCell.propTypes = {
  geoId: PropTypes.string.isRequired,
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
  max-width: 1000px;
  display: grid;
  background-color: #fff;

  @media only screen and (min-width: 600px) {
    grid-template-columns: 300px auto;
  }
`

const StyledImg = styled.img`
  width: 100%;
  height: 200px;
  background-color: grey;
  object-fit: cover;
`

const StyledContent = styled.div`
  padding: 10px;
`

const StyledTitle = styled.h2`
  margin-top: 4px;

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
  margin-top: 10px;
  max-height: 100px;
  overflow: hidden;
`

export default ListCell
