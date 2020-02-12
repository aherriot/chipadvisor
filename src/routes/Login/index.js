import React from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'

import Header from 'components/Header'
import TextInput from 'components/TextInput'
import ErrorMessage from 'components/ErrorMessage'
import Button from 'components/Button'
import recordError from 'utils/recordError'

function Login({ history }) {
  const { handleSubmit, register, errors, setError } = useForm()

  const onSubmit = async values => {
    const username = values.email.split('@')[0]

    try {
      const resp = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email: values.email })
      })
      const result = await resp.json()

      if (!resp.ok) {
        setError('email', 'error', result.message)
        recordError('loginBadResponse', JSON.stringify(result))
        return
      }
      window.localStorage.setItem('username', result.data.username)
      window.localStorage.setItem('userId', result.data.id)

      if (history.location.state?.referrer) {
        history.replace(history.location.state.referrer)
      } else {
        history.replace('/')
      }
    } catch (e) {
      setError('email', 'error', 'Server error')
      console.error(e)
      recordError('loginRequestFailed', JSON.stringify(e))
    }
  }

  return (
    <StyledLogin>
      <Header />
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>
        <StyledField>
          <StyledLabel>TripAdvisor Email</StyledLabel>
          <TextInput
            name='email'
            type='email'
            ref={register({ required: 'Required' })}></TextInput>
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </StyledField>
        <Button type='submit'>Submit</Button>
      </StyledForm>
    </StyledLogin>
  )
}

const StyledLogin = styled.div``

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

export default Login
