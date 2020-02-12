import React from 'react'
import styled from 'styled-components'

import useApi from 'utils/useApi'
import Header from 'components/Header'

const Errors = () => {
  const [errors, isLoading] = useApi('/api/errors', [])
  return (
    <div>
      <Header />
      {isLoading && <p>loading...</p>}
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Date</Th>
            <Th>Type</Th>
            <Th>UserId</Th>
            <Th>Location</Th>
            <Th>Action</Th>
            <Th>Details</Th>
          </tr>
        </thead>
        <tbody>
          {errors.map(error => (
            <tr key={error.id}>
              <Td>{error.id}</Td>
              <Td>{error.created_at}</Td>
              <Td>{error.type}</Td>
              <Td>{error.user_id}</Td>
              <Td>{error.location}</Td>
              <Td>{error.action}</Td>
              <Td>{error.details}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

const Table = styled.table`
  min-width: 100%;
  overflow: scroll;
`

const Th = styled.th`
  padding: 0 4px;
  text-align: left;
`

const Td = styled.td`
  padding: 0 4px;
`

export default Errors
