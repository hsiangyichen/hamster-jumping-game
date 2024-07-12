import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";

const StartGame = ({ onStart }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.instruction}>
        Jump to avoid hitting cats and wheels!
      </h1>
      <button onClick={onStart} className={styles.startButton}>
        <Image
          src="/images/startButton.png"
          width={175}
          height={55}
          alt="startButton"
        />
      </button>
    </div>
  );
};

export default StartGame;
