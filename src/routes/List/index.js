import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Header from "components/Header";
import Breadcrumb from "components/Breadcrumb";
import ListCell from "./ListCell";
import NewChipButton from "./NewChipButton";

import chipData from "data/chipData";

function List({
  match: {
    params: { geoId }
  }
}) {
  const [data, setData] = useState({ chips: [] });
  useEffect(() => {
    window.setTimeout(() => {
      setData({ chips: chipData });
    }, 0);
    setData({ chips: [] });
  }, [geoId]);

  return (
    <div>
      <Header />
      <Breadcrumb
        crumbs={[
          { url: "/", title: "Home" },
          { url: `/chips`, title: "Cities" },
          { url: `/chips/${geoId}`, title: geoId }
        ]}
      />
      {data.chips.map((chip, i) => (
        <ListCell key={chip.id} geoId={geoId} rank={i + 1} {...chip} />
      ))}
      <NewChipButton geoId={geoId} />
    </div>
  );
}

List.propTypes = {
  match: PropTypes.object.isRequired
};

export default List;
