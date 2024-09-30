import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NewsComponent() {
  const [newsData, setNewsData] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5001/news')
      .then(response => {
        setNewsData(response.data);
      })
      .catch(error => console.error('Error fetching news:', error));
  }, []);

  return (
    <div>
      <h1>News</h1>
      {Object.keys(newsData).length > 0 ? (
        Object.keys(newsData).map((source, index) => (
          <div key={index}>
            <h2>{source}:</h2>
            <ul>
              {newsData[source].map((article, idx) => (
                <li key={idx}>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    {article.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>Loading news...</p>
      )}
    </div>
  );
}

export default NewsComponent;
