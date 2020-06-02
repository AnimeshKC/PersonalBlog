/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require("path")

const { createFilePath } = require("gatsby-source-filesystem")
const PostTemplate = path.resolve("./src/templates/postTemplate.js")
const BlogTemplate = path.resolve("./src/templates/blogTemplate.js")

const { postsPerPage } = require("./src/constants/postsPerPage.js")
// You can delete this file if you're not using it
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode, basePath: "posts" })
    createNodeField({
      node,
      name: "slug",
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            fields {
              slug
            }
            id
            frontmatter {
              tags
            }
          }
        }
      }
    }
  `)

  const posts = result.data.allMarkdownRemark.edges
  posts.forEach(({ node: post }) => {
    createPage({
      path: `posts${post.fields.slug}`,
      component: PostTemplate,
      context: {
        slug: post.fields.slug,
      },
    })
  })

  //generate an object containing all tags and their frequency
  let tagCount = {}

  for (const edge of result.data.allMarkdownRemark.edges) {
    const edgeTags = edge.node.frontmatter.tags
    if (edgeTags) {
      for (const tag of edgeTags) {
        tagCount[tag] = tagCount.hasOwnProperty(tag) ? tagCount[tag] + 1 : 1
      }
    }
  }

  /*
Example result: 
{
  Machine Learning: 1,
  Personal Development: 1,
  Programming: 2,
  Web Dev: 1
}
  */

  //query for all high priority posts
  const featured = await graphql(`
    {
      allMarkdownRemark(filter: { frontmatter: { priority: { eq: "High" } } }) {
        totalCount
      }
    }
  `)
  const featuredLength = featured.data.allMarkdownRemark.totalCount
  const mainPageRemainder = postsPerPage - featuredLength
  //extraSkip is the number of non-featured articles to skip past the first page
  const extraSkip = mainPageRemainder >= 0 ? mainPageRemainder : 0
  const totalPages = Math.ceil(posts.length / postsPerPage)
  //Make an array for pages after the first page, i.e. with length totalPages - 1

  Array.from({ length: totalPages - 1 }).forEach((_, index) => {
    const currentPage = index + 2 //0th index represents the second page
    createPage({
      path: `/${currentPage}`,
      component: BlogTemplate,
      context: {
        limit: postsPerPage,
        skip: extraSkip + index * postsPerPage,
        currentPage,
        totalPages,
      },
    })
  })
}
