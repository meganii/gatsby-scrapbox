import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ pageContext: { id }, data}) => {

  const content = (lines) => {
    let content = ''
    lines.forEach(line => {
      content = content + line.text
    })
    return content
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