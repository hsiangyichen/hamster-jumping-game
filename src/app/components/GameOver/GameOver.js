import React, { useState } from "react";
import Image from "next/image";
import { Fade } from "react-awesome-reveal";
import styles from "./styles.module.scss";

const GameOver = ({ onRestart, score }) => {
  const [imagesLoaded, setImagesLoaded] = useState({
    image1: false,
    image2: false,
  });

  const handleImageLoad = (image) => {
    setImagesLoaded((prevState) => ({ ...prevState, [image]: true }));
  };

  const allImagesLoaded = imagesLoaded.image1 && imagesLoaded.image2;

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
              onLoad={() => handleImageLoad("image1")}
            />
          </div>
          <button onClick={onRestart} className={styles.playAgainButton}>
            <Image
              src="/images/startAgain.png"
              width={165}
              height={48}
              alt="hamster"
              onLoad={() => handleImageLoad("image2")}
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
