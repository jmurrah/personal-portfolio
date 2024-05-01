import React from 'react';

function Contact() {
  return (
    <div>
      <h1>Contact Info</h1>
      <p>Name: Jacob Murrah</p>
      <p>Email: jacobhmurrah@gmail.com</p>
      <p>
        LinkedIn:{' '}
        <a
          className="tw-text-green-700"
          href="https://www.linkedin.com/in/jacobmurrah/"
          target="_blank"
        >
          https://www.linkedin.com/in/jacobmurrah/
        </a>
      </p>
      <p>
        GitHub:{' '}
        <a
          className="tw-text-green-700"
          href="https://github.com/jmurrah"
          target="_blank"
        >
          https://github.com/jmurrah
        </a>
      </p>
      <p>
        LeetCode:{' '}
        <a
          className="tw-text-green-700"
          href="https://leetcode.com/jmurrah/"
          target="_blank"
        >
          https://github.com/jmurrah
        </a>
      </p>
    </div>
  );
}

export default Contact;
