import React from 'react';

const Rules = () => {
  return (
    <fieldset>
      <legend>How to play the Memory game</legend>
      <ul>
        <li>The cards are placed face down. Each card has a matching card.</li>
        <li>For each turn, the player selects two cards.</li>
        <li>If the cards match, they are removed from the board.</li>
        <li>If the cards don't match, they are turned face down again.</li>
        <li>The game ends when all cards have been matched.</li>
      </ul>
    </fieldset>
  );
};

export default Rules ;
