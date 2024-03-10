import './App.css';
import React, { useState, useEffect } from 'react';
import { Home } from './components/Home';

function App() {
  const [message, setMessage] = useState([]);
  const url = '/test'

  useEffect(() => {
    fetch(url).then(response => {
      if (response.status === 200) {
        return response;
      }
      throw Error('Network request failed.');
    }).then(data => setMessage(data))
  }, []); // The empty array means this effect runs once after the initial render

  return (
    <div className="App">
      < Home data={message} />
    </div>
  );
}

export default App;