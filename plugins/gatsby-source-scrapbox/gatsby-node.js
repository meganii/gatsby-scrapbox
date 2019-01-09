const axios = require('axios');

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions

  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins
  // Convert the options object into a query string
  // const apiOptions = queryString.stringify(configOptions)
  // Join apiOptions with the Pixabay API URL
  const apiUrl = `https://scrapbox.io/api/pages/${configOptions.project_name}`

  // Helper function that processes a photo to match Gatsby's node structure
  const processPage = (page) => {
    const nodeId = createNodeId(`scrapbox-page-${page.id}`)
    const nodeContent = JSON.stringify(page)
    const nodeData = Object.assign({}, page, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `ScrapboxPage`,
        content: nodeContent,
        contentDigest: createContentDigest(nodeContent),
      },
    })

    return nodeData
  }

  // Gatsby expects sourceNodes to return a promise
  try {
    const response = await axios.get(apiUrl, {headers: {
      Cookie: `connect.sid=${configOptions.sid};`
    }})
    // console.log(response.data);
    response.data.pages.forEach(page => {
      const nodeData = processPage(page)
      return createNode(nodeData)
    })
  } catch (error) {
    console.log(error);
  }
}