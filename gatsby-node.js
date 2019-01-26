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

    const pages = result.data.allScrapboxPage.edges
    pages.forEach(({ node }) => {
      createPage({
        path: node.title,
        component: scrapboxPageTemplate,
        context: {
          id: node.id
        }, // additional data can be passed via context
      })
    })

    // Create list pages
    const postsPerPage = 10
    const numPages = Math.ceil(pages.length / postsPerPage)
    Array.from({ length: numPages }).forEach( (_, i) => {
      createPage({
        path: i === 0 ? `page` : `page/${ i + 1 }`,
        component: path.resolve("./src/templates/scrapbox-page-list.js"),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          previousPage: i === 1 ? `` : `page/${ i }`,
          nextPage: i === pages.length ? `` : `page/${ i + 2 }`,
        },
      })
    })
  })
}