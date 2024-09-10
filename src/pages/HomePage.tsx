// src/pages/HomePage.tsx
import React, { useState } from 'react';

const HomePage: React.FC = () => {
  const [username, setUsername] = useState<string>('DefaultUser');
  const [newUsername, setNewUsername] = useState<string>('');

  const handleUsernameChange = () => {
    setUsername(newUsername);
    setNewUsername('');
  };

  return (
    <div>
      <h2>Home Page</h2>
      <p>Welcome, {username}!</p>
      <input
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
        placeholder="New Username"
      />
      <button onClick={handleUsernameChange}>Change Username</button>
    </div>
  );
};

export default HomePage;
