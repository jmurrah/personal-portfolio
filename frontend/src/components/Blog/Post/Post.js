import React, { useState } from 'react';
import classNames from 'classnames';

async function sendToAPI(title, content, likes, action) {
  return fetch('/blog', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      content: content,
      likes: likes, //add method to get the likes
      action: action,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => console.error('Error:', error));
}

Post.defaultProps = {
  post: {
    id: -1,
    time: '',
    title: '',
    content: '',
    likes: 0,
  },
  initialIsDisabled: false,
};

function Post({ post, initialIsDisabled, setFetchPostsTrigger }) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [likes, setLikes] = useState(post.likes);
  const [isDisabled, setDisabled] = useState(initialIsDisabled);

  return (
    <div className="m-6 w-3/5 h-auto rounded-lg bg-purple-500">
      <p className="mx-6 mt-2 mb-2">
        Jacob Murrah @jmurrah {post.time} {likes} likes
      </p>
      <div className="flex flex-col justify-center mx-6 mb-6">
        <textarea
          className={classNames('w-full h-10 mb-2 rounded-lg pl-1.5', {
            'disabled-textarea': isDisabled,
          })}
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isDisabled}
        />
        <textarea
          className={classNames(
            'w-full min-h-50 h-auto rounded-lg pl-1.5 overflow-auto scrollbar-hide',
            { 'disabled-textarea': isDisabled }
          )}
          type="text"
          placeholder="Entry"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={content.split('\n').length}
          disabled={isDisabled}
        />
      </div>

      {/* the above will be consistent with all posts. The below will be unique to each post. */}
      {!isDisabled && (
        <div className="flex justify-end m-6">
          <button
            className="px-4 py-2 text-lg rounded-lg bg-green-500"
            onClick={async () => {
              await sendToAPI(title, content, 0, 'insert');
              setFetchPostsTrigger((prev) => prev + 1);
            }}
          >
            Post
          </button>
        </div>
      )}
    </div>
  );
}

export default Post;
