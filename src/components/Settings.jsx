import React, { useState } from 'react';

const Settings = ({ saveSettings }) => {
  const [name, setName] = useState('');
  const [numCards, setNumCards] = useState(16);

  const handleSubmit = () => {
    saveSettings(name, numCards);
  };

  return (
    <div>
      <label htmlFor='player_name'>Player name:</label>
      <input type='text' id='player_name' value={name} onChange={(e) => setName(e.target.value)} /><br />
      
      <label htmlFor='num_cards'>Number of cards:</label>
      <select id='num_cards' value={numCards} onChange={(e) => setNumCards(parseInt(e.target.value))}>
        <option value="48">48</option>
        <option value="40">40</option>
        <option value="32">32</option>
        <option value="24">24</option>
        <option value="16">16</option>
        <option value="8">8</option>
      </select><br />
      
      <input type='button' onClick={handleSubmit} value='Save Settings' />
    </div>
  );
};

export default Settings;
