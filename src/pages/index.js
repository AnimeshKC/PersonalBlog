import React from "react"
import { Link, StaticQuery } from "gatsby"

import Layout from "../components/layout"
//import Image from "../components/image"
import SEO from "../components/seo"

const getMarkdownPosts = graphql`
  {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date
          }
          excerpt
        }
      }
    }
  }
`
const IndexPage = () => (
  <Layout>
    <SEO title="Animesh KC Blog" />
    <h1>Welcome to my blog</h1>
    <div>
      <p>
        This blog will be focused on programming and personal development, often
        in combination with one another. I love to learn and introspect, so this
        blog is where I post personal findings of the technologies I've worked
        with, the projects I've built, the books I've read, and the patterns
        I've realized to learn and work more effectively.
      </p>
    </div>
    <StaticQuery
      query={getMarkdownPosts}
      render={data => (
        <>
          <h4> {data.allMarkdownRemark.totalCount} Posts</h4>
          {data.allMarkdownRemark.edges.map(({ node }) => {
            return (
              <div key={node.id}>
                <h3>
                  {node.frontmatter.title}
                  <span className="dateDisplay">- {node.frontmatter.date}</span>
                </h3>
              </div>
            )
          })}
        </>
      )}
    />
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
