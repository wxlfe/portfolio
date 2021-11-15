import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage } from 'gatsby-plugin-image'

export const query = graphql`
  query skillPageResources($id: String){
    sanitySkill(id: {eq: $id}){
        certifications
        description
        id
        skillIcon {
          asset {
            gatsbyImageData(fit: FILLMAX, placeholder: BLURRED)
          }
        }
        slug {
          current
        }
        title
    }
  }
`;

const SkillPage = (context) => (
  <Layout>
    <Seo title={`Skill - ${context?.pageResources?.json?.data?.sanitySkill?.title}`} />
    <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        marginBottom: '3rem',
    }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', backgroundColor: 'white', borderRadius: '1rem' }}>
            <GatsbyImage image={context?.pageResources?.json?.data?.sanitySkill?.skillIcon?.asset?.gatsbyImageData} alt={`${context?.pageResources?.json?.data?.sanitySkill?.title} Icon`} objectFit="contain" style={{ height: '6rem', width: '6rem' }}/>    
        </div>
        <div>
            <h1 style={{ margin: '1rem', borderBottom: '4px solid var(--accent)' }}>{context?.pageResources?.json?.data?.sanitySkill?.title}</h1>
        </div>
    </div>
    <p>{context?.pageResources?.json?.data?.sanitySkill?.description}</p>
  </Layout>
)

export default SkillPage
