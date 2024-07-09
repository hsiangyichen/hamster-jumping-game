import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./styles.module.scss";

const Ground = ({ gameStarted }) => {
  const [position, setPosition] = useState(0);
  const imageWidth = 270;
  const numberOfImages = Math.ceil(1000 / imageWidth); // Number of images to cover 1000px width
  const intervalRef = useRef(null);

  const images = Array.from({ length: numberOfImages + 1 }).map((_, index) => {
    const newIndex =
      (position + index * imageWidth) % (imageWidth * numberOfImages);
    return (
      <div
        key={index}
        style={{ left: newIndex }}
        className={styles.groundImage}
      >
        <Image
          src="/images/ground.png"
          width={imageWidth}
          height={70}
          alt="ground"
        />
      </div>
    );
  });

  useEffect(() => {
    if (gameStarted) {
      intervalRef.current = setInterval(() => {
        setPosition((prevPosition) => prevPosition - 2);
      }, 5);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [gameStarted]);

  useEffect(() => {
    if (position <= -imageWidth) {
      setPosition(0);
    }
  }, [position]);

  return <div className={styles.groundContainer}>{images}</div>;
};

export default Ground;
