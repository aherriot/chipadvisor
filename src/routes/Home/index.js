import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { view } from 'react-easy-state'

import Header from 'components/Header'
import geosStore from 'store/geos'

const Home = view(props => {
  geosStore.fetch()

  return (
    <div>
      <Header />

      <StyledIntro>
        <p>
          Welcome to Chipadvisor. The world's leading travel chip review site.
        </p>
      </StyledIntro>
      <StyledGeoTiles>
        {Object.values(geosStore.byId).map(geo => (
          <StyledGeoTile key={geo.id}>
            <Link to={`/chips/${geo.id}-${geo.title}`}>
              <StyledImg src={geo.imgUrl} alt={geo.title}></StyledImg>
              <StyledTileTitle>{geo.title}</StyledTileTitle>
            </Link>
          </StyledGeoTile>
        ))}
      </StyledGeoTiles>
      <StyledIntro>
        <p>Made (as a joke) by Andrew Herriot.</p>
        <br />
        <p>
          Feedback and contributions welcome at{' '}
          <a href='https://github.com/aherriot/chipadvisor' target=''>
            github.com/aherriot/chipadvisor
          </a>
          .
        </p>
      </StyledIntro>
    </div>
  )
})

Home.propTypes = {}

const StyledIntro = styled.div`
  padding: 16px;
  margin: 0 auto;
  text-align: center;
`

const StyledGeoTiles = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  max-width: 1000px;
  margin: 0 auto;
`

const StyledGeoTile = styled.div`
  flex: 400px 0 1;
  height: 200px;
  background-color: ${({ theme }) => theme.color.white};
  margin: 16px;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
`

const StyledImg = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
  /* position: absolute; */
`

const StyledTileTitle = styled.h1`
  position: absolute;
  right: 16px;
  bottom: 8px;
  color: ${({ theme }) => theme.color.white};
  text-shadow: 1px 1px 2px black;
`

export default Home
