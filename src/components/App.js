import React, { useState } from "react";
import Question from "./Question";
import quiz from "../data/quiz"; // Assuming quiz is an array of question objects

function App() {
  const [questions] = useState(quiz); // The quiz questions array
  const [currentQuestionId, setCurrentQuestion] = useState(1); // Starting with first question
  const [score, setScore] = useState(0); // Initial score is 0
  const currentQuestion = questions.find((q) => q.id === currentQuestionId);

  // This function will handle when the user answers or the timer runs out
  function handleQuestionAnswered(correct) {
    if (currentQuestionId < questions.length) {
      // Move to the next question
      setCurrentQuestion((prevId) => prevId + 1);
    } else {
      // Game is over when no more questions
      setCurrentQuestion(null);
    }

    // If the answer is correct, increase the score
    if (correct) {
      setScore((prevScore) => prevScore + 1);
    }
  }

  return (
    <main>
      <section>
        {currentQuestion ? (
          // Pass current question and the handler to the Question component
          <Question
            question={currentQuestion}
            onAnswered={handleQuestionAnswered}
          />
        ) : (
          <>
            <h1>Game Over</h1>
            <h2>Total Correct: {score}</h2>
            {/* You can add a restart button if needed */}
            <button onClick={() => window.location.reload()}>Restart</button>
          </>
        )}
      </section>
    </main>
  );
}

export default App;
