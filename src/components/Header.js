import React from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";

function Header(props) {
  return <StyledHeader>ChipAdvisor</StyledHeader>;
}

Header.propTypes = {};

const StyledHeader = styled.header`
  color: ${({ theme }) => theme.color.white}
  background-color: ${({ theme }) => theme.color.main};

  height: 60px;

  padding: 0 16px;
  display: flex;
  align-items: center;
`;

export default Header;
