import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Chip from '@material-ui/core/Chip'
import { css } from '@emotion/core'
import Grid from '@material-ui/core/Grid';
import GridItemRelatedLink from "../components/gridItemRelatedLink"

export default ({ pageContext: { id }, data }) => {

  const sbLine = (line) => {
    const m = line.text.match(/^[\s|\t| ].*/) || []
    if (m.length > 0) {
      const spaces = m[0].match(/[\s|\t]*/).length
      return `<div class="line"><span style="display: list-item;margin-left: ${spaces * 1}rem;">${replaceTags(line.text)}</span></div>`
    } else {
      return `<div class="line"><p>${replaceTags(line.text)}</p></div>`
    }
  }

  const content = (lines) => {
    const regexp = /=====/
    let content = ''
    for (let line of lines) {
      if (regexp.test(line.text)) { break }
      content = content + sbLine(line)
    }
    return content
  }

  const replaceTags = (line) => {
    let html = line.replace(/#([^\s$]*)/g, '<a href="/$1">$1</a>')
    html = line.replace(/^[\s|\t]+?/, '')
    html = html.replace(/\[(https:\/\/gyazo\.com.+?)\]/, '<img src="$1/raw" />')
    html = html.replace(/\[(https:\/\/.+?\.(jpg|jpeg|png))\s*(https:\/\/.+?)?\]/, '<img src="$1" />')
    html = html.replace(/\[(.+?)\]/g, '<a href="/$1">$1</a>')
    return html
  }

  const links = data.scrapboxPage.links.map((link, index) => {
    return (<Link key={`chip-${index}`} to={`/${link}`}><Chip label={link} /></Link>)
  })

  const links1hop = data.scrapboxPage.relatedPages.links1hop || []
  const links1hopPages = links1hop.filter((l) => {
    let localLinks = l.linksLc || []
    return !localLinks.includes('undisclosed')
  })

  const links2hop = data.scrapboxPage.relatedPages.links2hop || []
  const links2hopPages = links2hop.filter((l) => {
    let localLinks = l.linksLc || []
    return !localLinks.includes('undisclosed')
  }).slice(0, 8)

  return (
    <Layout>
      <div>
        <h1>{data.scrapboxPage.title || 'title'}</h1>
        <div>{data.scrapboxPage.descriptions}</div>
        <div dangerouslySetInnerHTML={{ __html: content(data.scrapboxPage.lines) }} />
        <hr />
        <div css={css`padding: 1em 0 2em 0;`}>{links}</div>
        <Grid container direction="row" spacing={16}>
          <GridItemRelatedLink links={links1hopPages} />
        </Grid>
        <Grid container direction="row" spacing={16}>
          <GridItemRelatedLink links={links2hopPages} />
        </Grid>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($id: String){
    scrapboxPage(id: {eq: $id}){
      id
      title
      links
      lines {
        text
      }
      relatedPages {
        links1hop {
          id
          title
          image
          descriptions
          linksLc
        }
        links2hop {
          id
          title
          image
          descriptions
          linksLc
        }
      }
    }
  }
`
