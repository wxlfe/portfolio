import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from 'gatsby-plugin-image'

import './projectCard.sass'

const ProjectCard = ({ project }) => (
  <Link to={'/project/' + project?.slug?.current} className='card-link'>
    <div className='card'>
      <div className='card-label'>
        <h3 className='card-title'>{project?.title}</h3>
        {
          !!project?.job?.company
          ? (<h4 className='card-year'>{project?.year} at {project?.job?.company}</h4>)
          : (<h4 className='card-year'>{project?.year}</h4>)
        }
      </div>
      <GatsbyImage className='card-image' alt={`${project?.title} Image`} image={project?.image?.asset?.gatsbyImageData}/>
    </div>
  </Link>
)

export default ProjectCard
