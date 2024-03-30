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
    <div className="tw-m-6 tw-w-3/5 tw-h-auto tw-rounded-lg tw-text-black  tw-bg-purple-900">
      <p className="tw-mx-6 tw-mt-2 tw-mb-2 tw-text-white">
        Jacob Murrah @jmurrah {post.time} {likes} likes
      </p>
      <div className="tw-flex tw-flex-col tw-justify-center tw-mx-6 tw-mb-6">
        <textarea
          className={classNames(
            'tw-w-full tw-h-10 tw-mb-2 tw-rounded-lg tw-pl-1.5',
            {
              'disabled-textarea': isDisabled,
            }
          )}
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isDisabled}
        />
        <textarea
          className={classNames(
            'tw-w-full tw-min-h-50 tw-h-auto tw-rounded-lg tw-pl-1.5 tw-overflow-auto tw-scrollbar-hide',
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
        <div className="tw-flex tw-justify-end tw-m-6">
          <button
            className="tw-px-4 tw-py-2 tw-text-lg tw-rounded-lg tw-bg-green-500"
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
