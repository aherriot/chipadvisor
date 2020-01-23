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
  const [isLoading, setIsLoading] = useState(true)
  const [searchText, setSearchText] = useState('')

  geosStore.fetch()

  useEffect(() => {
    setIsLoading(true)
    const fetchChips = async () => {
      const resp = await fetch(`/api/chips/?geoId=${geoId}`)
      const result = await resp.json()
      setChips(result.data)
      setIsLoading(false)
    }

    fetchChips()
  }, [geoId])

  let content
  if (!isLoading && chips.length === 0) {
    content = <StyledP>No Chips for this geo</StyledP>
  } else if (isLoading) {
    content = <StyledP>Loading</StyledP>
  } else {
    const filteredChips = chips.filter(chip =>
      chip.title.toLowerCase().includes(searchText.toLowerCase())
    )

    content = (
      <>
        <StyledFilter>
          <TextInput
            placeholder='Filter Chips'
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
        </StyledFilter>
        {filteredChips.length === 0 && (
          <StyledP>No chips match filter.</StyledP>
        )}
        {filteredChips.map((chip, i) => (
          <ListCell key={chip.id} geoId={geoId} rank={i + 1} {...chip} />
        ))}
      </>
    )
  }

  return (
    <div>
      <Header />
      <Breadcrumb
        crumbs={[
          { url: `/chips`, title: 'Cities' },
          { title: geosStore.byId[geoId]?.title ?? '' }
        ]}
      />
      {content}
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

const StyledFilter = styled.div`
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
