import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "components/Link";

function Breadcrumb({ crumbs }) {
  return (
    <StyledBreadcrumb>
      <ul>
        {crumbs.map((crumb, i) => {
          if (i === crumbs.length - 1) {
            return <li key={i}>{crumb.title}</li>;
          } else {
            return (
              <li key={i}>
                <Link to={crumb.url}>{crumb.title}</Link>
              </li>
            );
          }
        })}
      </ul>
    </StyledBreadcrumb>
  );
}

Breadcrumb.propTypes = {
  crumbs: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

const StyledBreadcrumb = styled.div`
  padding: 16px 16px;
  & > ul {
    list-style: none;
  }

  & > ul li {
    display: inline-block;
  }

  & > ul li:not(:last-child)::after {
    content: "/";
    padding: 0 10px;
  }
`;

export default Breadcrumb;
