const axios = require('axios')
const crypto = require('crypto')
const Promise = require('bluebird')

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

  const results = await Promise.map(data.pages, async (page) => {
    const {data} = await client.request({
      method: 'get',
      url: `/pages/${options.project_name}/${encodeURIComponent(page.title)}/`,
    })
    return data
  }, { concurrency: 5 })

  results.forEach(page => {
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