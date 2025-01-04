import React from "react";
import Die from "./die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  // setting up state and storing the array in the state
  const [dice, setDice] = React.useState(() => generateAllTheDice());

  // setting gamewon variable that returs true if all of the die have same (value and isHeld)
  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  // creating an array with 10 objects
  function generateAllTheDice() {
    return new Array(10).fill(0).map((item) => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(), // using nanoid package to create unique number to set value of id
    }));
  }

  // creating a function to roll a dice when clicked
  function rollDice() {
    setDice((oldDice) =>
      oldDice.map((die) =>
        !die.isHeld ? { ...die, value: Math.ceil(Math.random() * 6) } : die
      )
    );
  }

  // function to hold the die
  function hold(id) {
    if (!gameWon) {
      setDice((oldDice) =>
        oldDice.map((die) =>
          id === die.id ? { ...die, isHeld: !die.isHeld } : die
        )
      );
    }
  }

  // function to reset the game when game is over
  function newGame() {
    setDice(generateAllTheDice());
  }

  // Mapping the dice and creating the buttons with their value
  const diceElements = dice.map((dieObj) => (
    <Die
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={() => hold(dieObj.id)}
    />
  ));

  return (
    <main>
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && (
          <p>Congratulations! You won! Press "New Game" to start again.</p>
        )}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button onClick={gameWon ? newGame : rollDice} className="roll-dice">
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
