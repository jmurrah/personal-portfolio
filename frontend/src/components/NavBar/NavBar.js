import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div className="tw-space-x-4 tw-text-2xl tw-font-mono tw-text-center">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/projects">Projects</Link>
      <Link to="/blog">Blog</Link>
      <Link to="/contact">Contact</Link>
    </div>
  )
}

export default NavBar
