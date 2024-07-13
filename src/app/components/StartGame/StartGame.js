import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";

const StartGame = ({ onStart }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.seedImageContainer}>
        <h1 className={styles.instructionOne}>Find the seeds!</h1>
        <Image
          src="/images/seed.png"
          alt="seed"
          width={650}
          height={650}
          className={styles.seedImage}
        />
      </div>

      <div className={styles.spaceImageContainer}>
        <h1 className={styles.instructionTwo}>
          Jump to avoid the cats and wheels!
        </h1>
        <div className={styles.spaceAndArrowImageContainer}>
          <Image
            src="/images/space.png"
            alt="seed"
            width={650}
            height={650}
            className={styles.spaceImage}
          />
          <Image
            src="/images/arrow.png"
            alt="arrow"
            width={650}
            height={650}
            className={`${styles.arrowImage} ${
              isAnimating ? styles.animate : ""
            }`}
          />
        </div>
      </div>

      <button onClick={onStart} className={styles.startButton}>
        <Image
          src="/images/startButton.png"
          width={175}
          height={55}
          alt="startButton"
          className={styles.startButtonImage}
        />
      </button>
    </div>
  );
};

export default StartGame;
