import React from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'

import Breadcrumb from 'components/Breadcrumb'
import Header from 'components/Header'

function NewReview({
  match: {
    params: { geoId, chipId }
  }
}) {
  const { handleSubmit, register, errors } = useForm()

  const onSubmit = values => {
    console.log(values)
  }

  return (
    <StyledNewReview>
      <Header />
      <Breadcrumb
        crumbs={[
          { url: '/', title: 'Home' },
          { url: `/chips`, title: 'Cities' },
          { url: `/chips/${geoId}`, title: geoId },
          { url: `/chips/${geoId}/${chipId}`, title: chipId }
        ]}
      />
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <h2>Review Chip</h2>
        <StyledField>
          <StyledLabel>Email</StyledLabel>
          <StyledInput
            name='username'
            type='text'
            ref={register({ required: 'Required' })}></StyledInput>
          {errors.username && (
            <StyledError>{errors.username.message}</StyledError>
          )}
        </StyledField>
        <StyledField>
          <StyledLabel>Rating</StyledLabel>
          <StyledSelect name='rating' ref={register({ required: 'Required' })}>
            <option value='1'>1 Star</option>
            <option value='2'>2 Stars</option>
            <option value='3'>3 Stars</option>
            <option value='4'>4 Stars</option>
            <option value='5'>5 Stars</option>
          </StyledSelect>
        </StyledField>
        <StyledField>
          <StyledLabel>Review</StyledLabel>
          <StyledTextarea
            name='content'
            ref={register({ required: 'Required' })}></StyledTextarea>
          {errors.content && (
            <StyledError>{errors.content.message}</StyledError>
          )}
        </StyledField>
        <StyledButton type='submit'>Submit</StyledButton>
      </StyledForm>
    </StyledNewReview>
  )
}

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

const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid black;

  &:focus {
    outline: none;
    border: 2px solid ${props => props.theme.color.main};
  }
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
  height: 100px;

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
