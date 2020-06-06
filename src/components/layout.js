/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const getSiteMetaData = graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          author
        }
      }
    }
  `

  const data = useStaticQuery(getSiteMetaData)

  return (
    <div className="site">
      <Header siteTitle={data.site.siteMetadata.title} />
      <main>{children}</main>
      <footer>
        <div className="footerContainer">
          <div className="footerButtonContainer">Links and Source Code</div>
          <div className="footerAbout">
            <h2>About Animesh</h2>
            <p>
              I'm a software engineering student fascinated with learning about
              technology and personal development.{" "}
            </p>
          </div>
        </div>
        © {new Date().getFullYear()}, {data.site.siteMetadata.author}
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
