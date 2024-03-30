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

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

function About() {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    getLanguages().then((data) => {
      setLanguages(data);
    });
  }, []);

  const total_lines = languages['Total'];
  let percentage = (value) => (value / total_lines) * 100;

  return (
    <div>
      <h1>About</h1>
      {Object.entries(languages).map(([key, value]) => (
        <div key={key}>
          {key}: {value}
        </div>
      ))}

      <div style={{ display: 'flex', height: 20 }}>
      {Object.entries(languages)
        .filter(([key, value]) => key !== 'Total')
        .map(([key, value], index) => (
          <div
            key={index}
            style={{
              width: `${percentage(value)}%`,
              backgroundColor: getRandomColor(),
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default About;
