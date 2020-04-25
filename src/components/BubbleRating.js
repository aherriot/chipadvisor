import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const SPACE_BETWEEN = 13

function BubbleRating({ rating }) {
  const content = []

  // For each half of each bubble rating
  for (let i = 0; i < 10; i++) {
    let isBubbleLeftSided
    let xPosition = 0

    if (i % 2 === 0) {
      xPosition = i * SPACE_BETWEEN + SPACE_BETWEEN

      content.push(
        <StyledOuterCircle
          key={'outer' + i}
          r={9}
          cx={xPosition}
          cy={11}></StyledOuterCircle>
      )
      isBubbleLeftSided = true
    } else {
      // For the right side of the circle, we calculate
      xPosition = (i - 1) * SPACE_BETWEEN + SPACE_BETWEEN
      isBubbleLeftSided = false
    }

    // round rating to the nearest half-bubble
    if (rating - 0.25 > i / 2) {
      content.push(
        <InnerHalfCircle
          key={'inner' + i}
          x={xPosition}
          y={11}
          left={isBubbleLeftSided}
        />
      )
    }
  }
  return (
    <StyledBubbleRating title={rating + ' bubbles out of 5'}>
      <StyledSvg width={SPACE_BETWEEN * 10 + 2} height={22}>
        {content}
      </StyledSvg>
    </StyledBubbleRating>
  )
}

BubbleRating.propTypes = {
  rating: PropTypes.number.isRequired,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func
}

BubbleRating.defaultProps = {
  readOnly: true
}

const StyledSvg = styled.svg`
  shape-rendering: geometricPrecision;
`

const StyledBubbleRating = styled.div`
  display: inline-block;
`

const StyledOuterCircle = styled.circle`
  fill-opacity: 0;
  stroke: ${({ theme }) => theme.color.moss};
  stroke-width: 2.5px;
`

const StyledInnerHalfCircle = styled.path`
  fill: ${({ theme }) => theme.color.moss};
`

const InnerHalfCircle = function({ x, y, left }) {
  return (
    <StyledInnerHalfCircle
      d={`M ${x} ${y - 9} A 9 9 0 0 ${left ? 0 : 1} ${x} ${y + 9}`}
    />
  )
}

export default BubbleRating
