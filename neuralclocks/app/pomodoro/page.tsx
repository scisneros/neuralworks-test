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
  { name: "pomodoro", label: "Pomodoro", duration: 2 },
  { name: "short", label: "Short Break", duration: 5 * 60 },
  { name: "long", label: "Long Break", duration: 15 * 60 },
];

export default function Pomodoro() {
  const [stages, setStages] = useState(stagesDefaults);
  const [currentStage, setCurrentStage] = useState(stages[0]);
  const [message, setMessage] = useState("");

  // React states are immutable, so changing stages creates a new object.
  // Because currentStage is passed by reference to the object,
  // it needs to be updated when stages are updated.
  useEffect(() => {
    setCurrentStage(
      stages.find((stage) => stage.name === currentStage.name) || stages[0],
    );
  }, [stages]);

  const handleTimerFinish = () => {
    if (currentStage.name === "pomodoro") {
      setMessage("Time for a break!");
    } else {
      setMessage("Time to get back to work!");
    }
  };

  const handleTimerReset = () => {
    setMessage("");
  };

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
      <div className="mt-4 min-h-[2rem] text-2xl">{message}</div>
      <Timer
        startingTime={currentStage.duration}
        onFinish={handleTimerFinish}
        onReset={handleTimerReset}
      />
      <PomodoroSettings stages={stages} setStages={setStages} />
    </div>
  );
}
