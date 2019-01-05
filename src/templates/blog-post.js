import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
  const page = data.pagesJson
  const content = page.lines.map(line => {
    return (
      <p>{line}</p>
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

export const query = graphql`
  query($id: String!) {
    pagesJson(id: { eq: $id }) {
      title
      lines
    }
  }
`