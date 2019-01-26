import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

export default ({ pageContext: { previousPage, nextPage }, data}) => {
  const pages = data.allScrapboxPage.edges
  return (
    <Layout>
      {pages.map(({node}) => {
        return (
          <div key={node.id}>
            <Link to={node.title}>{node.title}</Link>
          </div>
        )
      })}
      { previousPage ? <Link to={previousPage}>Prev.</Link> : ''}
      { nextPage ? <Link to={nextPage}>Next</Link> : ''}
    </Layout>


  )
}

export const query = graphql`
  query($skip: Int!, $limit: Int!){
    allScrapboxPage(limit: $limit, skip: $skip) {
      totalCount
      edges {
        node {
          title
          image
          lines {
            id
            text
          }
        }
      }
    }
  }
`