import React, { useState } from "react";
import Image from "next/image";
import { Fade } from "react-awesome-reveal";
import styles from "./styles.module.scss";

const GameOver = ({ onRestart, score }) => {
  return (
    <div className={styles.container}>
      <Fade duration={100} triggerOnce={true}>
        <div className={styles.gameOver}>
          <div className={styles.hamsterFrame}>
            <Image
              src="/images/gameOver.png"
              width={275}
              height={210}
              alt="hamster"
            />
          </div>
          <p className={styles.finalScore}>Score: {score}</p>

          <button onClick={onRestart} className={styles.playAgainButton}>
            <Image
              src="/images/startAgain.png"
              width={165}
              height={48}
              alt="hamster"
            />
          </button>
        </div>
      </Fade>
    </div>
  );
};

export default GameOver;
