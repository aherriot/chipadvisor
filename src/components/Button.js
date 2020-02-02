import styled from 'styled-components'

export default styled.button`
  padding: 8px;
  font-size: 16px;
  border-radius: 2px;
  border: none;
  font-weight: bold;
  background: ${props => props.theme.color.green};
  color: ${props => props.theme.color.black};
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
`
