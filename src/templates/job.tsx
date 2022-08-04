import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage } from 'gatsby-plugin-image'

import SkillPill from "../components/skillPill"

export const query = graphql`
  query pageResources($id: String){
    sanityJob(id: {eq: $id}){
      id
      title
      company
      companyLogo {
        asset {
          gatsbyImageData(fit: SCALE, placeholder: BLURRED)
        }
      }
      description {
        _rawChildren
      }
      startDate
      endDate
      skills {
        title
        skillIcon {
          asset {
            gatsbyImageData(fit: FILLMAX, placeholder: BLURRED)
          }
        }
        slug {
          current
        }
      }
    }
  }
`;

const JobPage = (context) => (
  <Layout>
    <Seo title={`${context?.pageResources?.json?.data?.sanityJob?.title} at ${context?.pageResources?.json?.data?.sanityJob?.company}`} />
    <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
    }}>
      {!!context?.pageResources?.json?.data?.sanityJob?.companyLogo?.asset?.gatsbyImageData
       ? <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', padding: '1rem', backgroundColor: 'white', borderRadius: '1rem' }}>
            <GatsbyImage image={context?.pageResources?.json?.data?.sanityJob?.companyLogo.asset.gatsbyImageData} alt={context?.pageResources?.json?.data?.sanityJob?.company} objectFit="scale-down" style={{ maxHeight: '6rem', maxWidth: '6rem' }}/>    
          </div>
       : null}
        <div>
            <h1 style={{ margin: '1rem', borderBottom: '4px solid var(--accent)' }}>{context?.pageResources?.json?.data?.sanityJob?.title}</h1>
            <h5 style={{ margin: '1rem' }}>{context?.pageResources?.json?.data?.sanityJob?.startDate} - {context?.pageResources?.json?.data?.sanityJob?.endDate}</h5>
        </div>
    </div>
    <div style={{display: 'flex', flexDirection: 'row', overflowX: 'scroll'}}>
      {context?.pageResources?.json?.data?.sanityJob?.skills.map(skill => {
        return <SkillPill skill={skill}/>
      })}
    </div>
    <p>{context?.pageResources?.json?.data?.sanityJob?.description[0]?._rawChildren[0]?.text}</p>
  </Layout>
)

export default JobPage
