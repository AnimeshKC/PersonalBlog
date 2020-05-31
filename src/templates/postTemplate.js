import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import { DiscussionEmbed } from "disqus-react"
//use of dangerouslySetInnerHTML is fine in this instance since it doesn't rely on user input
const PostTemplate = ({ data: post }, pageContext) => {
  const baseUrl = "https://blog.animeshkc.me/"
  const disqusShortname = "https-blog-animeshkc-me"
  const disqusConfig = {
    identifier: post.markdownRemark.id,
    title: post.markdownRemark.frontmatter.title,
    url: baseUrl + pageContext.slug,
  }
  return (
    <Layout>
      <div>
        <h1>{post.markdownRemark.frontmatter.title} </h1>
        <h6>
          Last updated -{" "}
          {post.markdownRemark.frontmatter.updated ||
            post.markdownRemark.frontmatter.date}
        </h6>
        <div dangerouslySetInnerHTML={{ __html: post.markdownRemark.html }} />
      </div>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM Do, YYYY")
        updated(formatString: "MMMM Do, YYYY")
      }
    }
  }
`
export default PostTemplate
