import React, { useState } from 'react';
import classNames from 'classnames';

function postToDatabase(title, content, likes, action) {
  console.log('Post button pressed!');
  fetch('/blog', {
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
    .then((response) => console.log(response))
    .catch((error) => console.error('Error:', error));
}

function Post({ id, initTitle, initContent, initLikes }) {
  const [title, setTitle] = useState(initTitle);
  const [content, setContent] = useState(initContent);
  const [likes, setLikes] = useState(initLikes);
  const [isDisabled, setDisabled] = useState(false);

  return (
    <div className="m-6 w-3/5 h-auto rounded-lg bg-purple-500">
      <p className="mx-6 mt-2 mb-2">Jacob Murrah</p>
      <div className="flex flex-col justify-center mx-6 mb-6">
        <textarea
          className={classNames('w-full h-10 mb-2 rounded-lg pl-1.5', {
            'disabled-textarea': title && content,
          })}
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={title && content}
        />
        <textarea
          className={classNames(
            'w-full min-h-50 h-auto rounded-lg pl-1.5 overflow-auto scrollbar-hide',
            { 'disabled-textarea': title && content }
          )}
          type="text"
          placeholder="Entry"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          // rows={content.split('\n').length}
          disabled={title && content}
        />
      </div>

      {/* the above will be consistent with all posts. The below will be unique to each post. */}
      {(
        <div className="flex justify-end m-6">
          <button
            className="px-4 py-2 text-lg rounded-lg bg-green-500"
            onClick={() => postToDatabase(title, content, 0, 'insert')}
          >
            Post
          </button>
        </div>
      )}
    </div>
  );
}

export default Post;
