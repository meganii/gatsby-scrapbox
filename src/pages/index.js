import React from 'react'
import { graphql, Link } from 'gatsby'

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = ({data}) => {
  const titles = data.allScrapboxPage.edges.map(edge => {
    return (
      <Card>
        <CardContent>
          <Link to={edge.node.title}><h1>{edge.node.title}</h1></Link>
          <img src={edge.node.image} />
          <p>{edge.node.descriptions}</p>
        </CardContent>
      </Card>
    )
  })
    
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        {titles}
      </Grid>
      <Link to={`page/2`}>Next</Link>
    </Layout>
)}

export default IndexPage

export const query = graphql`
  query {
    allScrapboxPage(limit: 12) {
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
