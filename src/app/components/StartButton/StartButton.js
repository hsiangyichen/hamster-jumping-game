import React from "react";
import styles from "./styles.module.scss";
import Image from "next/image";

const StartButton = ({ onStart }) => {
  return (
    <div className={styles.container}>
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

export default StartButton;
