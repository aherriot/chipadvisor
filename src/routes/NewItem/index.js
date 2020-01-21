import React, { useEffect } from 'react'
import { view } from 'react-easy-state'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import Breadcrumb from 'components/Breadcrumb'
import Header from 'components/Header'
import TextInput from 'components/TextInput'
import geosStore from 'store/geos'

import ImgThumbnail from './ImgThumbnail'

const NewItem = view(({ match: { params: { geoId } } }) => {
  const { handleSubmit, register, watch, setValue, errors } = useForm()

  if (!window.localStorage.getItem('username')) {
    return <Redirect push to='/login' />
  }

  geosStore.fetch()

  useEffect(() => {
    register({ name: 'file' }, { required: 'Required' })
    // fileValue = watch('file')
  }, [register])

  const values = watch()

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
          { url: `/chips/${geoId}`, title: geosStore.byId[geoId]?.title || '' },
          { url: `/chips/${geoId}/new`, title: 'New Chip' }
        ]}
      />
      <StyledForm
        enctype='multipart/form-data'
        onSubmit={handleSubmit(onSubmit)}>
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
          <StyledLabel>Description</StyledLabel>
          <StyledTextarea
            placeholder='This should be an impartial description of the potato chip. You can review the chip after.'
            name='description'
            ref={register({ required: 'Required' })}></StyledTextarea>
          {errors.description && (
            <StyledError>{errors.description.message}</StyledError>
          )}
        </StyledField>
        <StyledField>
          <StyledLabel>Image of Chip Package</StyledLabel>
          <TextInput
            name='file'
            type='file'
            onChange={e => {
              setValue('file', e.target.files[0])
            }}
            // ref={register({ required: 'Required' })}
          />
        </StyledField>
        <ImgThumbnail file={values.file} />
        <StyledField>
          <StyledLabel>Geos</StyledLabel>
          <StyledMultiSelect
            name='geos'
            multiple
            ref={register({ required: 'Required' })}>
            {Object.keys(geosStore.byId).map(geoId => (
              <option key={geoId} value={geoId}>
                {geosStore.byId[geoId].title}
              </option>
            ))}
          </StyledMultiSelect>
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

const StyledMultiSelect = styled.select`
  padding: 8px;
  border: 1px solid black;
  border-radius: 4px;
  font-size: 16px;
  /* height: 36px; */
  width: 100%;
  appearance: none;

  /* background: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0Ljk1IDEwIj48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6I2ZmZjt9LmNscy0ye2ZpbGw6IzQ0NDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPmFycm93czwvdGl0bGU+PHJlY3QgY2xhc3M9ImNscy0xIiB3aWR0aD0iNC45NSIgaGVpZ2h0PSIxMCIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIxLjQxIDQuNjcgMi40OCAzLjE4IDMuNTQgNC42NyAxLjQxIDQuNjciLz48cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMy41NCA1LjMzIDIuNDggNi44MiAxLjQxIDUuMzMgMy41NCA1LjMzIi8+PC9zdmc+); */
  background-repeat: no-repeat;
  background-position-x: 98%;
  background-position-y: 50%;
  background-color: white;
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
