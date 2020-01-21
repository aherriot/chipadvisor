import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { view } from 'react-easy-state'

import geosStore from 'store/geos'

import Header from 'components/Header'
import Breadcrumb from 'components/Breadcrumb'
import TextInput from 'components/TextInput'

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
      <StyledSearchWrapper>
        <TextInput
          placeholder='Filter Chips'
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
      </StyledSearchWrapper>
      {filteredChips.length === 0 && <StyledP>No chips match filter.</StyledP>}
      {filteredChips.map((chip, i) => (
        <ListCell key={chip.id} geoId={geoId} rank={i + 1} {...chip} />
      ))}
      <NewChipButton geoId={geoId} />
    </div>
  )
})

List.propTypes = {
  match: PropTypes.object.isRequired
}

const StyledSearchWrapper = styled.div`
  padding: 0 16px 16px;
  max-width: 400px;
  margin: 0 auto;
`

const StyledP = styled.p`
  text-align: center;
  margin: 16px 0;
`

export default List
