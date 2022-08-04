import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { GatsbyImage } from 'gatsby-plugin-image'
import SkillPill from "../components/skillPill"

export const query = graphql`
  query pageContent($id: String){
    sanityProject(id: {eq: $id}) {
      id
      title
      year
      link
      job {
        company
        slug {
          current
        }
      }
      description
      image {
        asset {
          gatsbyImageData(fit: FILLMAX, placeholder: BLURRED)
        }
      }
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

const ProjectPage = (context) => (
  <Layout>
    <Seo title={`Project - ${context?.pageResources?.json?.data?.sanityProject?.title}`} />
    <h1>Project - {context?.pageResources?.json?.data?.sanityProject?.title}</h1>
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
      {!!context?.pageResources?.json?.data?.sanityProject?.job 
        ? <h2>{context?.pageResources?.json?.data?.sanityProject?.year} at <Link to={`/job/${context?.pageResources?.json?.data?.sanityProject?.job?.slug?.current}`} style={{ color: 'var(--foreground)', textDecorationColor: 'var(--accent)' }}>{context?.pageResources?.json?.data?.sanityProject?.job?.company}</Link></h2> 
        : <h2>{context?.pageResources?.json?.data?.sanityProject?.year}</h2>}
      <a href={context?.pageResources?.json?.data?.sanityProject?.link}>Check it out here {`\u2192`}</a>
    </div>
    <div style={{display: 'flex', flexDirection: 'row', overflowX: 'scroll'}}>
      {context?.pageResources?.json?.data?.sanityProject?.skills.map(skill => {
        return <SkillPill skill={skill}/>
      })}
    </div>
    <GatsbyImage image={context?.pageResources?.json?.data?.sanityProject?.image?.asset?.gatsbyImageData} alt={`${context?.pageResources?.json?.data?.sanityProject?.title} Main Image`}/>
    <p>{context?.pageResources?.json?.data?.sanityProject?.description}</p>
  </Layout>
)

export default ProjectPage
