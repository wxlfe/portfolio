import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from 'gatsby-plugin-image'

const ProjectCard = ({ project }) => (
  <Link to={'/project/' + project?.slug?.current} style={{
    textDecoration: 'none'
  }}>
    <div style={{
      borderRadius: '8px',
      padding: '1rem',
      margin: '1rem',
      boxShadow: '0rem 0rem 0rem 0.1rem var(--foreground)'
    }}>
      <h3 style={{
        color: 'var(--foreground)',
        textDecoration: 'none',
        marginBottom: '0',
        textAlign: 'center'
      }}>{project?.title}</h3>
      <h4 style={{
        color: 'var(--foreground)',
        textAlign: 'center'
      }}>{project?.year}</h4>
      <GatsbyImage alt={`${project?.title} Image`} image={project?.image?.asset?.gatsbyImageData}/>
    </div>
  </Link>
)

export default ProjectCard
