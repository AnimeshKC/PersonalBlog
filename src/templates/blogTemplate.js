import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
//import Image from "../components/image"
import SEO from "../components/seo"

import PostDisplay from "../components/postDisplay"
import PaginationLinks from "../components/paginationLinks"
export default ({ data, pageContext }) => {
  const { currentPage, totalPages } = pageContext
  return (
    <Layout>
      <SEO title="Animesh KC Blog" />
      <div>
        <h1> Page {currentPage}</h1>
        <PostDisplay postsArray={data.allMarkdownRemark.edges} />

        {/*Pagination Links */}
        <PaginationLinks totalPages={totalPages} currentPage={currentPage} />
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
            tags
          }
          excerpt(pruneLength: 300)
        }
      }
    }
  }
`
