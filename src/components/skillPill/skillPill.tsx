import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from 'gatsby-plugin-image'

import './skillPill.sass'

const SkillPill = ({ skill }) => (
  <Link to={`/skill/${skill?.slug?.current}`} className='pill-link'>
    <div className='pill'>
      <GatsbyImage image={skill?.skillIcon?.asset?.gatsbyImageData} alt={`${skill?.title} Icon`} objectFit="scale-down" className='pill-icon'/>
      <h5 className='pill-title'>{skill?.title}</h5>
    </div>
  </Link>
)

export default SkillPill
