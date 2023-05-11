import React, { useState, useEffect } from 'react';

function formatDate(isoDateString) {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Intl.DateTimeFormat('no-NO', options).format(new Date(isoDateString));
}

function News({ serverUrl }) {
  const [items, setItems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch(`${serverUrl}/news`);
      const data = await response.json();
      setItems(data);
    };

    fetchNews();
  }, [serverUrl]);

  const switchActiveNewsItem = (newIndex) => {
    setActiveIndex(newIndex !== undefined ? newIndex : (activeIndex + 1) % items.length);
  };

  useEffect(() => {
    const intervalId = setInterval(switchActiveNewsItem, 60000);
    return () => clearInterval(intervalId);
  }, [items, activeIndex]);

  if (!items.length) return <div>Loading news...</div>;

  return (
    <div className="container">
      {items.map((item, index) => (
        <div key={index} className={`card-news ${index === activeIndex ? 'active' : ''}`}>
          <h3>{item.title}</h3>
          <small>{formatDate(item.date)}</small>
          <hr />
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
}

export default News;
