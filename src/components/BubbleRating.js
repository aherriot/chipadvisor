import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function BubbleRating(props) {
  const content = [];

  // For each half of each bubble rating
  for (let i = 0; i < 10; i++) {
    let isBubbleLeftSided;
    let xPosition = 0;

    if (i % 2 === 0) {
      xPosition = i * 10 + 10;

      content.push(
        <StyledOuterCircle
          key={"outer" + i}
          r={9}
          cx={xPosition}
          cy={11}
        ></StyledOuterCircle>
      );
      isBubbleLeftSided = true;
    } else {
      // For the right side of the circle, we calculate
      xPosition = (i - 1) * 10 + 10;
      isBubbleLeftSided = false;
    }

    // round rating to the nearest half-bubble
    if (props.rating - 0.25 > i / 2) {
      content.push(
        <InnerHalfCircle
          key={"inner" + i}
          x={xPosition}
          y={11}
          left={isBubbleLeftSided}
        />
      );
    }
  }
  return (
    <StyledBubbleRating title={props.rating + " bubbles out of 5"}>
      <svg width={102} height={22}>
        {content}
      </svg>
    </StyledBubbleRating>
  );
}

BubbleRating.propTypes = {
  rating: PropTypes.number.isRequired,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func
};

BubbleRating.defaultProps = {
  readOnly: true
};

const StyledBubbleRating = styled.div`
  display: inline-block;
`;

const StyledOuterCircle = styled.circle`
  fill-opacity: 0;
  stroke: ${({ theme }) => theme.color.main};
  stroke-width: 2px;
`;

const StyledInnerHalfCircle = styled.path`
  fill: ${({ theme }) => theme.color.main};
`;

const InnerHalfCircle = function({ x, y, left }) {
  return (
    <StyledInnerHalfCircle
      d={`M ${x} ${y - 6} A 6 6 0 0 ${left ? 0 : 1} ${x} ${y + 6}`}
    />
  );
};

export default BubbleRating;
