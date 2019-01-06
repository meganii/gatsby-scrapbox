import React from "react"
import Layout from "../components/layout"

export default ({ pageContext: { id }} ) => {
  return (
    <Layout>
      <div>
        <h1>{id}</h1>
      </div>
    </Layout>
  )
}