import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { view } from 'react-easy-state'
import { Redirect } from 'react-router-dom'
import { useForm, ErrorMessage } from 'react-hook-form'

import Breadcrumb from 'components/Breadcrumb'
import Header from 'components/Header'
import geosStore from 'store/geos'

const NewReview = view(({ match: { params: { geoId, chipId } } }) => {
  const { handleSubmit, register, errors, setError } = useForm()

  const [chip, setChip] = useState(null)
  useEffect(() => {
    const fetchChip = async () => {
      try {
        const resp = await fetch(`/api/chips/${chipId}`)
        const result = await resp.json()
        setChip(result.data)
      } catch (e) {
        console.error(e)
      }
    }
    fetchChip()
  }, [chipId])

  geosStore.fetch()

  if (!window.localStorage.getItem('username')) {
    return <Redirect push to='/login' />
  }

  const onSubmit = async values => {
    console.log(values)
    try {
      const resp = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: window.localStorage.getItem('userId'),
          chipId: chipId,
          rating: values.rating,
          description: values.description
        })
      })
      const result = await resp.json()

      if (!resp.ok) {
        // setError('description', 'error', result.message)
        return
      }
    } catch (e) {
      // setError('email', 'error', 'Server error')
      console.error(e)
    }
  }

  console.log(errors)

  return (
    <StyledNewReview>
      <Header />
      <Breadcrumb
        crumbs={[
          { url: '/', title: 'Home' },
          { url: `/chips`, title: 'Cities' },
          { url: `/chips/${geoId}`, title: geosStore.byId[geoId]?.title ?? '' },
          { url: `/chips/${geoId}/${chipId}`, title: chip?.title ?? '' }
        ]}
      />
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <h2>Review Chip</h2>
        <StyledField>
          <StyledLabel>Rating</StyledLabel>
          <StyledSelect name='rating' ref={register({ required: 'Required' })}>
            <option value='1'>1 Bubble</option>
            <option value='2'>2 Bubbles</option>
            <option value='3'>3 Bubbles</option>
            <option value='4'>4 Bubbles</option>
            <option value='5'>5 Bubbles</option>
          </StyledSelect>
        </StyledField>
        <StyledField>
          <StyledLabel>Review (minimum 100 characters)</StyledLabel>
          <StyledTextarea
            name='description'
            ref={register({
              required: 'Required'
              // minLength: 100,
              // maxLength: 5
            })}></StyledTextarea>
          <ErrorMessage as={StyledError} errors={errors} name='description' />
        </StyledField>
        <StyledButton type='submit'>Submit</StyledButton>
      </StyledForm>
    </StyledNewReview>
  )
})

const StyledNewReview = styled.div``

const StyledForm = styled.form`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 8px;
`

const StyledField = styled.div`
  margin: 16px 0;
`

const StyledLabel = styled.label`
  display: block;
  font-size: 13px;
  margin: 4px 0;
`
const StyledSelect = styled.select`
  padding: 8px;
  border: 1px solid black;
  border-radius: 4px;
  font-size: 16px;
  height: 36px;
  width: 100%;
  appearance: none;

  background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0Ljk1IDEwIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmZjt9LmNscy0ye2ZpbGw6IzQ0NDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPmFycm93czwvdGl0bGU+PHJlY3QgY2xhc3M9ImNscy0xIiB3aWR0aD0iNC45NSIgaGVpZ2h0PSIxMCIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIxLjQxIDQuNjcgMi40OCAzLjE4IDMuNTQgNC42NyAxLjQxIDQuNjciLz48cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMy41NCA1LjMzIDIuNDggNi44MiAxLjQxIDUuMzMgMy41NCA1LjMzIi8+PC9zdmc+);
  background-repeat: no-repeat;
  background-position-x: 98%;
  background-position-y: 50%;
  background-color: white;
`

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 150px;

  padding: 8px;
  font-size: 16px;

  border-radius: 4px;
  resize: vertical;
`

const StyledError = styled.div`
  color: red;
  font-size: 13px;
  /* font-weight: bold; */
  margin: 4px 0;
`

const StyledButton = styled.button`
  padding: 8px;
  font-size: 16px;
  border-radius: 4px;
  border: none;
  background: ${props => props.theme.color.main};
  color: white;
`

export default NewReview