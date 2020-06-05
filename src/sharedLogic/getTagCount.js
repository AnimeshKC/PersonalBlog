const getTagCount = allEdges => {
  const tagCount = {}

  for (const edge of allEdges) {
    const edgeTags = edge.node.frontmatter.tags
    if (edgeTags) {
      for (const tag of edgeTags) {
        tagCount[tag] = tagCount.hasOwnProperty(tag) ? tagCount[tag] + 1 : 1
      }
    }
  }
  return tagCount
}
exports.getTagCount = getTagCount
