import React, { useState, useEffect } from 'react';

async function getLanguages() {
  try {
    const response = await fetch('/about');
    const data = await response.json();
    console.log('Data:', data);
    return data;
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

  return (
    <div>
      <h1>About</h1>
      <div style={{ display: 'flex', height: 20 }}>
        {Object.entries(languages)
          .filter(([key]) => key !== 'Total' && key !== 'Percentages')
          .map(([key, value], index) => (
            <div
              key={index}
              style={{
                width: `${value['percentage']}%`,
                backgroundColor: getRandomColor(),
              }}
            />
          ))}
      </div>

      <div>
        {Object.entries(languages)
          .filter(([key]) => key !== 'Total' && key !== 'Percentages')
          .map(([key, value]) => (
            <div key={key}>
              {key}: {value['percentage']}%
            </div>
          ))}
      </div>
    </div>
  );
}

export default About;
