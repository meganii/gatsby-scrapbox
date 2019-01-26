import React from 'react'
import { graphql, Link } from 'gatsby'

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

const IndexPage = ({data}) => {
  console.log(data)
  
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
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        {titles}
      </Grid>
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
