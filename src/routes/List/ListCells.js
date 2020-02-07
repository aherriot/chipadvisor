import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import VisibilitySensor from 'react-visibility-sensor'

import TextInput from 'components/TextInput'

import ListCell from './ListCell'

const PAGE_SIZE = 5

const ListCells = ({ chips, geoId, geoTitle }) => {
  const [searchText, setSearchText] = useState('')
  const [numCellsToRender, setNumCellsToRender] = useState(PAGE_SIZE)

  let includedCount = 0
  const filteredChips = chips
    .filter((chip, i) => {
      if (includedCount >= numCellsToRender) {
        return false
      }

      if (
        !searchText ||
        chip.title.toLowerCase().includes(searchText.toLowerCase())
      ) {
        includedCount++
        return true
      }
      return false
    })
    .map((chip, i) => {
      const listCell = (
        <ListCell
          key={chip.id}
          geoId={geoId}
          geoTitle={geoTitle}
          rank={chip.ranking}
          {...chip}
        />
      )

      if (i === numCellsToRender - 1) {
        return (
          <VisibilitySensor
            onChange={isVisible => {
              if (isVisible) {
                setNumCellsToRender(numCellsToRender + PAGE_SIZE)
              }
            }}
            key={chip.id}>
            {listCell}
          </VisibilitySensor>
        )
      }

      return listCell
    })

  return (
    <>
      <StyledFilter>
        <TextInput
          placeholder='Filter Chips'
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
      </StyledFilter>
      {filteredChips.length === 0 && <StyledP>No chips match filter.</StyledP>}
      {filteredChips}
    </>
  )
}

ListCells.propTypes = {
  chips: PropTypes.array.isRequired,
  geoId: PropTypes.number.isRequired,
  geoTitle: PropTypes.string
}

const StyledFilter = styled.div`
  padding: 0 16px 16px;
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

export default ListCells
