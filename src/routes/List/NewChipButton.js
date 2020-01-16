import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

function NewChipButton({ geoId }) {
  return (
    <Link to={`/chips/${geoId}/new`} title="Add New Chip">
      <StyledNewChipButton tabIndex={0}>＋</StyledNewChipButton>
    </Link>
  );
}

NewChipButton.propTypes = {
  geoId: PropTypes.string.isRequired
};

const StyledNewChipButton = styled.div`
  width: 50px;
  height: 50px;

  background: ${({ theme }) => theme.color.main};
  color: white;

  position: fixed;
  right: 24px;
  bottom: 24px;
  font-size: 32px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
`;

export default NewChipButton;
