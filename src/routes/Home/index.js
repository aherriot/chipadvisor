import React from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Home(props) {
  return (
    <div>
      <ul>
        <li>
          <Link to="/chips/1">Ottawa</Link>
        </li>
        <li>
          <Link to="/chips/2">Boston</Link>
        </li>
      </ul>
    </div>
  );
}

Home.propTypes = {};

export default Home;
