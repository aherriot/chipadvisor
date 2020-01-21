import React from 'react'
// import PropTypes from "prop-types";
import { Link } from 'react-router-dom'
import { view } from 'react-easy-state'
import geosStore from 'store/geos'

const Home = view(props => {
  geosStore.fetch()

  return (
    <div>
      <ul>
        {Object.values(geosStore.byId).map(geo => (
          <li key={geo.id}>
            <Link to={`/chips/${geo.id}`}>{geo.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
})

Home.propTypes = {}

export default Home
