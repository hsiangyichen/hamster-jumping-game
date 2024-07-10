import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import GroundSVG from "@assets/ground.svg";
import styles from "./styles.module.scss";

const Ground = ({ gameStarted }) => {
  const [position, setPosition] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [loadedImages, setLoadedImages] = useState(0);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const imageWidth = 270;
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

  const numberOfImages = Math.ceil(windowWidth / imageWidth); // Number of images to cover window width

  const images = Array.from({ length: numberOfImages + 1 }).map((_, index) => {
    const newIndex =
      (position + index * imageWidth) % (imageWidth * numberOfImages);
    return (
      <div
        key={index}
        style={{ left: newIndex, display: allImagesLoaded ? "block" : "none" }}
        className={styles.groundImage}
      >
        {/* <div onLoad={() => handleImageLoad()}>
          <GroundSVG width={imageWidth} height={70} />
        </div> */}
        <Image
          src="/images/ground.png"
          width={imageWidth}
          height={50}
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
