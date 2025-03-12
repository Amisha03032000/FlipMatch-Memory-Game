import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./App.css";

const cardImages = [
  { src: "https://placehold.co/100/ffffff/000000?text=A", matched: false },
  { src: "https://placehold.co/100/ffffff/000000?text=B", matched: false },
  { src: "https://placehold.co/100/ffffff/000000?text=C", matched: false },
  { src: "https://placehold.co/100/ffffff/000000?text=D", matched: false },
  { src: "https://placehold.co/100/ffffff/000000?text=E", matched: false },
  { src: "https://placehold.co/100/ffffff/000000?text=F", matched: false }
];

function shuffleArray(array) {
  return [...array, ...array]
    .sort(() => Math.random() - 0.5)
    .map((card, index) => ({ ...card, id: index }));
}

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setCards(shuffleArray(cardImages));
  }, []);

  const handleCardClick = (card) => {
    if (disabled || selectedCards.length === 2) return;

    setSelectedCards((prev) => [...prev, card]);
  };

  useEffect(() => {
    if (selectedCards.length === 2) {
      setDisabled(true);
      const [first, second] = selectedCards;
      if (first.src === second.src) {
        setCards((prev) =>
          prev.map((card) =>
            card.src === first.src ? { ...card, matched: true } : card
          )
        );
      }
      setTimeout(() => {
        setSelectedCards([]);
        setDisabled(false);
      }, 1000);
    }
  }, [selectedCards]);

  return (
    <div className="game-container">
      <h1>Memory Game</h1>
      <p></p>
      <div className="grid">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            className={`card ${selectedCards.includes(card) || card.matched ? "flipped" : ""}`}
            onClick={() => handleCardClick(card)}
            whileTap={{ scale: 0.95 }}
          >
            {selectedCards.includes(card) || card.matched ? (
              <img src={card.src} alt="card" />
            ) : (
              <div className="card-back"></div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
