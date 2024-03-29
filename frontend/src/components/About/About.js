import React, { useEffect } from 'react';

async function getLanguages() {
  try {
    const response = await fetch('/about');
    console.log(response);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

function About() {
  useEffect(() => {
    getLanguages().then(languages => {
      console.log(languages);
    });
  }, []); 

  return (
    <div>
      <h1>About</h1>
      <p>Coming Soon...</p>
    </div>
  );
}

export default About;
