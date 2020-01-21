import React from 'react'
import { view } from 'react-easy-state'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import Breadcrumb from 'components/Breadcrumb'
import Header from 'components/Header'
import TextInput from 'components/TextInput'

const NewItem = view(({ match: { params: { geoId, chipId } } }) => {
  const { handleSubmit, register, errors } = useForm()

  if (!window.localStorage.getItem('username')) {
    return <Redirect push to='/login' />
  }

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
          <StyledLabel>Title</StyledLabel>
          <TextInput
            name='title'
            type='text'
            ref={register({ required: 'Required' })}></TextInput>
          {errors.title && <StyledError>{errors.title.message}</StyledError>}
        </StyledField>
        <StyledField>
          <StyledLabel>Cities</StyledLabel>
          <select name='geos' ref={register({ required: 'Required' })}>
            <option value='1'>1 Bubble</option>
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
})

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
