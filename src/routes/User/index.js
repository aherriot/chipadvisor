import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Header from "components/Header";
import reviewData from "data/reviewData";

function List({
  match: {
    params: { userId }
  }
}) {
  const [data, setData] = useState({ reviews: [] });

  useEffect(() => {
    window.setTimeout(() => {
      setData({ reviews: reviewData });
    }, 0);
    setData({ reviews: [] });
  }, [userId]);

  return (
    <div>
      <Header />
      {userId}
      {data.reviews
        .filter(review => review.userId === Number(userId))
        .map(review => (
          <div>{JSON.stringify(review)}</div>
        ))}
    </div>
  );
}

List.propTypes = {
  match: PropTypes.object.isRequired
};

export default List;
