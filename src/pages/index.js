import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
//import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Animesh KC Blog" />
    <h1>Welcome to my blog</h1>
    <p>
      This blog will be focused on programming and personal development, often
      in combination with one another. I love to learn and introspect, so this
      blog is where I post personal findings of the technologies I've worked
      with, the projects I've build, the books I've read, and the patterns I've
      realized to learn and work more effectively.
    </p>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
