import React from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'

import Header from 'components/Header'
import TextInput from 'components/TextInput'

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
          {errors.email && <StyledError>{errors.email.message}</StyledError>}
        </StyledField>
        <StyledButton type='submit'>Submit</StyledButton>
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

export default Login
