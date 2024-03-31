import React, { useState, useEffect } from 'react';

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
                width: `${percentage(value).toFixed(1)}%`,
                backgroundColor: getRandomColor(),
              }}
            />
          ))}
      </div>

      <div>
        {Object.entries(languages)
          .filter(([key, value]) => key !== 'Total')
          .map(([key, value]) => (
            <div key={key}>
              {key}: {percentage(value).toFixed(1)}%
            </div>
          ))}
      </div>
    </div>
  );
}

export default About;
