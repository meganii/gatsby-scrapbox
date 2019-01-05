/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it



const path = require("path")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)

  return graphql(`
    {
      allPagesJson {
        edges {
          node {
            id
            title
            created
            updated
            lines
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allPagesJson.edges.forEach(({ node }) => {
      createPage({
        path: node.title,
        component: blogPostTemplate,
        context: {
          id: node.id
        }, // additional data can be passed via context
      })
    })
  })
}