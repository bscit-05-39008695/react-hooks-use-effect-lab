import React, { useState, useEffect } from 'react';

const Question = ({ question, onAnswered }) => {
  const [timeRemaining, setTimeRemaining] = useState(10); // Start with 10 seconds
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Track selected answer

  // This effect will handle the countdown timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 1) {
          // Time's up! Reset timer and notify parent that the question was answered wrong
          setTimeRemaining(10);
          onAnswered(false);
          return 10; // Reset the timer
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup function to clear the timeout when the component unmounts or timeRemaining changes
    return () => clearTimeout(timer);
  }, [timeRemaining, onAnswered]);

  // Function to handle when an answer is selected
  const handleAnswer = (answer) => {
    const isCorrect = answer === question.correctAnswer; // Assume correctAnswer is a key in the question
    setSelectedAnswer(answer);
    setTimeRemaining(10); // Reset timer for next question
    onAnswered(isCorrect); // Notify parent component about the correctness of the answer
  };

  return (
    <div>
      <h2>{question.text}</h2>
      <ul>
        {question.answers.map((answer, index) => (
          <li key={index}>
            <button onClick={() => handleAnswer(answer)}>{answer}</button>
          </li>
        ))}
      </ul>
      <p>Time Remaining: {timeRemaining}s</p>
      {selectedAnswer && (
        <p>{selectedAnswer === question.correctAnswer ? 'Correct!' : 'Incorrect'}</p>
      )}
    </div>
  );
};

export default Question;
