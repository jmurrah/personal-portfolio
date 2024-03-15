import React from 'react';
import { Link } from "react-router-dom"

function NavBar() {
    return (
        <div>
            <h1 className='text-pink-500 text-center text-8xl'>test</h1>
            <Link to="/">Home</Link>
            <Link to="/projects">Projects</Link>
        </div>
    );
}

export default NavBar;