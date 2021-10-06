import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

import SkillPill from "../components/skillPill"

export const query = graphql`
{
  allSanitySkill {
    edges {
      node {
        title
        slug {
          current
        }
        id
        description
        skillIcon {
          asset {
            gatsbyImageData(fit: FILLMAX, placeholder: BLURRED)
          }
        }
      }
    }
  }
}
`;

const SkillsPage = ({ data }) => (
  <Layout>
    <Seo title="Skills" />
    <div style={{
      display: 'grid',
      alignItems: 'center',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))'
    }}>
      {data.allSanitySkill.edges.map(({ node: skill }) => (
        <SkillPill skill={skill}/>
      ))}
    </div>
  </Layout>
)

export default SkillsPage
