import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ pageContext: { id }, data}) => {

  const content = (lines) => {
    let content = ''
    lines.forEach(line => {
      content = content + `<p>${replaceTags(line.text)}</p>`
    })
    return content
  }

  const replaceTags = (line) => {
    let html = line.replace(/#([^\s$]*)/g, '<a href="/$1">$1</a>')
    html = html.replace(/\[(https:\/\/.+?\.(jpg|jpeg|png)|https:\/\/gyazo\.com.+?)\s*(https:\/\/.+?)?\]/, '<img src="$1" />')
    html = html.replace(/\[(.+?)\]/g, '<a href="/$1">$1</a>')
    return html
  }

  return (
    <Layout>
      <div>
        <h1>{data.scrapboxPage.title}</h1>
        <p>{data.scrapboxPage.descriptions}</p>
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