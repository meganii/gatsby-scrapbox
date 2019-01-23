import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

const IndexPage = ({data}) => {
  console.log(data)
  
  const titles = data.allScrapboxPage.edges.map(edge => {
    return (
      <div>
        <h1>{edge.node.title}</h1>
        <img src={edge.node.image} />
      </div>
    )
  })
    
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      {titles}
    </Layout>
)}

export default IndexPage

export const query = graphql`
  query {
    allScrapboxPage {
      edges {
        node {
          id
          title
          image
          descriptions
        }
      }
    }
  }
`
