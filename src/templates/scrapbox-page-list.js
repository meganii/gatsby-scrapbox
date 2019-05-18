import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'

import { css } from '@emotion/core'
import GridItemSbCard from "../components/gridItemSbCard";

export default ({ pageContext: { previousPage, nextPage }, data }) => {
  const pages = data.allScrapboxPage.edges
  return (
    <Layout>
      <Grid
        container
        direction="row"
        spacing={16}
        justifyContent="center"
      >
        <GridItemSbCard pages={pages} />
      </Grid>
      <Grid container direction="row" justify="center" spacing={16}>
        <Grid item css={css`padding: 20px;`}>
          {previousPage ? <Link to={`/${previousPage}`} css={css`margin-right: 10px;`}><Button variant="contained" color="primary">Prev.</Button></Link> : ''}
          {nextPage ? <Link to={`/${nextPage}`}><Button variant="contained" color="primary">Next</Button></Link> : ''}
        </Grid>
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  query($skip: Int!, $limit: Int!){
    allScrapboxPage(limit: $limit, skip: $skip, sort: {fields: [pin, updated], order: [DESC, DESC]}, filter: {links: {nin: "Undisclosed"}}) {
      totalCount
      edges {
        node {
          id
          title
          image
          descriptions
          lines {
            id
            text
          }
        }
      }
    }
  }
`
