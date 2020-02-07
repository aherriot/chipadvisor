import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { view } from 'react-easy-state'

import geosStore from 'store/geos'

import Header from 'components/Header'
import Breadcrumb from 'components/Breadcrumb'
import Link from 'components/Link'
import ErrorMessage from 'components/ErrorMessage'
import useApi from 'utils/useApi'

import ListCells from './ListCells'
import NewChipButton from './NewChipButton'

const List = view(({ match: { params: { geo } } }) => {
  const geoId = parseInt(geo, 10)

  geosStore.fetch()

  const [chips, isLoading, error] = useApi(`/api/chips/?geoId=${geoId}`, [])

  const geoTitle = geosStore.byId[geoId]?.title ?? ''

  let content
  if (!isLoading && chips.length === 0) {
    content = <StyledP>No Chips for this geo</StyledP>
  } else if (isLoading) {
    content = <StyledP>Loading...</StyledP>
  } else if (error) {
    content = <ErrorMessage>{JSON.stringify(error)}</ErrorMessage>
  } else {
    content = <ListCells chips={chips} geoId={geoId} geoTitle={geoTitle} />
  }

  return (
    <StyledList>
      <Header />
      <Breadcrumb
        crumbs={[{ url: `/chips`, title: 'Cities' }, { title: geoTitle }]}
      />
      {content}
      <StyledFooter>
        <p>
          Is your favourite chip missing?{' '}
          <Link to={`/chips/${geoId}-${encodeURIComponent(geoTitle)}/new`}>
            Add it!
          </Link>
        </p>
      </StyledFooter>
      <NewChipButton geoId={geoId} geoTitle={geoTitle} />
    </StyledList>
  )
})

List.propTypes = {
  match: PropTypes.object.isRequired
}

const StyledList = styled.div`
  overflow-y: hidden;
`

const StyledFooter = styled.div`
  padding: 48px 16px;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
`

const StyledP = styled.p`
  text-align: center;
  margin: 16px 0;
  font-weight: bold;
  font-size: 18px;
`

export default List
