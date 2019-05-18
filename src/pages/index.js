import React from 'react'
import { graphql, Link } from 'gatsby'

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'

import Layout from '../components/layout'
import SEO from '../components/seo'

import { css } from '@emotion/core'

const IndexPage = ({ data }) => {
  const titles = data.allScrapboxPage.edges.map(edge => {
    return (
      <Grid key={`grid-${edge.node.id}`} item md={3} sm={12} alignItems="stretch">
        <Card>
          <CardContent css={css`
            height: 400px;
            position: relative
          `}>
            <div key={edge.node.id} >
              <Link className="stretched-link" to={`/${edge.node.title}`} css={css`text-decoration: none;`}>
                <div css={css`
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 3;
                  overflow: hidden;
                  `}>{edge.node.title}</div>
                {edge.node.image && <img src={edge.node.image} alt={edge.node.title} />}
              </Link>
            </div>
          </CardContent>
        </Card>
      </Grid>
    )
  })

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <Grid container direction="row" spacing={16}>
        {titles}
      </Grid>
      <Grid container direction="row" justify="center">
        <Grid item css={css`padding: 20px;`}>
          <Link to={`/page/2`}><Button variant="contained" color="primary">Next</Button></Link>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allScrapboxPage(limit: 12, sort: {fields: [pin, updated], order: [DESC, DESC]}, filter: {links: {nin: "Undisclosed"}}) {
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
