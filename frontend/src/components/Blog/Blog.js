import React from 'react';
import Post from './Post/Post';

function Blog() {
    return (
        <div className='flex flex-col items-center'>
            <h1>Blog</h1>
            <p>This is where I post about my progress weekly!</p>
            <Post />
            <Post />
        </div>
    );
}

export default Blog;