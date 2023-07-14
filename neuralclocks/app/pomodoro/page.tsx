"use client";

import { useState } from "react";
import Timer from "./timer";

type Stage = {
  name: string;
  label: string;
  duration: number;
};

const stagesDefault: Stage[] = [
  { name: "pomodoro", label: "Pomodoro", duration: 25 * 60 },
  { name: "short", label: "Short Break", duration: 5 * 60 },
  { name: "long", label: "Long Break", duration: 15 * 60 },
];

export default function Pomodoro() {
  const [stages, setStages] = useState(stagesDefault);
  const [currentStage, setCurrentStage] = useState(stages[0]);

  return (
    <div className="text-center">
      <h1>Pomodoro</h1>
      {stages.map((thisStage) => (
        <button
          className="mx-4 mt-4"
          key={thisStage.name}
          onClick={() => setCurrentStage(thisStage)}
        >
          {thisStage.label}
        </button>
      ))}
      <Timer startingTime={currentStage.duration} />
    </div>
  );
}
