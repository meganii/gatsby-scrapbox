import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

export default ({ pageContext: { id }, data}) => {

  console.dir(data)
  const tags = data.allPagesJson.edges.map(edge => {
    return (
      <div key={edge.node.id}>
        <Link to={`/${edge.node.title}`}>{edge.node.title}</Link>>
      </div>
    )
  });

  return (
    <Layout>
      <div>
        <h1>{id}</h1>
        {tags}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ($id: String) {
    allPagesJson(filter: {tags: {in: [$id]}}) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`