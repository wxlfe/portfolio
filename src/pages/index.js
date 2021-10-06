import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage } from "gatsby-plugin-image";

export const query = graphql`
{
  sanityHomePage {
    title
    subtitle
    profilePhoto {
      asset {
        gatsbyImageData(fit: FILLMAX, placeholder: BLURRED)
      }
    }
  }
}
`;

const IndexPage = ({ data }) => (
  <Layout>
    <Seo title="Home" />
    <div style={{
      display: 'grid',
      alignItems: 'center',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))'
    }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', textAlign: 'center', padding: '1rem' }}>
        <GatsbyImage image={ data?.sanityHomePage?.profilePhoto?.asset?.gatsbyImageData } alt='Profile Photo' objectFit="scale-down" style={{ maxHeight: '6rem', maxWidth: '6rem' }}/>
      </div>
      <div style={{ textAlign: 'center' }}>
        <h1>{ data.sanityHomePage.title }</h1>
        <h3>{ data.sanityHomePage.subtitle }</h3>
      </div>
    </div>
  </Layout>
)

export default IndexPage
