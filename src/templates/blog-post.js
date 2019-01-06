import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
  const page = data.pagesJson
  const content = page.lines.map((line, index) => {
    return (
      <div key ={index}
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: replaceTags(line)}}  
      />
    )
  })

  return (
    <Layout>
      <div>
        <h1>{page.title}</h1>
        {content}
      </div>
    </Layout>
  )
}

const replaceTags = (line) => {
  let html = line.replace(/#([^\s$]*)/g, '<a href="/$1">$1</a>')
  html = html.replace(/\[(https:\/\/.+?\.(jpg|jpeg|png)|https:\/\/gyazo\.com.+?)\s*(https:\/\/.+?)?\]/, '<img src="$1" />')
  html = html.replace(/\[(.+?)\]/g, '<a href="/$1">$1</a>')
  return html
}

export const query = graphql`
  query($id: String!) {
    pagesJson(id: { eq: $id }) {
      title
      lines
    }
  }
`