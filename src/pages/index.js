import React from 'react'
import { graphql, Link } from 'gatsby'

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import Layout from '../components/layout'
import SEO from '../components/seo'

import { css } from '@emotion/core'

const IndexPage = ({data}) => {
  const titles = data.allScrapboxPage.edges.map(edge => {
    return (
      <Grid item md={3} sm={12} alignItems="stretch">
        <Card>
          <CardContent css={css`
            height: 400px;
            position: relative
          `}          >
              <div key={edge.node.id} >
                <Link className="stretched-link" to={edge.node.title} css={css`text-decoration: none;`}>
                <div css={css`
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 3;
                  overflow: hidden;
                  `}>{edge.node.title}</div>
                </Link>
                <img src={edge.node.image} />
                <p>{edge.node.descriptions}</p>
              </div>
            
          </CardContent>
        </Card>
      </Grid>
    )
  })
    
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <Grid
        container
        direction="row"
        spacing={16}
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
