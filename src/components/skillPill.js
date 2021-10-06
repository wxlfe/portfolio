import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from 'gatsby-plugin-image'

const SkillPill = ({ skill }) => (
  <Link to={`/skill/${skill?.slug?.current}`} style={{
    textDecoration: 'none'
  }}>
    <div style={{
      border: '2px solid var(--foreground)',
      borderRadius: '99px',
      padding: '1rem',
      margin: '1rem',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    }}>
      <GatsbyImage image={skill?.skillIcon?.asset?.gatsbyImageData} objectFit="scale-down" style={{ maxHeight: '1rem', maxWidth: '1rem', marginRight: '1rem' }}/>
      <h5 style={{
        color: 'var(--foreground)',
        textDecoration: 'none',
        marginBottom: '0',
        textAlign: 'center'
      }}>{skill?.title}</h5>
    </div>
  </Link>
)

export default SkillPill
