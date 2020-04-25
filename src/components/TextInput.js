import styled from 'styled-components'

const TextInput = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid black;

  &:focus {
    outline: none;
    border: 2px solid ${props => props.theme.color.moss};
  }
`

export default TextInput
