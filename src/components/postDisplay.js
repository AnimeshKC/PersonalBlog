import { Link } from "gatsby"
import React from "react"

function PostDisplay(props) {
  if (props.postsArray.length) {
    return (
      <>
        {props.postsArray.map(({ node }) => {
          return (
            <div key={node.id}>
              <h3>
                <Link to={`/posts${node.fields.slug}`}>
                  {node.frontmatter.title}
                </Link>
                <span className="dateDisplay">- {node.frontmatter.date}</span>
              </h3>
              <p>{node.excerpt}</p>
            </div>
          )
        })}
      </>
    )
  }
  return <> </>
}

export default PostDisplay
