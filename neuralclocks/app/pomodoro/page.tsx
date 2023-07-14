"use client";

import { useEffect, useState } from "react";
import Timer from "./timer";
import { Stage } from "./types";
import PomodoroSettings from "./settings";

// To modify the default stages, change the values in this array.
// Stages can be added/removed without requiring further modifications.
// name: Identifies the stage. Should be unique.
// label: Displayed text.
// duration: Duration of the stage in seconds.
const stagesDefaults: Stage[] = [
  { name: "pomodoro", label: "Pomodoro", duration: 25 * 60 },
  { name: "short", label: "Short Break", duration: 5 * 60 },
  { name: "long", label: "Long Break", duration: 15 * 60 },
];

export default function Pomodoro() {
  const [stages, setStages] = useState(stagesDefaults);
  const [currentStage, setCurrentStage] = useState(stages[0]);

  // React states are immutable, so changing stages creates a new object.
  // Because currentStage is passed by reference to the object,
  // it needs to be updated when stages are updated.
  useEffect(() => {
    setCurrentStage(
      stages.find((stage) => stage.name === currentStage.name) || stages[0],
    );
  }, [stages]);

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
      <PomodoroSettings stages={stages} setStages={setStages} />
    </div>
  );
}
