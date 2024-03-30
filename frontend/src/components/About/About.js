import React, { useState, useEffect } from 'react';
import Progress from './progress.jsx';

async function getLanguages() {
  try {
    const response = await fetch('/about');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

function About() {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    getLanguages().then(data => {
      setLanguages(data);
    });
  }, []);
  const total_lines = languages["Total"];
  

  return (
    <div>
      <h1>About</h1>
      {Object.entries(languages).map(([key, value]) => (
        <div key={key}>
          {key}: {value}
        </div>
      ))}
      <Progress/>
      <div className="tw-space-y-2">
        {Object.entries(languages).map(([key, value]) => {
          return (
            // <div style={{width: `${(value / total_lines) * 100}%`}} className="h-full bg-green-500 rounded"></div>
            <p>hello</p>
          );
        })}
      </div>
    </div>
  );
}

export default About;
