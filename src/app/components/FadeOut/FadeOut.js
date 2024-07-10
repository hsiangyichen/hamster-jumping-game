import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

const FadeOut = ({ item }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return visible && <span className={styles.item}>{item}</span>;
};

export default FadeOut;
