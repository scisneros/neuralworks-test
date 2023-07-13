"use client";

import { useState } from "react";
import { secToTime } from "../../utils/utils";

export default function Pomodoro() {
  const [stage, setStage] = useState(0);

  const stages: Array<{
    id: number;
    label: string;
    duration: number;
  }> = [
    {
      id: 0,
      label: "Pomodoro",
      duration: 25 * 60,
    },
    {
      id: 1,
      label: "Short Break",
      duration: 5 * 60,
    },
    {
      id: 2,
      label: "Long Break",
      duration: 15 * 60,
    },
  ];

  return (
    <div className="text-center">
      <h1>Pomodoro</h1>
      {stages.map((step) => (
        <button
          className="mx-4 mt-4"
          key={step.id}
          onClick={() => setStage(step.id)}
        >
          {step.label}
        </button>
      ))}
      <div className="mt-4 text-8xl">{secToTime(stages[stage].duration)}</div>
      <button className="mx-4 mt-4">Start</button>
      <button className="mx-4 mt-4">Pause</button>
      <button className="mx-4 mt-4">Reset</button>
    </div>
  );
}
