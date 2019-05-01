import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

import { css } from '@emotion/core'

export default ({ pageContext: { previousPage, nextPage }, data}) => {
  const pages = data.allScrapboxPage.edges
  const cards = pages.map(({node}) => {
    return (
      <Grid item md={3} sm={12} alignItems="stretch">
        <Card>
          <CardContent css={css`
            height: 400px;
            position: relative
          `}>
            <Link className="stretched-link" to={node.title}>
              <div key={node.id}>
                <div css={css`
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 3;
                  overflow: hidden;
                `}>
                  {node.title}
                </div>
              </div>
              </Link>
              <img src={node.image} />
              <p>{node.descriptions}</p>
          </CardContent>
        </Card>
      </Grid>
    )
  })
  return (
    <Layout>
      <Grid
        container
        direction="row"
        spacing={16}
        justifyContent="center"
      >
        {cards}
      </Grid>
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
