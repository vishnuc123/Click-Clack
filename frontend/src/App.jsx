// import React from "react";
// import logo from "./assets/images/typing.png";
// import { useState } from "react";
// import { useEffect } from "react";
// import "./App.css";

// const App = () => {
//   const [loaded, setLoaded] = useState(false);
//   const [typedText, setTypedText] = useState("");
//   const para =
//     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates eaque, ea iste praesentium voluptatum voluptatem sed, voluptate nam quaerat reiciendis sunt veritatis quam eveniet ipsam eius ad nostrum quod. Deserunt?";
//   useEffect(() => {
//     setLoaded(true);
//   }, []);
//   const handleInputChange = (e) => {
//     setTypedText(e.target.value);
//   };
//   return (
//     <>
//       <div className="background h-screen w-screen fixed">
//         <div className="flex justify-center items-center">
//           <img
//             src={logo}
//             className={`w-80 h-60 flex justify-center items-center transition-opacity duration-700 ease-in ${
//               loaded ? "opacity-100" : "opacity-0"
//             }`}
//           ></img>
//         </div>
//         <div
//           className={` relative transform translate-x-34 -translate-y-8 transition-opacity duration-700 ease-in ${
//             loaded ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           <h1 className="wpm text-5xl font-serif animate-pulse">50 wpm</h1>
//         </div>

//         <div
//           className={`w-screen h-95 flex justify-center items-center transition-opacity duration-700 ease-in ${
//             loaded ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           <div className="w-[90%] h-full bg-red-300 flex justify-center items-center">
//             <div className=" w-[95%] h-[90%] bg-white">
//               <h2 className="relative p-2 left-3 top-1 text-red-500 lg:text-3xl md:text-2xl sm:text-2xl leading-normal font-mono font-semibold italic w-[99%]">
//                 {(console.log(typedText))}
//                 {para.split(" ").map((word, wordIndex) => {
                  
//                   word.split("").map((char, charIndex) => {
//                     let bgClass = "text-red-500";
//                     if (typedText[] === char) {
//                       bgClass = "text-green-500";
//                     } else if (typedText) {
//                       bgClass = "text-yellow-500";
//                     }
//                     return (
//                       <span key={charIndex} className={`px-1 ${bgClass}`}>
//                         {para}
//                         {""}
//                       </span>
//                     );
                    
//                   });
//                 })}
//               </h2>
//               <input
//                 type="text"
//                 value={typedText}
//                 onChange={handleInputChange}
//                 className="absolute opacity-0 w-0 h-0"
//                 autoFocus
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default App;
// import { useState } from "react";

// let para = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates eaque, ea iste praesentium voluptatum voluptatem sed, voluptate nam quaerat reiciendis sunt veritatis quam eveniet ipsam eius ad nostrum quod. Deserunt?";

// const TypingGame = () => {
//   const wordsArray = para.split(" ").map((word) => ({
//     original: word,
//     typed: "",
//     errors: 0,
//   }));

//   const [words, setWords] = useState(wordsArray);
//   const [currentWordIndex, setCurrentWordIndex] = useState(0);

//   const handleTyping = (e) => {
//     const typedValue = e.target.value;
//     let newWords = [...words];
//     let currentWord = newWords[currentWordIndex];

//     // Count errors
//     let errors = 0;
//     for (let i = 0; i < typedValue.length; i++) {
//       if (typedValue[i] !== currentWord.original[i]) {
//         errors++;
//       }
//     }

//     // Update current word object
//     currentWord.typed = typedValue;
//     currentWord.errors = errors;

//     setWords(newWords);

//     // Move to next word when space is pressed
//     if (typedValue.endsWith(" ")) {
//       setCurrentWordIndex((prev) => prev + 1);
//       e.target.value = ""; // Reset input field
//     }
//   };
//   {(console.log(wordsArray))}

//   return (
//     <div>
//       <h2 className="text-2xl font-mono">
//         {words.map((word, index) => (
//           <span
//             key={index}
//             className={
//               index === currentWordIndex
//                 ? "text-blue-500 underline"
//                 : word.typed === word.original
//                 ? "text-green-500"
//                 : "text-red-500"
//             }
//           >
//             {word.original}{" "}
//           </span>
//         ))}
//       </h2>

//       <input
//         type="text"
//         className="mt-4 p-2 border rounded text-xl"
//         onChange={handleTyping}
//         autoFocus
//       />

//       <div className="mt-2 text-gray-600">
//         Errors: {words.reduce((acc, word) => acc + word.errors, 0)}
//       </div>
//     </div>
//   );
// };

// export default TypingGame;






import { useState, useEffect } from "react";
import logo from "./assets/images/typing.png";
import "./App.css";

let para = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates eaque, ea iste praesentium voluptatum voluptatem sed, voluptate nam quaerat reiciendis sunt veritatis quam eveniet ipsam eius ad nostrum quod. Deserunt?";

const TypingGame = () => {
  const wordsArray = para.split(" ").map((word) => ({
    original: word,
    typed: "",
    errors: 0,
  }));

  const [words, setWords] = useState(wordsArray);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [inputValue, setInputValue] = useState(""); // Tracks input field separately
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleTyping = (e) => {
    const typedValue = e.target.value;
    setInputValue(typedValue); // Update input field state
    let newWords = [...words];
    let currentWord = newWords[currentWordIndex];

    // Count errors
    let errors = 0;
    for (let i = 0; i < typedValue.length; i++) {
      if (typedValue[i] !== currentWord.original[i]) {
        errors++;
      }
    }

    currentWord.typed = typedValue;
    currentWord.errors = errors;
    setWords(newWords);

    // Move to the next word when space is pressed
    if (typedValue.endsWith(" ")) {
      setCurrentWordIndex((prev) => prev + 1);
      setInputValue(""); // Reset input field
    }
  };

  return (
    <>
      <div className="background h-screen w-screen fixed flex flex-col justify-center items-center">
        {/* Animated Logo */}
        <div className="flex justify-center items-center">
          <img
            src={logo}
            className={`w-80 h-60 transition-opacity duration-700 ease-in ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            alt="Typing Game"
          />
        </div>

        {/* WPM Counter */}
        <div
          className={`relative transition-opacity duration-700 ease-in ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="wpm text-5xl font-serif animate-pulse">50 wpm</h1>
        </div>

        {/* Typing Game Box */}
        <div
          className={`w-screen flex justify-center items-center transition-opacity duration-700 ease-in ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-[90%] h-auto bg-red-300 flex justify-center items-center p-4 rounded-lg">
            <div className="w-[95%] bg-white p-4 rounded-lg shadow-lg overflow-hidden">
              {/* Typing Text Display */}
              <h2 className="relative text-red-500 lg:text-3xl md:text-2xl sm:text-xl leading-normal font-mono font-semibold italic break-words">
                {words.map((word, index) => (
                  <span key={index} className="mr-2">
                    {word.original.split("").map((char, charIndex) => {
                      let bgClass = "text-red-500"; // Default red
                      if (word.typed[charIndex] === char) {
                        bgClass = "text-green-500"; // Correct character
                      } else if (word.typed[charIndex]) {
                        bgClass = "text-yellow-500"; // Incorrect character
                      }

                      return (
                        <span key={charIndex} className={`px-1 ${bgClass}`}>
                          {char}
                        </span>
                      );
                    })}
                  </span>
                ))}
              </h2>

              {/* Visible Input for Better Typing Feedback */}
              <input
                type="text"
                className="mt-4 p-2 border rounded text-xl w-full"
                value={inputValue}
                onChange={handleTyping}
                autoFocus
              />

              {/* Error Counter */}
              <div className="mt-4 text-gray-600 text-lg font-semibold">
                Errors: {words.reduce((acc, word) => acc + word.errors, 0)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TypingGame;
