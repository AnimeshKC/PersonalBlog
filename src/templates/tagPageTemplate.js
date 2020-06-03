import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../components/components.css"
const tagsPage = ({ pageContext }) => {
  const { tagList, tagCount } = pageContext
  return (
    <Layout pageTitle="All tags">
      <SEO title="All tags" keywords={["tags", "topics"]} />
      <h1>All Tags</h1>
      <div className="tagContainer">
        {tagList.map(tag => (
          <button className="tagButton">
            {tag} : {tagCount[tag]}
          </button>
        ))}
      </div>
    </Layout>
  )
}

export default tagsPage
