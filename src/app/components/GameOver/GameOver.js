import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Fade } from "react-awesome-reveal";
import styles from "./styles.module.scss";

const GameOver = ({ onRestart, score }) => {
  const [imagesLoaded, setImagesLoaded] = useState({
    gameOver: false,
    restart: false,
  });

  const handleImageLoad = (image) => {
    setImagesLoaded((prev) => ({ ...prev, [image]: true }));
  };

  const allImagesLoaded = imagesLoaded.gameOver && imagesLoaded.restart;

  return (
    <div className={styles.container}>
      <Fade duration={100} triggerOnce={true}>
        <div className={styles.gameOver}>
          <div className={styles.hamsterFrame}>
            <Image
              src="/images/gameOver.png"
              width={275}
              height={210}
              alt="Game Over"
              onLoad={() => handleImageLoad("gameOver")}
              className={!allImagesLoaded ? styles.hidden : ""}
            />
          </div>
          <button
            onClick={onRestart}
            className={`${styles.playAgainButton} ${
              !allImagesLoaded ? styles.hidden : ""
            }`}
          >
            <Image
              src="/images/startAgain.png"
              width={165}
              height={48}
              alt="Restart"
              onLoad={() => handleImageLoad("restart")}
              className={!allImagesLoaded ? styles.hidden : ""}
            />
          </button>
          {allImagesLoaded && (
            <p className={styles.finalScore}>Score: {score}</p>
          )}
        </div>
      </Fade>
    </div>
  );
};

export default GameOver;
