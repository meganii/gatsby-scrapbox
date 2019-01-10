const axios = require('axios')
const crypto = require('crypto')

exports.sourceNodes = async (
  { boundActionCreators: { createNode }, createNodeId, createContentDigest },
  { plugins, ...options }
) => {
  const client = axios.create({
    baseURL: 'https://scrapbox.io/api/',
    headers: {
      Cookie: `connect.sid=${options.sid};`
    }
  })
  const {data} = await client.request({
    method: 'get',
    url: `/pages/${options.project_name}`,
  })

  data.pages.forEach(page => {
    createNode({
      ...page,
      id: createNodeId(`scrapbox-page-${page.id}`),
      parent: null,
      children: [],
      internal: {
        type: 'ScrapboxPage',
        content: JSON.stringify(page),
        contentDigest: crypto
          .createHash('md5')
          .update(JSON.stringify(page))
          .digest('hex')
      }
    })
  })
}