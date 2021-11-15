import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import ProjectCard from "../components/projectCard"

export const query = graphql`
{
  allSanityProject {
    edges {
      node {
        title
        year
        description
        slug {
          current
        }
        job {
          company
        }
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

const ProjectsPage = ({data}) => (
  <Layout>
    <Seo title="My Work" />
    <h1>My Work</h1>
    <div style={{
      display: 'grid',
      alignItems: 'center',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))'
    }}>
      {data?.allSanityProject?.edges?.map(({ node: project }) => {
            return(<ProjectCard key={project.slug.current} project={project}></ProjectCard>);
      })}
    </div>
  </Layout>
)

export default ProjectsPage
