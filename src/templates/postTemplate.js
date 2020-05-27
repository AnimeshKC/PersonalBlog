import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"

//use of dangerouslySetInnerHTML is fine in this instance since it doesn't rely on user input
const PostTemplate = ({ data: post }) => (
  <Layout>
    <div>
      <h1>{post.markdownRemark.frontmatter.title} </h1>
      <div dangerouslySetInnerHTML={{ __html: post.markdownRemark.html }} />
    </div>
  </Layout>
)

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
export default PostTemplate
