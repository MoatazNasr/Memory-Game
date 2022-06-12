import "./index.css";
import React, { useState } from "react";
import Card from "./Card";
import { useEffect } from "react/cjs/react.development";

const cardsIMG = [
  { src: "/img/helmet-1.png" },
  { src: "/img/potion-1.png" },
  { src: "/img/ring-1.png" },
  { src: "/img/scroll-1.png" },
  { src: "/img/shield-1.png" },
  { src: "/img/sword-1.png" },
];

function App() {
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [win, setWin] = useState(0);
  const [time, setTime] = useState();
  const [interval, setint] = useState(0);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      compare();
      setTimeout(() => reset(), 1000);
    }
  }, [choiceTwo, choiceOne]);

  useEffect(() => {
    if (win === 12 || time >= 60) {
      clearInterval(interval);
    }
  });
  const shufflingCards = () => {
    setWin(0);
    setTime(0);
    setint(setInterval(() => setTime((prevTime) => prevTime + 1), 1000));

    let shuffledCards = [...cardsIMG, ...cardsIMG];

    for (let i = shuffledCards.length - 1; i >= 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[randomIndex]] = [
        shuffledCards[randomIndex],
        shuffledCards[i],
      ];
    }
    setCards(
      shuffledCards.map((card) => ({
        ...card,
        id: Math.random(),
        matched: false,
      }))
    );
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const compare = () => {
    if (choiceOne.src === choiceTwo.src) {
      setCards(() =>
        cards.map((card) => {
          if (card.src === choiceOne.src) {
            setWin(win + 2);
            return { ...card, matched: true };
          } else {
            return card;
          }
        })
      );
    }
  };
  const reset = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  if (time >= 60) {
    return (
      <main className="my-auto font-black font-body ">
        <p className="title text-7xl">Time is up, Try again</p>
        <button className="my-8" onClick={shufflingCards}>
          {" "}
          <span className="title text-7xl">New Game</span>
        </button>
      </main>
    );
  }

  return (
    <main className="font-black font-body md:w-96 mx-auto ">
      {cards.length === 0 && (
        <>
          <h1 className="text-9xl mt-14"> Memory Game</h1>
          <p className="text-7xl my-10">
            Try to memorize the shapes of cards in 1 minute
          </p>
        </>
      )}

      {time === undefined || win === 12 ? (
        <button className="my-8" onClick={shufflingCards}>
          <span className="title text-7xl">New Game</span>
        </button>
      ) : (
        <p className="my-8 title text-7xl">{time}</p>
      )}

      {win === 12 ? (
        <p className="text-7xl my-10">You Have Won !!.</p>
      ) : (
        <div className="grid grid-cols-4 items-center gap-2">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={choiceOne === card || choiceTwo === card || card.matched}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default App;
