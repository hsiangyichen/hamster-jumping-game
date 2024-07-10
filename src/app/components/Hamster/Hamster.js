import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./styles.module.scss";

const Hamster = ({ gameStarted, onGameOver, onScoreUpdate, onSeedScoreUp }) => {
  const [position, setPosition] = useState(0);
  const [backToGround, setBackToGround] = useState(true);
  const [imageIndex, setImageIndex] = useState(0);
  const [imageDelay, setImageDelay] = useState(300);
  const [lastCollidedObject, setLastCollidedObject] = useState(null);
  const jumpRef = useRef(null);
  const imageSources = [
    "/images/hamster-1.png",
    "/images/hamster-2.png",
    "/images/hamster-3.png",
  ];
  const maxJumpHeight = 160;

  const animateJump = () => {
    let start = null;
    let isJumpingUp = true;
    const duration = 280;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = elapsed / duration;

      if (progress < 1) {
        const newPosition = isJumpingUp
          ? maxJumpHeight * Math.sin(progress * (Math.PI / 2))
          : maxJumpHeight * Math.cos(progress * (Math.PI / 2));

        setPosition(newPosition);
        jumpRef.current = requestAnimationFrame(step);
      } else {
        if (isJumpingUp) {
          isJumpingUp = false;
          start = null;
          jumpRef.current = requestAnimationFrame(step);
        } else {
          setPosition(0);
          setBackToGround(true);
          cancelAnimationFrame(jumpRef.current);
        }
      }
    };

    jumpRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        (event.key === " " || event.key === "ArrowUp") &&
        backToGround &&
        gameStarted
      ) {
        setBackToGround(false);
        animateJump();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [backToGround, gameStarted]);

  useEffect(() => {
    if (gameStarted) {
      const checkCollision = setInterval(() => {
        const hamsterRect = document
          .querySelector(`.${styles.hamster}`)
          .getBoundingClientRect();
        const obstacles = document.querySelectorAll(".object");
        obstacles.forEach((obstacle) => {
          const obstacleRect = obstacle.getBoundingClientRect();
          if (
            hamsterRect.left < obstacleRect.right - 15 &&
            hamsterRect.right > obstacleRect.left + 15 &&
            hamsterRect.top < obstacleRect.bottom - 15 &&
            hamsterRect.bottom > obstacleRect.top + 15
          ) {
            const alt = obstacle.getAttribute("alt");
            if (obstacle !== lastCollidedObject) {
              if (alt === "seed") {
                obstacle.classList.add(styles["fade-out"]);
                setTimeout(() => {
                  obstacle.style.display = "none";
                }, 100);

                onScoreUpdate(25);
                onSeedScoreUp("+25");
              } else if (alt === "cat" || alt === "wheel") {
                cancelAnimationFrame(jumpRef.current);
                setPosition(position);
                onGameOver();
              }
              setLastCollidedObject(obstacle);
            }
          }
        });
      }, 10);

      return () => clearInterval(checkCollision);
    }
  }, [gameStarted, onGameOver, position, lastCollidedObject, onScoreUpdate]);

  useEffect(() => {
    if (gameStarted) {
      setPosition(0);
      setBackToGround(true);
      cancelAnimationFrame(jumpRef.current);
      setLastCollidedObject(null);
    }
  }, [gameStarted]);

  useEffect(() => {
    if (gameStarted) {
      const newDelay =
        position < 50
          ? 90 - (90 * position) / 50
          : (90 * (position - 50)) / (maxJumpHeight - 50);

      setImageDelay(newDelay);
    }
  }, [position, gameStarted]);

  useEffect(() => {
    if (gameStarted) {
      const imageInterval = setInterval(() => {
        setImageIndex((prevIndex) => (prevIndex + 1) % imageSources.length);
      }, imageDelay);

      return () => clearInterval(imageInterval);
    }
  }, [gameStarted, imageDelay, imageSources.length]);

  return (
    <div className={styles.container}>
      <div
        className={styles.hamster}
        style={{
          bottom: `${position}px`,
        }}
      >
        <Image
          src={imageSources[imageIndex]}
          width={80}
          height={55}
          alt="hamster"
        />
      </div>
    </div>
  );
};

export default Hamster;
