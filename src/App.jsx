import React, { useState, useEffect } from 'react';
import './App.css';
import MemoryGame from './components/MemoryGame';
import Tabs from './components/Tabs';
import Settings from './components/Settings';
import Rules from './components/Rules';

const App = () => {
  const [playerName, setPlayerName] = useState('');
  const [highScore, setHighScore] = useState(null);
  const [cardNum, setCardNum] = useState(16);

  useEffect(() => {
    const storedPlayerName = sessionStorage.getItem('playerName');
    const storedHighScore = localStorage.getItem('highScore');
    const storedCardNum = sessionStorage.getItem('cardNum');
    if (storedPlayerName) setPlayerName(storedPlayerName);
    if (storedHighScore) setHighScore(storedHighScore);
    if (storedCardNum) setCardNum(parseInt(storedCardNum));
  }, []);

  const saveSettings = (name, numCards) => {
    setPlayerName(name);
    setCardNum(numCards);
    sessionStorage.setItem("playerName", name);
    sessionStorage.setItem("cardNum", numCards);
    window.location.reload();
  };

  return (
    <div className="App">
      <header>
        <h1>Memory Game</h1>
        <p id="new_game"><a href="/">New Game</a></p>
        <p id="player">Player: {playerName}</p>
        <p id="high_score">Highscore: {highScore}%</p>
        <p id="correct">&nbsp;</p>
        <div className="clear"></div>
      </header>
      <main>
        <Tabs>
          <div label="Play Game">
            <MemoryGame cardNum={cardNum} highScore={highScore} setHighScore={setHighScore} />
          </div>
          <div label="View Rules">
            <Rules />
          </div>
          <div label="Settings">
            <Settings saveSettings={saveSettings} />
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default App;
