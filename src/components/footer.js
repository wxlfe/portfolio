import * as React from "react"
import { StaticImage } from 'gatsby-plugin-image'

const Footer = () => (
  <div style={{  
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      padding: '1rem'
    }}>
      <a href="mailto:nate@wxlfe.dev">
        <StaticImage src='../images/email.png' alt="Email: nate@wxlfe.dev" layout='constrained' placeholder="blurred" width={35} height={35}></StaticImage>
      </a>
      <a href="https://github.com/wxlfe">
        <StaticImage src='../images/github.png' alt="GitHub: https://github.com/wxlfe" layout='constrained' placeholder="blurred" width={35} height={35}></StaticImage>
      </a>
      <a href="https://linkedin.com/in/wxlfe">
        <StaticImage src='../images/linkedin.png' alt="LinkedIn: https://linkedin.com/in/wxlfe" layout='constrained' placeholder="blurred" width={35} height={35}></StaticImage>
      </a>
  </div>
)

export default Footer