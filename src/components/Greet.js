import React, { useState, useEffect } from 'react';

function Greet() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    let greeting;
    if (hour >= 6 && hour < 12) {
      greeting = 'God morgen';
    } else if (hour >= 12 && hour < 18) {
      greeting = 'God ettermiddag';
    } else if (hour >= 18 && hour < 24) {
      greeting = 'God kveld';
    } else {
      greeting = 'God natt';
    }
    setGreeting(greeting);
  }, []);

  return (
    <div className="greeting">
      {greeting}
    </div>
  );
}

export default Greet;
