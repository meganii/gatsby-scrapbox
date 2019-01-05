import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
  data.allPagesJson.edges.map(node => {
    console.log(node.node)
  })
  const titles = data.allPagesJson.edges.map((edge) => {
    return (
      <div key={edge.node.id}>
       <Link to={edge.node.title}>{edge.node.title}</Link>
      </div>
    )
  })


  return (
    <Layout>
      <div>Hello world</div>
      {titles}
    </Layout>
  )
}

export const query = graphql`
  query {
    allPagesJson {
      edges {
        node {
          id
          title
          created
          updated
          lines
        }
      }
    }
  }  
`