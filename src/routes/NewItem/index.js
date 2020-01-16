import React from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'

import Breadcrumb from 'components/Breadcrumb'
import Header from 'components/Header'

function NewItem({
  match: {
    params: { geoId, chipId }
  }
}) {
  const { handleSubmit, register, errors } = useForm()

  const onSubmit = values => {
    console.log(values)
  }

  return (
    <StyledNewItem>
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
        <h2>Add New Chip</h2>
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
          <select name='rating' ref={register({ required: 'Required' })}>
            <option value='1'>1 Bubble</option>
            <option value='2'>2 Bubbles</option>
            <option value='3'>3 Bubbles</option>
            <option value='4'>4 Bubbles</option>
            <option value='5'>5 Bubbles</option>
          </select>
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
    </StyledNewItem>
  )
}

const StyledNewItem = styled.div``

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

export default NewItem
