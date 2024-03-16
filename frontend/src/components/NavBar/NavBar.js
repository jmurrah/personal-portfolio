import React from 'react';
import { Link } from "react-router-dom"

function NavBar() {
    return (
        <div className='space-x-4 text-2xl font-mono text-center'>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
        </div>
    );
}

export default NavBar;