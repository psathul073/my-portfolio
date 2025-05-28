import { memo, useEffect, useState } from "react";

const characters = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-=_+[]{};:,.<>?".split("");

const ScrambledTypingArray = memo(function ScrambledTypingArray({ texts }) {
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState("typing"); // typing | hold | deleting
  const [charIndex, setCharIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const currentText = texts[textIndex];
  const isLowSpec = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;


  // Cursor Blink
  useEffect(() => {
    const blink = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 600);
    return () => clearInterval(blink);
  }, []);

  // Typing with optional scrambling
  useEffect(() => {
    if (phase !== "typing") return;

    const revealed = currentText.slice(0, charIndex);
    const scrambled = isLowSpec
      ? currentText.slice(charIndex)
      : currentText
          .slice(charIndex)
          .split("")
          .map(() => characters[Math.floor(Math.random() * characters.length)])
          .join("");

    setDisplayText(revealed + scrambled);
    setShowCursor(false);

    const timeout = setTimeout(() => {
      const nextIndex = charIndex + 1;
      if (nextIndex > currentText.length) {
        setPhase("hold");
      } else {
        setCharIndex(nextIndex);
      }
    }, isLowSpec ? 150 : 100); 

    return () => clearTimeout(timeout);
  }, [charIndex, phase, currentText, isLowSpec]);

  // Hold before delete
  useEffect(() => {
    if (phase !== "hold") return;

    setDisplayText(currentText);
    const timeout = setTimeout(() => setPhase("deleting"), 1000);
    return () => clearTimeout(timeout);
  }, [phase, currentText]);

  // Deleting text
  useEffect(() => {
    if (phase !== "deleting") return;

    if (displayText.length > 0) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
      }, isLowSpec ? 150 : 100);
      return () => clearTimeout(timeout);
    } else {
      setCharIndex(0);
      setTextIndex((prev) => (prev + 1) % texts.length);
      setPhase("typing");
    }
  }, [phase, displayText, texts.length, isLowSpec]);

  return (
    <div className="scramble-container">
      <p className="scramble-text">
        {displayText}
        {showCursor ? "|" : ""}
      </p>
    </div>
  );
});

export default ScrambledTypingArray;