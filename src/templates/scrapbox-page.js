import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

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

  return (
    <Layout>
      <div>
        <h1>{data.scrapboxPage.title || 'title'}</h1>
        <div>{data.scrapboxPage.descriptions}</div>
        <div dangerouslySetInnerHTML={{ __html: content(data.scrapboxPage.lines)}} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($id: String){
    scrapboxPage(id: {eq: $id}){
      id
      title
      lines {
        text
      }
    }
  }
`