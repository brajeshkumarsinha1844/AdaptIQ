"use client";

import { useState } from "react";

const questions = [
  {
    question: "What is a primary key in a database?",
    options: [
      "A key that uniquely identifies each record",
      "A key used only for sorting",
      "A key that stores passwords",
      "A key used to delete records",
    ],
    correctAnswer: "A key that uniquely identifies each record",
  },
  {
    question: "Which SQL command is used to retrieve data?",
    options: [
      "INSERT",
      "SELECT",
      "DELETE",
      "UPDATE",
    ],
    correctAnswer: "SELECT",
  },
  {
    question: "What does DBMS stand for?",
    options: [
      "Data Backup Management System",
      "Database Management System",
      "Database Memory System",
      "Data Business Management System",
    ],
    correctAnswer: "Database Management System",
  },
];

export default function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[currentQuestion];

  const handleNext = () => {
    if (selectedAnswer === question.correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      setFinished(true);
    }
  };

  const submitAssessment = async () => {
    const finalScore =
      score + (selectedAnswer === question.correctAnswer ? 1 : 0);

    const response = await fetch("http://127.0.0.1:8000/assessment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_id: 1,
        score: finalScore,
        total_questions: questions.length,
      }),
    });

    const data = await response.json();

    console.log(data);
  };

  if (finished) {
    return (
      <main className="assessment-page">
        <div className="assessment-card">
          <span className="logo">AdaptIQ</span>

          <h1>Assessment Complete 🎉</h1>

          <p className="subtitle">
            Your diagnostic assessment has been completed.
          </p>

          <button
            className="continue-button"
            onClick={submitAssessment}
          >
            Analyze My Results →
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="assessment-page">
      <div className="assessment-card">
        <div className="assessment-header">
          <span className="logo">AdaptIQ</span>

          <span className="progress">
            {currentQuestion + 1} / {questions.length}
          </span>
        </div>

        <div className="question-section">
          <p className="assessment-label">
            DIAGNOSTIC ASSESSMENT
          </p>

          <h1>{question.question}</h1>

          <div className="options">
            {question.options.map((option) => (
              <button
                key={option}
                className={`option ${
                  selectedAnswer === option ? "selected" : ""
                }`}
                onClick={() => setSelectedAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <button
            className="continue-button"
            onClick={handleNext}
            disabled={!selectedAnswer}
          >
            {currentQuestion === questions.length - 1
              ? "Finish Assessment"
              : "Next Question →"}
          </button>
        </div>
      </div>
    </main>
  );
}