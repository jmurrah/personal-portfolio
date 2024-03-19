import React from 'react';

function Post() {
    const postToDatabase = () => {
        console.log('Post button pressed!');
        fetch('/blog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"hello": "world"})
        })
        .then(response => response.json())
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    return (
        <div className='m-6 w-3/5 h-auto rounded-lg bg-purple-500'>
            <p className='mx-6 mt-2 mb-2'>Jacob Murrah</p>
            <div className='flex justify-center mx-6 mb-6'>
                <textarea className='w-full h-3/4 rounded-lg pl-1.5' type='text' placeholder='Entry'/>
            </div>
            <div className='flex justify-end m-6'>
                <button className='px-4 py-2 text-lg rounded-lg bg-green-500' onClick={postToDatabase}>Post</button>
            </div>
        </div>
    );
}

export default Post;