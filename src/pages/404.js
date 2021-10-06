import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />
    <h1>404</h1>
    <p>Looks like that page doesn't exist. Try one of the pages in the navigation bar at the top.</p>
  </Layout>
)

export default NotFoundPage
