import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'

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
      <Grid container direction="row" justify="center" spacing={12}>
        <Grid item css={css`padding: 20px;`}>
          { previousPage ? <Link to={previousPage} css={css`margin-right: 10px;`}><Button variant="contained" color="primary">Prev.</Button></Link> : ''}
          { nextPage ? <Link to={nextPage}><Button variant="contained" color="primary">Next</Button></Link> : ''}
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
