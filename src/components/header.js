import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import "./header.css"

const Header = ({ siteTitle }) => (
  <header>
    {/* <div className='header-interior'> */}
      <h1>
        <Link to="/">
          <StaticImage className="logo" src='../images/wxlfe-gold.svg' alt={siteTitle} layout='constrained' placeholder="blurred" objectFit="contain"></StaticImage>
        </Link>
      </h1>
      <input className="menu-btn" type="checkbox" id="menu-btn" />
        <ul className="menu">
          <li>
            <Link
              to="/experience"
              className={window.location.href.includes('experience') ? 'highlighted' : 'nav-link'}
              >Experience</Link>
          </li>
          <li>
            <Link
              to="/skills"
              className={window.location.href.includes('skills') ? 'highlighted' : 'nav-link'}
              >Skills</Link>
          </li>
          <li>
            <Link
              to="/projects"
              className={window.location.href.includes('projects') ? 'highlighted' : 'nav-link'}
              >My Work</Link>
          </li>
        </ul>
        <label className="menu-icon" htmlFor="menu-btn">
          <span className="navicon"></span>
        </label>
    {/* </div> */}
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
