import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import mainImage from "../images/ProfileImage.png"
const Header = ({ siteTitle }) => (
  <header
    style={{
      background: "#03fcfc",
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <span style={{ display: "flex", alignItems: "center" }}>
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: "#454545",
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
        <img
          src={mainImage}
          alt="Profile"
          style={{
            borderRadius: "50%",
            margin: "0 5px",
            width: "100px",
          }}
        />
      </span>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
