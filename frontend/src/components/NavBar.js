import React from 'react';
import { Link } from "react-router-dom"

function NavBar() {
    return (
        <div>
            <h1 className='text-yellow-500'>test</h1>
            <Link to="/">Home</Link>
            <Link to="/projects">Projects</Link>
        </div>
    );
}

export default NavBar;