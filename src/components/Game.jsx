import { useState, useEffect, useCallback } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";

export default function Game() {
  const [dice, setDice] = useState(generateAllNewDice());
  const [isOver, setIsOver] = useState(false);

  const isEndGame = useCallback(() => {
    if (dice[0].isHeld === false) return false;
    let value = dice[0].value;
    for (let index = 0; index < dice.length; index++) {
      if (dice[index].isHeld === false) return false;
      if (dice[index].value !== value) return false;
    }
    return true;
  }, [dice]);

  useEffect(() => {
    if (isEndGame()) {
      setIsOver(true);
    }
  }, [isEndGame]);

  function getRandomNumber() {
    return Math.ceil(Math.random() * 6);
  }

  function generateAllNewDice () {
    return new Array(10).fill(0).map(() => ({
      id: nanoid(),
      value: getRandomNumber(),
      isHeld: false,
    }));
  }

  function rollDice() {
    const updatedDice = dice.map((die) => {
      if (die.isHeld === false) {
        return {
          ...die,
          value: getRandomNumber(),
        };
      } else return die;
    });
    setDice(updatedDice);
  }

  function holdDie(id) {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
    console.log(id);
  }

  return (
    <div className="bg-gray-100 rounded-md p-5 flex justify-center items-center h-full">
      <div>
        <header className="text-center text-gray-950">
          <h2 className="text-[30px] font-bold">Tenzies</h2>
          <p className="text-[16px] mt-3">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
        </header>
        <div className="mt-10 grid grid-cols-5 gap-4">
          {dice.map((die) => (
            <Die
              key={die.id}
              holdDie={() => {
                holdDie(die.id);
              }}
              {...die}
            />
          ))}
        </div>
        <button
          onClick={() => {
            if (isOver) {
              setDice(generateAllNewDice);
              setIsOver(false);
            }
            else {
                rollDice()
            }
          }}
          className="block rounded-md px-10 py-2 bg-amber-400 text-black text-[18px] font-medium mx-auto mt-10 hover:cursor-pointer"
        >
          {isOver ? "Reset the game" : "Roll"}
        </button>
      </div>
    </div>
  );
}
