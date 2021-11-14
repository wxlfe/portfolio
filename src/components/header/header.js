import * as React from "react"
import { useLocation } from "@reach/router"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import "./header.sass"

const Header = ({ siteTitle }) => (
  <header>
    {/* <div className='header-interior'> */}
      <h1>
        <Link to="/">
          <StaticImage className="logo" src='../../images/wxlfe-gold.svg' alt={siteTitle} layout='constrained' placeholder="blurred" objectFit="contain"></StaticImage>
        </Link>
      </h1>
      <input className="menu-btn" type="checkbox" id="menu-btn" />
        <ul className="menu">
          <li>
            <Link
              to="/experience"
              className={useLocation().pathname.includes('experience') ? 'highlighted nav-link' : 'nav-link'}
              >Experience</Link>
          </li>
          <li>
            <Link
              to="/skills"
              className={useLocation().pathname.includes('skills') ? 'highlighted nav-link' : 'nav-link'}
              >Skills</Link>
          </li>
          <li>
            <Link
              to="/projects"
              className={useLocation().pathname.includes('projects') ? 'highlighted nav-link' : 'nav-link'}
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
