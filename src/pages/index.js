import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
//import Image from "../components/image"
import PostDisplay from "../components/postDisplay"
import SEO from "../components/seo"
import { postsPerPage } from "../constants/postsPerPage"
import PaginationLinks from "../components/paginationLinks"

export const query = graphql`
  query {
    priorityPosts: allMarkdownRemark(
      filter: { frontmatter: { priority: { eq: "High" } } }
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
    additionalPosts: allMarkdownRemark(
      filter: { frontmatter: { priority: { ne: "High" } } }
      limit: 10
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
    allPosts: allMarkdownRemark {
      totalCount
    }
  }
`

const IndexPage = ({ data }) => {
  const totalPosts = data.allPosts.totalCount
  const numPriorityPosts = data.priorityPosts.totalCount
  const numAdditionalPosts =
    postsPerPage > numPriorityPosts ? postsPerPage - numPriorityPosts : 0

  const priorityPosts = data.priorityPosts.edges
  const additionalPosts = data.additionalPosts.edges.slice(
    0,
    numAdditionalPosts
  )

  const currentPage = 1
  const totalPages = Math.ceil(totalPosts / postsPerPage)
  return (
    <Layout>
      <SEO title="Animesh KC Blog" />
      <h4>{totalPosts} Posts</h4>
      <h2> Featured Posts</h2>
      <PostDisplay postsArray={priorityPosts} />
      {additionalPosts.length ? (
        <>
          <h2> Additional Posts</h2>
          <PostDisplay postsArray={additionalPosts} />
        </>
      ) : (
        ""
      )}
      <PaginationLinks totalPages={totalPages} currentPage={currentPage} />
    </Layout>
  )
}

export default IndexPage
