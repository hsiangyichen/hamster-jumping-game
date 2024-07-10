"use client";
import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHighestScore } from "./redux/store";
import Hamster from "./components/Hamster";
import Objects from "./components/Objects";
import Ground from "./components/Ground";
import GameOver from "./components/GameOver";
import FadeOut from "./components/FadeOut";
import styles from "./styles.module.scss";
import StartButton from "./components/StartButton";

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [seedScoreUpMessage, setSeedScoreUpMessage] = useState(null);
  const highestScore = useSelector((state) => state.score.highestScore);
  const dispatch = useDispatch();

  const handleStart = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0); // Reset the score when the game starts
  };

  const handleGameOver = useCallback(() => {
    setGameStarted(false);
    setGameOver(true);
    if (score > highestScore) {
      dispatch(setHighestScore(score));
    }
  }, [dispatch, score, highestScore]);

  const handleRestart = () => {
    setGameStarted(false);
    setGameOver(false);
    handleStart();
  };

  const handleScoreUpdate = useCallback((newScore) => {
    setScore((prevScore) => prevScore + newScore);
  }, []);

  const handleSeedScoreUpMessage = useCallback((message) => {
    setSeedScoreUpMessage(message);
    setTimeout(() => {
      setSeedScoreUpMessage(null);
    }, 500);
  }, []);

  useEffect(() => {
    if (!gameStarted) return;
    const interval = setInterval(() => {
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        return newScore;
      });
    }, 100);

    return () => {
      // Clear the interval when the game stops
      clearInterval(interval);
    };
  }, [gameStarted]);

  return (
    <div className={styles.container}>
      {/* <h1 className={styles.title}>Hamster Jumping Game</h1> */}

      <div className={styles.gameArea}>
        {gameOver && <GameOver onRestart={handleRestart} score={score} />}
        <div className={styles.hamster}>
          <Hamster
            gameStarted={gameStarted}
            onGameOver={handleGameOver}
            onScoreUpdate={handleScoreUpdate}
            onSeedScoreUp={handleSeedScoreUpMessage}
          />
        </div>
        <div>
          <Objects gameStarted={gameStarted} />
        </div>
        <div className={styles.ground}>
          <Ground gameStarted={gameStarted} />
        </div>
        {!gameStarted && !gameOver && <StartButton onStart={handleStart} />}
        <div className={styles.scoreContainer}>
          <div className={styles.score}>Score: {score} </div>

          <div className={styles.score}>Highest Score: {highestScore}</div>
        </div>
        <div className={styles.seedScoreUpMessageContainer}>
          <div className={styles.seedScoreUpMessage}>
            {seedScoreUpMessage && <FadeOut item={seedScoreUpMessage} />}
          </div>
        </div>
      </div>
    </div>
  );
}
