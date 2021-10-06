import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage } from 'gatsby-plugin-image'

export const query = graphql`
  query pageContent($id: String){
    sanityProject(id: {eq: $id}) {
      id
      title
      year
      description
      image {
        asset {
          gatsbyImageData(fit: FILLMAX, placeholder: BLURRED)
        }
      }
      skills {
        title
        slug {
          current
        }
      }
    }
  }
`;

const ProjectPage = (context) => (
  <Layout>
    <Seo title={`Project - ${context?.pageResources?.json?.data?.sanityProject?.title}`} />
    <h1>Project - {context?.pageResources?.json?.data?.sanityProject?.title}</h1>
    <h2>{context?.pageResources?.json?.data?.sanityProject?.year}</h2>
    <GatsbyImage image={context?.pageResources?.json?.data?.sanityProject?.image?.asset?.gatsbyImageData}/>
    <p>{context?.pageResources?.json?.data?.sanityProject?.description}</p>
  </Layout>
)

export default ProjectPage
