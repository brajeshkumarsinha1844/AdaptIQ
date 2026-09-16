"use client";

import { useState } from "react";

export default function Onboarding() {
  const [subject, setSubject] = useState("");
  const [examDate, setExamDate] = useState("");
  const [studyHours, setStudyHours] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject,
          examDate,
          studyHours,
        }),
      });

      const data = await response.json();

      console.log(data);

      setMessage("Your learning plan setup has been saved!");
    } catch (error) {
      console.error(error);
      setMessage("Could not connect to AdaptIQ backend.");
    }
  };

  return (
    <main className="onboarding-page">
      <div className="onboarding-card">
        <div className="logo">AdaptIQ</div>

        <h1>Build Your Learning Plan</h1>

        <p className="subtitle">
          Tell us about your exam and study goals. AdaptIQ will personalize
          your learning journey.
        </p>

        <div className="form-group">
          <label>What subject are you studying?</label>

          <input
            type="text"
            placeholder="e.g. DBMS"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>When is your exam?</label>

          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>How many hours can you study per day?</label>

          <input
            type="number"
            placeholder="e.g. 3"
            min="1"
            max="24"
            value={studyHours}
            onChange={(e) => setStudyHours(e.target.value)}
          />
        </div>

        <button className="continue-button" onClick={handleSubmit}>
          Continue →
        </button>

        {message && <p className="success-message">{message}</p>}
      </div>
    </main>
  );
}