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

function getLastId(posts) {
  if (posts.length === 0) {
    return 0;
  }
  return posts[posts.length - 1].id;
}

function Blog() {
  const [posts, setPosts] = useState([]);
  const [fetchPostsTrigger, setFetchPostsTrigger] = useState(0);

  useEffect(() => {
    getPosts().then((data) => {
      setPosts(data);
    });
  }, [fetchPostsTrigger]);

  return (
    <div className="tw-flex tw-flex-col tw-items-center">
      <h1>Blog</h1>
      <p>This is where I post about my progress weekly!</p>
      <Post
        key={getLastId(posts)}
        setFetchPostsTrigger={setFetchPostsTrigger}
      />
      {posts
        .slice()
        .reverse()
        .map((post) => {
          return (
            <Post
              key={post.id}
              post={post}
              initialIsDisabled={true}
              setFetchPostsTrigger={setFetchPostsTrigger}
            />
          );
        })}
    </div>
  );
}

export default Blog;
