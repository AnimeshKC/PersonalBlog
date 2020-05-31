import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
//import Image from "../components/image"
import SEO from "../components/seo"

export default ({ data, pageContext }) => {
  const { currentPage, isLastPage, totalPages } = pageContext
  const nextPage = `/blog/${String(currentPage + 1)}`
  const prevPage = currentPage - 1 === 1 ? `/` : `/${String(currentPage - 1)}`
  return (
    <Layout>
      <SEO title="Animesh KC Blog" />
      <div>
        <h1> Page {currentPage}</h1>
        <h4>{data.allMarkdownRemark.totalCount} Posts </h4>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <h3>
              <Link to={`/posts${node.fields.slug}`}>
                {node.frontmatter.title}
              </Link>
              <span>- {node.frontmatter.date}</span>
              <span>
                {node.frontmatter.updated
                  ? ` (updated  ${node.frontmatter.updated})`
                  : ""}
              </span>
            </h3>
            <p>{node.excerpt}</p>
          </div>
        ))}

        {/*Pagination Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            maxWidth: 300,
            margin: "0 auto",
          }}
        >
          <Link to={prevPage} rel="prev">
            Prev Page
          </Link>

          {Array.from({ length: totalPages }, (_, index) => (
            <Link key={index} to={`/${index === 0 ? "" : index + 1}`}>
              {index + 1}
            </Link>
          ))}
          {!isLastPage && (
            <Link to={nextPage} rel="next">
              Next Page
            </Link>
          )}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: { frontmatter: { priority: { ne: "High" } } }
      skip: $skip
      limit: $limit
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          id
          frontmatter {
            title
            date(formatString: "MMMM Do, YYYY")
            updated(formatString: "MMMM Do, YYYY")
          }
          excerpt(pruneLength: 300)
        }
      }
    }
  }
`
