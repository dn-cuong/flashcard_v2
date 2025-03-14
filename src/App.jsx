import { useState } from "react";
import "./App.css";
import { data as initialData } from "./data.js";

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function App() {
    const [shuffledData, setShuffledData] = useState(shuffleArray([...initialData]));
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [guess, setGuess] = useState("");
    const [message, setMessage] = useState("");
    const [streak, setStreak] = useState(0);
    const [longestStreak, setLongestStreak] = useState(0);

    // Handle flipping of the current card
    const handleFlip = () => {
        setFlipped(!flipped);
    };

    // Handle moving to the next card
    const handleNextCard = () => {
        setFlipped(false); // Reset flip on card change
        setGuess(""); // Reset guess
        setMessage(""); // Reset message
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % shuffledData.length); // Cycle through cards
    };

    // Handle moving to the previous card
    const handlePrevCard = () => {
        setFlipped(false); // Reset flip on card change
        setGuess(""); // Reset guess
        setMessage(""); // Reset message
        setCurrentCardIndex((prevIndex) => (prevIndex - 1 + shuffledData.length) % shuffledData.length);
    };

    // Shuffle the cards
    const handleShuffle = () => {
        setFlipped(false);
        setGuess("");
        setMessage("");
        setShuffledData(shuffleArray([...initialData]));
        setCurrentCardIndex(0);
        setStreak(0);
    };

    // Handle guess submission
    const handleGuessSubmit = () => {
        if (guess.toLowerCase() === shuffledData[currentCardIndex].back.toLowerCase()) {
            setMessage("Correct!");
            setStreak((prevStreak) => {
                const newStreak = prevStreak + 1;
                setLongestStreak((prevLongest) => Math.max(prevLongest, newStreak));
                return newStreak;
            });
        } else {
            setMessage("Try again!");
            setStreak(0);
        }
    };

    // Get the current card difficulty
    const currentCardDifficulty = shuffledData[currentCardIndex].difficulty;

    return (
        <>
            <h2>The Ultimate Plant Parent!</h2>
            <h4>How good of a plant parent are you? Test all of your planty knowledge here!</h4>
            <h5>Number of cards: {shuffledData.length}</h5>
            <p>Current streak: {streak}. Longest streak: {longestStreak}</p>
            <div className={`card ${flipped ? "flipped" : ""} ${currentCardDifficulty}`} onClick={handleFlip}>
                <div className="front">{shuffledData[currentCardIndex].front}</div>
                <div className="back">{shuffledData[currentCardIndex].back}</div>
            </div>
            <div className="guess-section">
                <p>Guess the answer here: </p>
                <input 
                    type="text" 
                    value={guess} 
                    onChange={(e) => setGuess(e.target.value)} 
                    placeholder="Enter your guess"
                />
                <button onClick={handleGuessSubmit}>Submit</button>
                <p>{message}</p>
            </div>
            <div className="button-container">
                <button className="prevButton" onClick={handlePrevCard}>
                    ⭠
                </button>
                <button className="shuffleButton" onClick={handleShuffle}>
                    Shuffle
                </button>
                <button className="nextButton" onClick={handleNextCard}>
                    ⭢
                </button>
            </div>
        </>
    );
}

export default App;
