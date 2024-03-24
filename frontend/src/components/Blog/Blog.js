import React, { useEffect, useState } from 'react';
import Post from './Post/Post';

async function getPosts() {
  try {
    const response = await fetch('/blog');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

function Blog() {
  const [posts, setPosts] = useState([]);
  const [hasRenderedPosts, setHasRenderedPosts] = useState(false);

  useEffect(() => {
    getPosts().then((data) => {
      setPosts(data);
      setHasRenderedPosts(true);
    });
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1>Blog</h1>
      <p>This is where I post about my progress weekly!</p>
      <Post /> {/* This is the post form */}
      {hasRenderedPosts &&
        posts
          .slice()
          .reverse()
          .map((post) => <Post {...post} setPosts={setPosts} />)}
    </div>
  );
}

export default Blog;
