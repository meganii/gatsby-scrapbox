import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Chip from '@material-ui/core/Chip'
import { css } from '@emotion/core'

export default ({ pageContext: { id }, data}) => {

  const sbLine = (line) => {
    const m = line.text.match(/^[\s|\t| ].*/) || []
    if (m.length > 0) {
      const spaces = m[0].match(/[\s|\t]*/).length
      return `<div class="line"><span style="display: list-item;margin-left: ${ spaces * 1}rem;">${replaceTags(line.text)}</span></div>`
    } else {
      return `<div class="line"><p>${replaceTags(line.text)}</p></div>`
    }
  }

  const content = (lines) => {
    const regexp = /=====/
    let content = ''
    for (let line of lines) {
      if (regexp.test(line.text)) { break }
      content = content + sbLine(line)
    }
    return content
  }

  const replaceTags = (line) => {
    let html = line.replace(/#([^\s$]*)/g, '<a href="/$1">$1</a>')
    html = line.replace(/^[\s|\t]+?/, '')
    html = html.replace(/\[(https:\/\/.+?\.(jpg|jpeg|png)|https:\/\/gyazo\.com.+?)\s*(https:\/\/.+?)?\]/, '<img src="$1" />')
    html = html.replace(/\[(.+?)\]/g, '<a href="/$1">$1</a>')
    return html
  }

  const links = data.scrapboxPage.links.map(link => {
    return (<Link to={link}><Chip label={link} /></Link>)
  })

  return (
    <Layout>
      <div>
        <h1>{data.scrapboxPage.title || 'title'}</h1>
        <div>{data.scrapboxPage.descriptions}</div>
        <div dangerouslySetInnerHTML={{ __html: content(data.scrapboxPage.lines)}} />
        <hr />
        <div css={css`padding: 1em 0 2em 0;`}>{links}</div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($id: String){
    scrapboxPage(id: {eq: $id}){
      id
      title
      links
      lines {
        text
      }
    }
  }
`