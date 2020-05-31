import { Link } from "gatsby"
import React from "react"

function PaginationLinks(props) {
  const totalPages = props.totalPages
  const currentPage = props.currentPage
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        maxWidth: 300,
        margin: "0 auto",
      }}
    >
      {currentPage > 1 ? (
        <Link to={`/${String(currentPage - 1)}`} rel="prev">
          Prev Page
        </Link>
      ) : (
        ""
      )}
      {Array.from({ length: totalPages }, (_, index) => (
        <Link key={index} to={`/${index === 0 ? "" : index + 1}`}>
          {index + 1}
        </Link>
      ))}
      {currentPage < totalPages ? (
        <Link to={`/${String(currentPage + 1)}`} rel="next">
          > Next Page
        </Link>
      ) : (
        ""
      )}
    </div>
  )
}

export default PaginationLinks
