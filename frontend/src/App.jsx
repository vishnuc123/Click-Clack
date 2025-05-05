import React from "react";
import logo from "./assets/images/typing.png";
import audiosrc from "./assets/audio/keyboard-typing-one-short-1-292590.mp3"
import backSpace from "./assets/audio/mixkit-hard-single-key-press-in-a-laptop-2542.wav"
import spaceBar from "./assets/audio/acer-computer-spacebar-38301.mp3"
import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import axios from "axios";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";


const App = () => {
  const [loaded, setLoaded] = useState(false);
  const [typedText, setTypedText] = useState("");
  // const para = "The quick brown fox jumps over the lazy dog. Programming is fun and challenging, requiring patience and problem-solving skills. Keep practicing, and you'll improve every day!";
  const [para, setPara] = useState("");
  const [word, setWord] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [reachedWPMGoal, setReachedWPMGoal] = useState(false);
  const { width, height } = useWindowSize();

  let sentenceLimit = 2;
  useEffect(() => {
    const fetchPara = async () => {
      try {
        const response = await axios.get(
          "https://baconipsum.com/api/?type=all&paras=1&format=text"
        );

        const sentences = response.data.split(/(?<=[.!?])\s+/);
        const limitedSentences = sentences.slice(0, sentenceLimit).join(" ");

        setPara(limitedSentences);
      } catch (error) {
        console.error("Error fetching paragraph:", error);
      }
    };

    fetchPara();
  }, []);

  {
    console.log(para);
  }
  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (para) {
      if (typedText.length === para.length) {
        window.location.reload();
      }
    }
  });

  useEffect(() => {
  
    if (wpm >= 50 && !reachedWPMGoal) {
      setShowConfetti(true);
      setReachedWPMGoal(true);
      
   
      setTimeout(() => {
        setShowConfetti(false);
       
        if (wpm < 45) {
          setReachedWPMGoal(false);
        }
      }, 8000);
    } 

    else if (wpm < 45 && reachedWPMGoal) {
      setReachedWPMGoal(false);
    }
  }, [wpm, reachedWPMGoal]);

  useEffect(() => {
    const wordsTyped = typedText
      .trim()
      .split(" ")
      .filter((word) => word !== "");
    const wordCount = wordsTyped.length;

    const paraWords = para.trim().split(" ");
    let matchedWords = 0;

    for (let i = 0; i < wordCount; i++) {
      if (wordsTyped[i] === paraWords[i]) {
        matchedWords++;
      }
    }

    setWord(matchedWords);

    if (typedText && startTime) {
      const timeInMinute = (Date.now() - startTime) / 60000;
      const calculatewpm = Math.round(word / timeInMinute)+10;
      setWpm(calculatewpm);
    }
  }, [typedText, para, startTime]);

  const handleInputChange = (e) => {
    if (startTime === null) {
      setStartTime(Date.now());
    }

    
  const inputValue = e.target.value;
  const previousValue = typedText;

  if (inputValue.length < previousValue.length) {
    let audio = new Audio(backSpace);
    audio.play();

  }else if (e.nativeEvent.inputType === 'insertText' && e.nativeEvent.data === ' ') {
    let audio = new Audio(spaceBar); 
    audio.play(); 
  }else {
    
    let audio = new Audio(audiosrc);
    audio.play();
    
  }
    setTypedText(e.target.value);
  };
  return (
    <>
      <div className="background h-screen w-screen fixed">
        <div className="flex justify-center items-center">
          <img
            src={logo}
            className={`w-80 h-60 flex justify-center items-center transition-opacity duration-700 ease-in ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          ></img>
        </div>
        <div
          className={` relative  flex justify-between transition-opacity duration-700 ease-in ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          {showConfetti && <Confetti width={width} height={height} />}
          <motion.h1
            className="wpm text-5xl font-serif relative left-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            key={wpm} 
          >
            {wpm.toFixed(2)} wpm
          </motion.h1>

          <h1 className="wpm text-5xl relative right-60  font-serif animate-pulse">
            {word} Words
          </h1>
        </div>

        <div
          className={`w-screen h-95 flex justify-center items-center transition-opacity duration-700 ease-in ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-[90%] h-full  flex justify-center items-center">
            <div className=" w-[95%] h-[90%]">
              <h2 className="typing-para relative p-2 left-3 top-1 text-red-500 lg:text-6xl md:text-xl sm:text-2xl leading-normal font-mono font-semibold w-[99%]">
                {console.log(typedText)}
                {para.split("").map((char, index) => {
                  let bgClass = "text-yellow-300";
                  if (typedText[index] === char) {
                    bgClass = "text-white";
                  } else if (typedText[index]) {
                    bgClass = "text-red-500 bg-red-100";
                  }

                  return (
                    <span className={bgClass}>
                      {index === typedText.length && (
                        <span className="text-white animate-blink">|</span>
                      )}
                      {char}
                    </span>
                  );
                })}
              </h2>
              <input
                type="text"
                value={typedText}
                onChange={handleInputChange}
                className="absolute opacity-0 w-0 h-0"
                autoFocus
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
