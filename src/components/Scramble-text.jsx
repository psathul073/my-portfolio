import React, { memo, useEffect, useState } from "react";

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

const ScrambledTypingArray = memo ( function ScrambledTypingArray({ texts }) {
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState("typing"); // typing | hold | deleting
  const [charIndex, setCharIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const currentText = texts[textIndex];

  // Cursor Blink
  useEffect(() => {
    const blink = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(blink);
  }, []);

  // Typing with scrambling
  useEffect(() => {
    if (phase !== "typing") return;

    const scrambleInterval = setInterval(() => {
      const revealed = currentText.slice(0, charIndex);
      // console.log(revealed, "revealed");

      const scrambled = currentText
        .slice(charIndex)
        .split("")
        .map(() => characters[Math.floor(Math.random() * characters.length)])
        .join("");
      // console.log(scrambled, "scrambled");
      setDisplayText(revealed + scrambled);
    }, 50);

    const stepTimeout = setTimeout(() => {
      setCharIndex((prev) => {
        const next = prev + 1;
        if (next > currentText.length) {
          clearInterval(scrambleInterval);
          setTimeout(() => setPhase("hold"), 1000);
        }
        return next;
      });
    }, 100);

    return () => {
      clearTimeout(stepTimeout);
      clearInterval(scrambleInterval);
    };
  }, [charIndex, phase, currentText]);

  // Hold phase before deleting
  useEffect(() => {
    if (phase !== "hold") return;
    setDisplayText(currentText);
    const timeout = setTimeout(() => setPhase("deleting"), 1000);
    return () => clearTimeout(timeout);
  }, [phase, currentText]);

  // Deleting phase
  useEffect(() => {
    if (phase !== "deleting") return;

    if (displayText.length > 0) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      setCharIndex(0);
      setTextIndex((prev) => (prev + 1) % texts.length); // Go to next word
      setPhase("typing");
    }
  }, [phase, displayText, texts.length]);

  return (
    <p className="scramble-text">
      {displayText}
      {showCursor ? "|" : ""}
    </p>
  );
});

export default ScrambledTypingArray;