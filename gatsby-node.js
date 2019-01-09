/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it



const path = require("path")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const scrapboxPageTemplate = path.resolve(`src/templates/scrapbox-page.js`)

  return graphql(`
    {
      allScrapboxPage {
        edges {
          node {
            id
            title
            descriptions
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allScrapboxPage.edges.forEach(({ node }) => {
      createPage({
        path: node.title,
        component: scrapboxPageTemplate,
        context: {
          id: node.id
        }, // additional data can be passed via context
      })
    })
  })
}