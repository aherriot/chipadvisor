import React, { useEffect } from 'react'
import { view } from 'react-easy-state'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import Breadcrumb from 'components/Breadcrumb'
import Header from 'components/Header'
import TextInput from 'components/TextInput'
import ErrorMessage from 'components/ErrorMessage'
import Button from 'components/Button'
import geosStore from 'store/geos'

// import ImgThumbnail from './ImgThumbnail'

const NewItem = view(({ history, match: { params: { geo } } }) => {
  const geoId = parseInt(geo, 10)
  const {
    handleSubmit,
    register,
    unregister,
    watch,
    setValue,
    setError,
    errors
  } = useForm()

  if (!window.localStorage.getItem('username')) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { referrer: window.location.pathname }
        }}
      />
    )
  }

  geosStore.fetch()

  useEffect(() => {
    register({ name: 'image' }, { required: 'Required' })

    return () => unregister('image')
  }, [register, unregister])

  const description = watch('description')

  const onSubmit = async values => {
    const formData = new FormData()
    formData.append('userId', window.localStorage.getItem('userId'))
    formData.append('title', values.title.trim())
    formData.append('description', values.description.trim())
    formData.append('image', values.image)
    formData.append('geos', values.geos)

    let resp, result
    try {
      resp = await fetch(`/api/chips`, {
        method: 'POST',
        body: formData
      })
    } catch (e) {
      result = e
    }

    try {
      result = await resp.json()
    } catch (e) {
      result = e
    }

    if (resp.ok) {
      history.goBack()
    } else {
      if (
        result?.code === 'MISSING_TITLE' ||
        result?.code === 'INVALID_TITLE'
      ) {
        setError('title', 'error', result.message)
      } else if (
        result?.code === 'MISSING_DESCRIPTION' ||
        result?.code === 'INVALID_DESCRIPTION'
      ) {
        setError('description', 'error', result.message)
      } else if (
        result?.code === 'MISSING_GEOS' ||
        result?.code === 'INVALID_GEOS'
      ) {
        setError('geos', 'error', result.message)
      } else if (result?.code === 'MISSING_IMAGE') {
        setError('image', 'error', result.message)
      } else {
        setError('generic', 'error', result || 'Unknown error')
      }
    }
  }

  return (
    <StyledNewItem>
      <Header />
      <Breadcrumb
        crumbs={[
          { url: `/chips`, title: 'Cities' },
          { url: `/chips/${geoId}`, title: geosStore.byId[geoId]?.title ?? '' },
          { title: 'New Chip' }
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
            ref={register({
              required: 'Required',
              minLength: {
                value: 6,
                message: 'Title must be at least 6 characters.'
              },
              maxLength: {
                value: 40,
                message: 'Title must be 40 characters or less.'
              }
            })}></TextInput>
          {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        </StyledField>
        <StyledField>
          <StyledLabel>
            Description ({description?.length} of out at least 60 characters)
          </StyledLabel>
          <StyledTextarea
            placeholder='This should be an impartial description of the chip. You can review the chip after.'
            name='description'
            ref={register({
              required: 'Required',
              minLength: {
                value: 60,
                message: 'Must be at least 60 characters.'
              },
              maxLength: {
                value: 500,
                message: 'Must be 500 or less characters.'
              }
            })}></StyledTextarea>
          {errors.description && (
            <ErrorMessage>{errors.description.message}</ErrorMessage>
          )}
        </StyledField>
        <StyledField>
          <StyledLabel>Image of Chips (limit 1MB)</StyledLabel>
          <TextInput
            name='image'
            type='file'
            onChange={e => {
              setValue('image', e.target.files[0])
            }}
          />
          {errors.image && <ErrorMessage>{errors.image.message}</ErrorMessage>}
        </StyledField>
        {/* <ImgThumbnail file={values.image} /> */}
        <StyledField>
          <StyledLabel>Where is it available? (1 or more)</StyledLabel>
          <StyledMultiSelect
            name='geos'
            multiple
            ref={register({
              required: 'Must select at least one city.'
            })}>
            {Object.keys(geosStore.byId).map(geoId => (
              <option key={geoId} value={geoId}>
                {geosStore.byId[geoId].title}
              </option>
            ))}
          </StyledMultiSelect>
          {errors.geos && <ErrorMessage>{errors.geos.message}</ErrorMessage>}
        </StyledField>
        {errors.general && (
          <ErrorMessage>{errors.general.message}</ErrorMessage>
        )}
        <Button type='submit'>Submit</Button>
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
export default NewItem
