import styled from 'styled-components'

export default styled.button`
  padding: 12px 48px;
  font-size: 14px;
  border-radius: 2px;
  border: none;
  font-weight: bold;
  background: ${props => props.theme.color.mustard};
  border-radius: 12px;
  color: ${props => props.theme.color.black};
  cursor: pointer;
  /* box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5); */
  &:hover {
    background: ${props => props.theme.color.lightMustard}
  }
`
