import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage } from 'gatsby-plugin-image'
import ProjectCard from "../components/projectCard"

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
    allSanityProject(filter: {skills: {elemMatch: {id: {eq: $id}}}}) {
      edges {
        node {
          id
          title
          slug {
            current
          }
          job {
            company
          }
          year
          image {
            asset {
              gatsbyImageData(fit: FILLMAX, placeholder: BLURRED)
            }
          }
        }
      }
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
    <div>
      <h3 style={{ marginTop: '1rem' }}>Projects Using {context?.pageResources?.json?.data?.sanitySkill?.title}</h3>
      <div style={{
      display: 'grid',
      alignItems: 'center',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))'
    }}>
      {context?.pageResources?.json?.data?.allSanityProject?.edges.map(project => {
        return <ProjectCard project={project.node} key={project.node.id}></ProjectCard>
      })}
    </div>
    </div>
  </Layout>
)

export default SkillPage
