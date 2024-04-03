import React, { useState } from 'react';
import classNames from 'classnames';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "../../../components/ui/menubar";


async function sendToAPI({post, action = 'none'}) {
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
    title: post.title,
    content: post.content,
    likes: post.likes,
    isDisabled: initialIsDisabled
  });

  return (
    <div className="tw-m-6 tw-w-3/5 tw-h-auto tw-rounded-lg tw-text-black  tw-bg-purple-900">
      <p className="tw-mx-6 tw-mt-2 tw-mb-2 tw-text-white">
        Jacob Murrah @jmurrah {postState.time} {postState.likes} likes 
      </p>
      <Menubar className="tw-w-14">
        <MenubarMenu>
          <MenubarTrigger>. . .</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Edit
            </MenubarItem>
            <MenubarItem>
              Delete
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <button
            className="tw-px-4 tw-py-2 tw-text-lg tw-rounded-lg tw-bg-green-500"
            onClick={async () => {
              setPostState(prevState => ({...prevState, likes: postState.likes + 1}));
              await sendToAPI({post: postState, action: 'update'});
            }}
          >
            Like
      </button>

      <div className="tw-flex tw-flex-col tw-justify-center tw-mx-6 tw-mb-6">
        <textarea
          className={classNames(
            'tw-w-full tw-h-10 tw-mb-2 tw-rounded-lg tw-pl-1.5',
            {
              'disabled-textarea': postState.isDisabled,
            }
          )}
          type="text"
          placeholder="Title"
          value={postState.title}
          onChange={(e) => setPostState(prevState => ({...prevState, title: e.target.value}))}
          disabled={postState.isDisabled}
        />
        <textarea
          className={classNames(
            'tw-w-full tw-min-h-50 tw-h-auto tw-rounded-lg tw-pl-1.5 tw-overflow-auto tw-scrollbar-hide',
            { 'disabled-textarea': postState.isDisabled }
          )}
          type="text"
          placeholder="Entry"
          value={postState.content}
          onChange={(e) => setPostState(prevState => ({...prevState, content: e.target.value}))}
          rows={postState.content.split('\n').length}
          disabled={postState.isDisabled}
        />
      </div>

      {/* the above will be consistent with all posts. The below will be unique to each post. */}
      {!postState.isDisabled && (
        <div className="tw-flex tw-justify-end tw-m-6">
          <button
            className="tw-px-4 tw-py-2 tw-text-lg tw-rounded-lg tw-bg-green-500"
            onClick={async () => {
              await sendToAPI({post: postState, action: 'insert'});
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
