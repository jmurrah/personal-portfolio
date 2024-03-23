import React, { useState, useRef } from 'react';

function Post(title, content, likes, timestamp) {
  const titleRef = useRef();
  const contentRef = useRef();
  const [textBoxArea, setTextBoxArea] = useState('');

  const postToDatabase = () => {
    console.log('Post button pressed!');
    fetch('/blog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: titleRef.current.value,
        content: contentRef.current.value,
        likes: 0, //method to get the likes
      }), //data sent to api
    })
      .then((response) => response.json())
      .then((response) => console.log(response)) //log response from api
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="m-6 w-3/5 h-auto rounded-lg bg-purple-500">
      <p className="mx-6 mt-2 mb-2">Jacob Murrah</p>
      <div className="flex flex-col justify-center mx-6 mb-6">
        <textarea
          className="w-full h-10 mb-2 rounded-lg pl-1.5"
          type="text"
          placeholder="Title"
          ref={titleRef}
        />
        <textarea
          className="w-full min-h-50 h-auto rounded-lg pl-1.5 overflow-auto scrollbar-hide"
          type="text"
          placeholder="Entry"
          ref={contentRef}
          onChange={(e) => setTextBoxArea(e.target.value)}
          rows={textBoxArea.split('\n').length}
        />
      </div>
      <div className="flex justify-end m-6">
        <button
          className="px-4 py-2 text-lg rounded-lg bg-green-500"
          onClick={postToDatabase}
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default Post;
