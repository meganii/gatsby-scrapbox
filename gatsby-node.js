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
  const tagslinksTemplate = path.resolve(`src/templates/tagslinks.js`)


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
            tags
            links
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    let tags = new Set();
    result.data.allPagesJson.edges.map(({node}) => {
      node.tags.map(tag => tags.add(tag))
    })
    Array.from(tags).forEach(tag => {
      createPage({
        path: tag,
        component: tagslinksTemplate,
        context: {
          id: tag
        }
      })
    })

    let links = new Set();
    result.data.allPagesJson.edges.map(({node}) => {
      node.links.map(link => links.add(link))
    })
    Array.from(links).forEach(link => {
      createPage({
        path: link,
        component: tagslinksTemplate,
        context: {
          id: link
        }
      })
    })

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