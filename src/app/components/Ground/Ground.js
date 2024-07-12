import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./styles.module.scss";

const Ground = ({ gameStarted }) => {
  const [position, setPosition] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [loadedImages, setLoadedImages] = useState(0);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const imageWidth = 500;
  const intervalRef = useRef(null);

  useEffect(() => {
    // Set initial window width
    setWindowWidth(window.innerWidth);

    // Update window width when the window is resized
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const numberOfImages = Math.ceil(windowWidth / imageWidth); // +1 to ensure covering the window

  const images = Array.from({ length: numberOfImages + 1 }).map((_, index) => {
    const leftPosition = position + index * imageWidth;

    return (
      <div
        key={index}
        style={{
          left: leftPosition,
          display: allImagesLoaded ? "flex" : "none",
          position: "absolute",
        }}
      >
        <Image
          src="/images/line.png"
          width={imageWidth}
          height={6}
          alt="ground"
          onLoad={() => handleImageLoad()}
        />
      </div>
    );
  });

  const handleImageLoad = () => {
    setLoadedImages((prevLoadedImages) => prevLoadedImages + 1);
  };

  useEffect(() => {
    if (loadedImages >= numberOfImages) {
      setAllImagesLoaded(true);
    }
  }, [loadedImages, numberOfImages]);

  useEffect(() => {
    if (gameStarted && allImagesLoaded) {
      intervalRef.current = setInterval(() => {
        setPosition((prevPosition) => prevPosition - 2);
      }, 5);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [gameStarted, allImagesLoaded]);

  useEffect(() => {
    if (position <= -imageWidth) {
      setPosition(0);
    }
  }, [position]);

  return <div className={styles.groundContainer}>{images}</div>;
};

export default Ground;
