import React, { useEffect, useState } from 'react';
import React from 'react';
import Post from './Post/Post';

function getPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/blog')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error:', error));
  }, []);
  
  return posts;
}

function Blog() {
  const posts = getPosts();
  return (
    <div className="flex flex-col items-center">
      <h1>Blog</h1>
      <p>This is where I post about my progress weekly!</p>
      <Post />
      {posts.map((post, index) => 
        <Post key={index} title={post.title} content={post.content} />
      )}
    </div>
  );
}

export default Blog;
