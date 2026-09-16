"use client";

export default function Home() {
  return (
    <main>
      <h1>AdaptIQ</h1>

      <p>Your learning path adapts to you.</p>

      <p>Assess → Learn → Test → Analyze → Adapt</p>

      <button onClick={() => window.location.href = "/onboarding"}>
        Get Started
      </button>
    </main>
  );
}