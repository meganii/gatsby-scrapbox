import React from 'react'
import { graphql, Link } from 'gatsby'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'

import GridItemSbCard from "../components/gridItemSbCard";

import Layout from '../components/layout'
import SEO from '../components/seo'

import { css } from '@emotion/core'

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <Grid container direction="row" spacing={16}>
        {titles}
        <GridItemSbCard pages={data.allScrapboxPage.edges} />
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
