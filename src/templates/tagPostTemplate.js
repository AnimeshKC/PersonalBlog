import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import PostDisplay from "../components/postDisplay"
import SEO from "../components/seo"

const tagPosts = ({ data, pageContext }) => {
  const { tag } = pageContext
  const { totalCount } = data.allMarkdownRemark
  const pageHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  return (
    <Layout>
      <SEO title="Animesh KC Blog" />
      <div>
        <h1> {pageHeader}</h1>
        <PostDisplay postsArray={data.allMarkdownRemark.edges} />
      </div>
    </Layout>
  )
}

export const tagQuery = graphql`
  query($tag: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM Do YYYY")
            tags
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`

export default tagPosts
