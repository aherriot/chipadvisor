import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(ReactRouterLink)`
  text-decoration: none;
  color: ${({ theme }) => theme.color.main};
  font-weight: bold;
`;

function Link(props) {
  return <StyledLink {...props} />;
}

export default Link;
