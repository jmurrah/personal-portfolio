import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '../../../components/ui/menubar';

async function sendToAPI({ post, action = 'none' }) {
  console.log('post', post);
  return fetch('/blog', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: post.id,
      title: post.title,
      content: post.content,
      likes: post.likes, //add method to get the likes
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
  const [postState, setPostState] = useState({
    id: post.id,
    time: post.time,
    title: post.title,
    content: post.content,
    likes: post.likes,
    isDisabled: initialIsDisabled,
  });

  const textareaRef = useRef(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [postState.content]);

  return (
    <div className="tw-m-6 tw-w-3/5 tw-h-auto tw-rounded-lg tw-text-black tw-bg-purple-900">
      <div className="tw-flex">
        <p className="tw-mx-6 tw-mt-2 tw-mb-2 tw-text-white">
          Jacob Murrah @jmurrah {postState.time} {postState.likes} likes
        </p>
        <Menubar className="tw-w-14 tw-ml-auto">
          <MenubarMenu>
            <MenubarTrigger>. . .</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Edit</MenubarItem>
              <MenubarItem>Delete</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>

      <div className="tw-flex tw-flex-col tw-justify-center tw-mx-6 tw-mb-6">
        <textarea
          className={classNames(
            'tw-resize-none tw-w-full tw-h-10 tw-mb-2 tw-rounded-lg tw-pl-1.5 tw-mt-2',
            {
              'disabled-textarea': postState.isDisabled,
            }
          )}
          type="text"
          placeholder="Title"
          value={postState.title}
          onChange={(e) =>
            setPostState((prevState) => ({
              ...prevState,
              title: e.target.value,
            }))
          }
          disabled={postState.isDisabled}
        />
        <textarea
          ref={textareaRef}
          className={classNames(
            'tw-resize-none tw-w-full tw-min-h-50 tw-h-auto tw-rounded-lg tw-pl-1.5 tw-overflow-hidden tw-scrollbar-hide',
            { 'disabled-textarea': postState.isDisabled }
          )}
          type="text"
          placeholder="Entry"
          value={postState.content}
          onChange={(e) => {
            setPostState((prevState) => ({
              ...prevState,
              content: e.target.value,
            }));
            e.target.style.height = 'inherit';
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          disabled={postState.isDisabled}
        />
      </div>

      {postState.isDisabled && (
        <button
          className="tw-px-4 tw-py-2 tw-text-lg tw-rounded-lg tw-bg-green-500 tw-flex tw-ml-auto"
          onClick={async () => {
            const updatedLikes = postState.likes + 1;
            setPostState((prevState) => ({
              ...prevState,
              likes: updatedLikes,
            }));
            await sendToAPI({
              post: { ...postState, likes: updatedLikes },
              action: 'update',
            });
          }}
        >
          Like
        </button>
      )}

      {/* the above will be consistent with all posts. The below will be unique to each post. */}
      {!postState.isDisabled && (
        <div className="tw-flex tw-justify-end tw-m-6">
          <button
            className="tw-px-4 tw-py-2 tw-text-lg tw-rounded-lg tw-bg-green-500"
            onClick={async () => {
              await sendToAPI({ post: postState, action: 'insert' });
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

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    time: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    likes: PropTypes.number,
  }),
  initialIsDisabled: PropTypes.bool,
  setFetchPostsTrigger: PropTypes.func,
};

export default Post;
