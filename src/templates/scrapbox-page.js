import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ pageContext: { id }, data}) => {

  return (
    <Layout>
      <div>
        <h1>{data.scrapboxPage.title}</h1>
        <p>{data.scrapboxPage.descriptions}</p>
        <div dangerouslySetInnerHTML={{ __html: data.scrapboxPage.text}} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($id: String){
    scrapboxPage(id: {eq: $id}){
      id
      title
    }
  }
`