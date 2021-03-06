import React from "react"
import { Link } from "gatsby"
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { css } from '@emotion/core'

const GridItemSbCard = ({ pages }) => {
  return pages.map(({ node }) => {
    return (
      <Grid item md={3} sm={6} alignItems="stretch">
        <Card>
          <CardContent css={css`
            height: 13.5rem;
            position: relative;
          `}>
            <Link className="stretched-link" to={`/${node.title}`}>
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
            { node.image && <img src={node.image} alt={node.title} /> }
          </CardContent>
        </Card>
      </Grid>
    )
  })
}

export default GridItemSbCard