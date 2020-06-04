import { Link } from "gatsby"
import React from "react"
import "./layout.css"
import "./components.css"
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
                <span className="dateDisplay"></span>
                {node.frontmatter.updated ? (
                  <span className="dateDisplay">
                    {" "}
                    (updated {node.frontmatter.updated} )
                  </span>
                ) : (
                  ""
                )}
              </h3>
              <p>{node.excerpt}</p>
              {node.frontmatter.tags ? (
                <ul className="post-tags">
                  {node.frontmatter.tags.map(tag => (
                    <li key={tag}>
                      <Link to={`/tag/${tag.replace(/ /g, "_")}`}>
                        <button className="tagButton">{tag}</button>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          )
        })}
      </>
    )
  }
  return <> </>
}

export default PostDisplay
