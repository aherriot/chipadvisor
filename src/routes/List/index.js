import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { view } from 'react-easy-state'

import geosStore from 'store/geos'

import Header from 'components/Header'
import Breadcrumb from 'components/Breadcrumb'
import TextInput from 'components/TextInput'
import Link from 'components/Link'

import ListCell from './ListCell'
import NewChipButton from './NewChipButton'

const List = view(({ match: { params: { geoId } } }) => {
  const [chips, setChips] = useState([])
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    geosStore.fetch()
  }, [])

  useEffect(() => {
    const fetchChips = async () => {
      const resp = await fetch(`/api/chips/?geoId=${geoId}`)
      const result = await resp.json()
      setChips(result.data)
    }

    fetchChips()
  }, [geoId])

  if (chips.length === 0) {
    return null
  }

  const filteredChips = chips.filter(chip =>
    chip.title.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <div>
      <Header />
      <Breadcrumb
        crumbs={[
          { url: '/', title: 'Home' },
          { url: `/chips`, title: 'Cities' },
          { url: `/chips/${geoId}`, title: geosStore.byId[geoId]?.title ?? '' }
        ]}
      />
      <StyledContent>
        <TextInput
          placeholder='Filter Chips'
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
      </StyledContent>
      {filteredChips.length === 0 && <StyledP>No chips match filter.</StyledP>}
      {filteredChips.map((chip, i) => (
        <ListCell key={chip.id} geoId={geoId} rank={i + 1} {...chip} />
      ))}
      <StyledFooter>
        <p>
          Is your favourite chip missing?{' '}
          <Link to={`/chips/${geoId}/new`}>Add it</Link>
        </p>
      </StyledFooter>
      <NewChipButton geoId={geoId} />
    </div>
  )
})

List.propTypes = {
  match: PropTypes.object.isRequired
}

const StyledContent = styled.div`
  padding: 0 16px 16px;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
`

const StyledFooter = styled.div`
  padding: 24px 16px;
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
