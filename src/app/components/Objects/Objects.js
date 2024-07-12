import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./styles.module.scss";

const Objects = ({ gameStarted }) => {
  const [objects, setObjects] = useState([]);
  const minX = 200; // Minimum starting x value
  const maxX = 800; // Maximum starting x value
  const minInterval = 400; // Minimum interval between objects
  const maxInterval = 900; // Maximum interval between objects
  const objectWidth = 70;
  let objectCounter = 0; // Counter to generate unique keys

  const objectTypes = [
    { src: "/images/cat.png", width: 75, height: 50, alt: "cat" },
    {
      src: "/images/seed.png",
      width: 70,
      height: 50,
      alt: "seed",
    },
    {
      src: "/images/wheel.png",
      width: 65,
      height: 65,
      alt: "wheel",
    },
  ];

  const generateObject = (prevX) => {
    const interval = Math.floor(
      Math.random() * (maxInterval - minInterval + 1) + minInterval
    );
    const x = prevX + objectWidth + interval;
    const objectType =
      objectTypes[Math.floor(Math.random() * objectTypes.length)];
    return {
      id: `${Date.now()}_${objectCounter++}`,
      x,
      y: 300 - objectType.height - 23,
      ...objectType,
    };
  };

  useEffect(() => {
    if (gameStarted) {
      const initialObjects = [];
      let prevX = minX;

      for (let i = 0; i < 4; i++) {
        const newObject = generateObject(prevX);
        initialObjects.push(newObject);
        prevX = newObject.x;
      }

      setObjects(initialObjects);

      const interval = setInterval(() => {
        setObjects((prevObjects) => {
          const updatedObjects = prevObjects
            .map((object) => ({
              ...object,
              x: object.x - 2,
            }))
            .filter((object) => object.x + objectWidth > 0);

          if (
            updatedObjects.length === 0 ||
            updatedObjects[updatedObjects.length - 1].x < maxX - objectWidth
          ) {
            const newObject = generateObject(
              updatedObjects[updatedObjects.length - 1]?.x || minX
            );
            updatedObjects.push(newObject);
          }

          return updatedObjects;
        });
      }, 5);

      return () => clearInterval(interval);
    }
  }, [gameStarted]);

  return (
    <>
      {objects.map((object) => (
        <Image
          key={object.id}
          src={object.src}
          width={object.width}
          height={object.height}
          alt={object.alt}
          className="object"
          style={{
            position: "absolute",
            zIndex: "1",
            left: `${object.x}px`,
            top: `${object.y}px`,
          }}
        />
      ))}
    </>
  );
};

export default Objects;
