import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Header from "components/Header";
import Breadcrumb from "components/Breadcrumb";
import Link from "components/Link";
import Review from "./Review";
import chipData from "data/chipData";
import reviewData from "data/reviewData";

function Item({
  match: {
    params: { geoId, chipId }
  }
}) {
  const data = chipData.find(chip => chip.id === parseInt(chipId, 10));

  if (!data) {
    return null;
  }

  return (
    <StyledItem>
      <Header />
      <Breadcrumb
        crumbs={[
          { url: "/", title: "Home" },
          { url: `/chips`, title: "Cities" },
          { url: `/chips/${geoId}`, title: geoId },
          { url: `/chips/${geoId}/${chipId}`, title: chipId }
        ]}
      />
      <StyledWrapper>
        <StyleImg src={data.imgUrl} alt={data.title} />
        <StyledContent>
          <h2>{data.title}</h2>
          <p>{data.description}</p>
          <h2>Reviews</h2>
          <StyledReviewSummary>
            <span>
              {reviewData.length +
                (reviewData.length === 1 ? " review" : " reviews")}
            </span>
            {reviewData.length > 1 && (
              <span>Average Rating: {data.rating}</span>
            )}
          </StyledReviewSummary>
          <ReviewLinkWrapper>
            <Link to={`/chips/${geoId}/${chipId}/review`}>Write a Review</Link>
          </ReviewLinkWrapper>
        </StyledContent>
        {reviewData.map(review => (
          <Review key={review.id} {...review} />
        ))}
        <ReviewLinkWrapper>
          <Link to={`/chips/${geoId}/${chipId}/review`}>Write a Review</Link>
        </ReviewLinkWrapper>
      </StyledWrapper>
    </StyledItem>
  );
}

Item.propTypes = {
  match: PropTypes.object.isRequired
};

const StyledItem = styled.div`
  width: 100%;
`;

const StyledWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const StyleImg = styled.img`
  width: 100%;
  object-fit: cover;
  height: 300px;
`;

const StyledContent = styled.div`
  padding: 8px 8px 0;
`;

const StyledReviewSummary = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;

const ReviewLinkWrapper = styled.div`
  text-align: right;
  margin: 10px 0;
`;

export default Item;
