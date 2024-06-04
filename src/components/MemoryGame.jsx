import React, { useState, useEffect } from 'react';
import './MemoryGame.css';

const MemoryGame = ({ cardNum, highScore, setHighScore }) => {
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [tries, setTries] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);

  useEffect(() => {
    const cardImages = [
      "images/card_1.png",
      "images/card_2.png",
      "images/card_3.png",
      "images/card_4.png",
      "images/card_5.png",
      "images/card_6.png",
      "images/card_7.png",
      "images/card_8.png",
      "images/card_9.png",
      "images/card_10.png",
      "images/card_11.png",
      "images/card_12.png",
      "images/card_13.png",
      "images/card_14.png",
      "images/card_15.png",
      "images/card_16.png",
      "images/card_17.png",
      "images/card_18.png",
      "images/card_19.png",
      "images/card_20.png",
      "images/card_21.png",
      "images/card_22.png",
      "images/card_23.png",
      "images/card_24.png",
    ];
    const blankCard = "images/blank.png";
    const backCard = "images/big-creeper-face.png";

    sessionStorage.setItem('cardImg', JSON.stringify(cardImages));
    sessionStorage.setItem('cardBackImg', backCard);
    sessionStorage.setItem('blankCardImg', blankCard);
    
    initializeGame(cardNum);
  }, [cardNum]);

  const initializeGame = (num) => {
    const cardImgArray = JSON.parse(sessionStorage.getItem('cardImg')) || [];
    const shuffledCards = shuffleArray(createCardArray(cardImgArray, num)).map(card => ({
      image: card,
      flipped: false,
      matched: false
    }));

    setCards(shuffledCards);
  };

  const createCardArray = (imageArray, num) => {
    const cards = [];
    for (let i = 0; i < num / 2; i++) {
      cards.push(imageArray[i]);
      cards.push(imageArray[i]);
    }
    return cards;
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleCardClick = (index) => {
    if (disabled) return;

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);

    if (firstCard === null) {
      setFirstCard(index);
    } else {
      setSecondCard(index);
      setDisabled(true);
      setTries(tries + 1);
    }
  };

  useEffect(() => {
    if (firstCard !== null && secondCard !== null) {
      if (cards[firstCard].image === cards[secondCard].image) {
        handleMatch();
      } else {
        handleMismatch();
      }
    }
  }, [secondCard]);

  const handleMatch = () => {
    setTimeout(() => {
      const newCards = [...cards];
      newCards[firstCard].flipped = true;
      newCards[firstCard].matched = true;
      newCards[secondCard].flipped = true;
      newCards[secondCard].matched = true;
      setCards(newCards);
      setFirstCard(null);
      setSecondCard(null);
      setDisabled(false);
      setMatchedCount(matchedCount + 2);
    }, 1000);
  };

  const handleMismatch = () => {
    setTimeout(() => {
      const newCards = [...cards];
      newCards[firstCard].flipped = false;
      newCards[secondCard].flipped = false;
      setCards(newCards);
      setFirstCard(null);
      setSecondCard(null);
      setDisabled(false);
    }, 1000);
  };

  useEffect(() => {
    if (matchedCount === cardNum) {
      const correct = parseInt(((cardNum / 2) * 100) / tries);
      document.getElementById('correct').textContent = `Correct: ${correct}%`;

      if (!highScore || correct > highScore) {
        localStorage.setItem("highScore", `${correct}`);
        setHighScore(correct);
      }
    }
  }, [matchedCount, cardNum, highScore, setHighScore, tries]);

  return (
    <div id="cards" className="cards-grid">
      {cards.map((card, index) => (
        <div key={index} className="card" onClick={() => !card.flipped && !card.matched && handleCardClick(index)}>
          <img
            className={`card-img ${card.flipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`}
            src={card.flipped || card.matched ? (card.matched ? sessionStorage.getItem('blankCardImg') : card.image) : sessionStorage.getItem('cardBackImg')}
            alt="memory card"
          />
        </div>
      ))}
    </div>
  );
};

export default MemoryGame;
